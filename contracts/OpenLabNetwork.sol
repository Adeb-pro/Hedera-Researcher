// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

// LIBRARIES

library OpenLabTypes {
    enum ResearchStatus { Proposed, Active, UnderReview, Completed, Rejected, Paused }
    enum PeerReviewStatus { Pending, InProgress, Completed, Disputed }
    enum ContributionType { DataCollection, Analysis, PeerReview, Funding, Infrastructure }
    enum ResearchCategory { Biology, Chemistry, Physics, Medicine, ComputerScience, Environment, Social, Other }
    
    struct ResearchProject {
        string title;
        string description;
        string metadataHash;
        address principal;
        ResearchCategory category;
        ResearchStatus status;
        uint256 fundingGoal;
        uint256 fundingRaised;
        uint256 createdAtBlock;
        uint256 completedAtBlock;
        uint32 contributorCount;
        uint32 reviewCount;
        uint256 reputationRequired;
        mapping(address => bool) contributors;
        mapping(address => uint256) contributions;
        uint256[] milestoneIds;
    }
    
    struct Researcher {
        string name;
        string profileHash;
        uint256 reputation;
        uint256 totalContributions;
        uint256 projectsLed;
        uint256 projectsContributed;
        uint256 reviewsCompleted;
        uint256 publicationsCount;
        ResearchCategory[] specializations;
        bool isVerified;
        uint256 joinedAtBlock;
        mapping(uint256 => bool) projectParticipation;
        mapping(address => uint256) peerEndorsements;
    }
    
    struct PeerReview {
        uint256 projectId;
        address reviewer;
        string reviewHash;
        uint8 rating;
        PeerReviewStatus status;
        uint256 submittedAtBlock;
        uint256 reward;
        bool isAnonymous;
        mapping(address => bool) disputes;
        uint32 disputeCount;
    }
    
    struct Milestone {
        uint256 projectId;
        string title;
        string descriptionHash;
        uint256 targetBlock;
        uint256 completedAtBlock;
        bool isCompleted;
        uint256 fundingAllocated;
        address[] validators;
        mapping(address => bool) validatorApprovals;
        uint32 approvalCount;
    }
    
    struct Contribution {
        address contributor;
        uint256 projectId;
        ContributionType contributionType;
        uint256 amount;
        string dataHash;
        uint256 timestamp;
        uint256 reputationAwarded;
        bool isVerified;
    }
    
    struct Publication {
        uint256 projectId;
        string title;
        string contentHash;
        address[] authors;
        uint256 publishedAtBlock;
        uint32 citationCount;
        bool isPeerReviewed;
        mapping(address => bool) authorApprovals;
        uint32 authorApprovalCount;
    }
    
    struct FundingPool {
        string name;
        uint256 totalFunds;
        uint256 allocatedFunds;
        ResearchCategory category;
        address manager;
        uint256 minProjectReputation;
        bool isActive;
        mapping(uint256 => uint256) projectAllocations;
    }
}

library OpenLabEvents {
    event ProjectProposed(uint256 indexed projectId, address indexed principal, OpenLabTypes.ResearchCategory indexed category, uint256 fundingGoal, uint256 blockNumber);
    event ProjectFunded(uint256 indexed projectId, address indexed funder, uint256 amount, uint256 totalRaised);
    event ContributionMade(uint256 indexed contributionId, address indexed contributor, uint256 indexed projectId, OpenLabTypes.ContributionType contributionType, uint256 reputationAwarded);
    event PeerReviewSubmitted(uint256 indexed reviewId, uint256 indexed projectId, address indexed reviewer, uint8 rating, uint256 reward);
    event MilestoneCompleted(uint256 indexed milestoneId, uint256 indexed projectId, uint256 blockNumber);
    event PublicationReleased(uint256 indexed publicationId, uint256 indexed projectId, string title, address[] authors);
    event ReputationAwarded(address indexed researcher, uint256 amount, string reason);
    event ResearcherVerified(address indexed researcher, address indexed verifier);
    event EmergencyAction(address indexed admin, string action, address indexed target, uint256 blockNumber);
}

library OpenLabErrors {
    error ProjectNotFound(uint256 projectId);
    error ProjectNotActive(uint256 projectId);
    error InsufficientReputation(uint256 required, uint256 current);
    error InsufficientFunding(uint256 required, uint256 available);
    error InvalidFundingAmount(uint256 amount);
    error CooldownNotPassed(uint256 remainingBlocks);
    error UserIsBlacklisted();
    error EmergencyStopActive();
    error InvalidRating(uint8 rating);
    error AlreadyContributed();
    error FundingGoalExceeded();
    error ProjectNotCompleted();
    error NotProjectPrincipal();
    error MilestoneNotReady();
    error InvalidValidatorCount();
    error ReviewAlreadySubmitted();
    error PublicationNotAuthorized();
}

library OpenLabValidation {
    using OpenLabTypes for *;
    
    function validateProjectProposal(
        string calldata title,
        uint256 fundingGoal,
        uint256 reputationRequired,
        uint256 minProjectFunding,
        uint256 maxProjectFunding
    ) external pure {
        require(bytes(title).length >= 5 && bytes(title).length <= 200, "Invalid title length");
        require(fundingGoal >= minProjectFunding && fundingGoal <= maxProjectFunding, "Invalid funding goal");
        require(reputationRequired <= 1000, "Reputation requirement too high");
    }
    
    function validateResearcherRegistration(
        string calldata name,
        OpenLabTypes.ResearchCategory[] calldata specializations
    ) external pure {
        require(specializations.length <= 5, "Too many specializations");
        require(bytes(name).length >= 2, "Name too short");
    }
    
    function validateContribution(
        OpenLabTypes.ContributionType contributionType,
        string calldata dataHash
    ) external pure {
        require(contributionType != OpenLabTypes.ContributionType.Funding, "Use fundProject for funding");
        require(bytes(dataHash).length > 0, "Data hash required");
    }
    
    function validatePeerReview(uint8 rating) external pure {
        require(rating >= 1 && rating <= 10, "Invalid rating");
    }
}

// MAIN CONTRACT

/**
 * @title OpenLabNetwork
 * @dev Decentralized scientific research platform for Hedera network
 * @notice OpenLabNetwork - Democratizing scientific research through blockchain
 */
contract OpenLabNetwork is Ownable, ReentrancyGuard, Pausable, AccessControl {
    using Address for address payable;
    using OpenLabTypes for *;
    
    // Role definitions
    bytes32 public constant MODERATOR_ROLE = keccak256("MODERATOR_ROLE");
    bytes32 public constant REVIEWER_ROLE = keccak256("REVIEWER_ROLE");
    bytes32 public constant EMERGENCY_ROLE = keccak256("EMERGENCY_ROLE");
    bytes32 public constant VALIDATOR_ROLE = keccak256("VALIDATOR_ROLE");
    
    // State variables
    mapping(uint256 => OpenLabTypes.ResearchProject) public researchProjects;
    mapping(address => OpenLabTypes.Researcher) public researchers;
    mapping(uint256 => OpenLabTypes.PeerReview) public peerReviews;
    mapping(uint256 => OpenLabTypes.Milestone) public milestones;
    mapping(uint256 => OpenLabTypes.Publication) public publications;
    mapping(uint256 => OpenLabTypes.FundingPool) public fundingPools;
    mapping(address => bool) public blacklistedUsers;
    
    OpenLabTypes.Contribution[] public contributions;
    mapping(address => uint256[]) public researcherContributions;
    mapping(uint256 => uint256[]) public projectContributions;
    
    // ID counters
    uint256 public nextProjectId;
    uint256 public nextReviewId;
    uint256 public nextMilestoneId;
    uint256 public nextPublicationId;
    uint256 public nextFundingPoolId;
    
    // Platform statistics
    uint256 public totalFundingRaised;
    uint256 public totalResearchers;
    uint256 public totalActiveProjects;
    uint256 public totalCompletedProjects;
    
    // Platform parameters
    uint256 public baseFundingFee = 250;
    uint256 public reviewRewardBase = 1000000000000000;
    uint256 public minProjectFunding = 10000000000000000;
    uint256 public maxProjectFunding = 100000000000000000000;
    uint256 public minReputationForReview = 100;
    uint256 public reputationMultiplier = 10;
    uint256 public milestoneValidationThreshold = 3;
    
    // Security parameters
    uint256 public cooldownBlocks = 50;
    uint256 public disputeWindow = 2000;
    uint256 public fundingDeadlineBlocks = 100000;
    bool public emergencyStop = false;
    mapping(address => uint256) public lastActionBlock;
    
    // Constants
    uint256 public constant MIN_TITLE_LENGTH = 5;
    uint256 public constant MAX_TITLE_LENGTH = 200;
    uint256 public constant MAX_BATCH_SIZE = 20;
    uint256 public constant MAX_SPECIALIZATIONS = 5;
    uint256 public constant MAX_AUTHORS_PER_PUBLICATION = 10;
    
    // Modifiers
    modifier validProject(uint256 _projectId) {
        if (_projectId >= nextProjectId) revert OpenLabErrors.ProjectNotFound(_projectId);
        _;
    }
    
    modifier activeProject(uint256 _projectId) {
        if (researchProjects[_projectId].status != OpenLabTypes.ResearchStatus.Active) 
            revert OpenLabErrors.ProjectNotActive(_projectId);
        _;
    }
    
    modifier cooldownPassed(address _user) {
        uint256 blocksPassed = block.number - lastActionBlock[_user];
        if (blocksPassed < cooldownBlocks) {
            revert OpenLabErrors.CooldownNotPassed(cooldownBlocks - blocksPassed);
        }
        _;
    }
    
    modifier notBlacklisted(address _user) {
        if (blacklistedUsers[_user]) revert OpenLabErrors.UserIsBlacklisted();
        _;
    }
    
    modifier notEmergencyStop() {
        if (emergencyStop) revert OpenLabErrors.EmergencyStopActive();
        _;
    }
    
    modifier onlyProjectPrincipal(uint256 _projectId) {
        if (researchProjects[_projectId].principal != msg.sender) 
            revert OpenLabErrors.NotProjectPrincipal();
        _;
    }
    
    modifier sufficientReputation(uint256 _required) {
        if (researchers[msg.sender].reputation < _required) 
            revert OpenLabErrors.InsufficientReputation(_required, researchers[msg.sender].reputation);
        _;
    }
    
    constructor(address initialOwner) Ownable(initialOwner) {
        _grantRole(DEFAULT_ADMIN_ROLE, initialOwner);
        _grantRole(MODERATOR_ROLE, initialOwner);
        _grantRole(REVIEWER_ROLE, initialOwner);
        _grantRole(EMERGENCY_ROLE, initialOwner);
        _grantRole(VALIDATOR_ROLE, initialOwner);
    }
    
    // CORE FUNCTIONS
    
    function registerResearcher(
        string calldata _name,
        string calldata _profileHash,
        OpenLabTypes.ResearchCategory[] calldata _specializations
    ) external notBlacklisted(msg.sender) notEmergencyStop {
        OpenLabValidation.validateResearcherRegistration(_name, _specializations);
        require(researchers[msg.sender].joinedAtBlock == 0, "Already registered");
        
        OpenLabTypes.Researcher storage researcher = researchers[msg.sender];
        researcher.name = _name;
        researcher.profileHash = _profileHash;
        researcher.reputation = 100;
        researcher.joinedAtBlock = block.number;
        researcher.specializations = _specializations;
        
        totalResearchers++;
        lastActionBlock[msg.sender] = block.number;
        
        emit OpenLabEvents.ReputationAwarded(msg.sender, 100, "Registration bonus");
    }
    
    function proposeProject(
        string calldata _title,
        string calldata _description,
        string calldata _metadataHash,
        OpenLabTypes.ResearchCategory _category,
        uint256 _fundingGoal,
        uint256 _reputationRequired
    ) external 
        notBlacklisted(msg.sender) 
        notEmergencyStop 
        cooldownPassed(msg.sender)
        sufficientReputation(200)
    {
        OpenLabValidation.validateProjectProposal(_title, _fundingGoal, _reputationRequired, minProjectFunding, maxProjectFunding);
        
        uint256 projectId = nextProjectId;
        OpenLabTypes.ResearchProject storage project = researchProjects[projectId];
        
        project.title = _title;
        project.description = _description;
        project.metadataHash = _metadataHash;
        project.principal = msg.sender;
        project.category = _category;
        project.status = OpenLabTypes.ResearchStatus.Proposed;
        project.fundingGoal = _fundingGoal;
        project.createdAtBlock = block.number;
        project.reputationRequired = _reputationRequired;
        
        researchers[msg.sender].projectsLed++;
        lastActionBlock[msg.sender] = block.number;
        nextProjectId++;
        
        emit OpenLabEvents.ProjectProposed(projectId, msg.sender, _category, _fundingGoal, block.number);
    }
    
    function fundProject(uint256 _projectId) 
        external 
        payable 
        nonReentrant 
        validProject(_projectId)
        notBlacklisted(msg.sender)
        notEmergencyStop
    {
        require(msg.value > 0, "Invalid funding amount");
        
        OpenLabTypes.ResearchProject storage project = researchProjects[_projectId];
        require(project.status == OpenLabTypes.ResearchStatus.Proposed || 
                project.status == OpenLabTypes.ResearchStatus.Active, "Project not accepting funds");
        
        uint256 remainingFunding = project.fundingGoal - project.fundingRaised;
        if (msg.value > remainingFunding) revert OpenLabErrors.FundingGoalExceeded();
        
        uint256 fee = (msg.value * baseFundingFee) / 10000;
        uint256 projectFunding = msg.value - fee;
        
        _processProjectFunding(project, _projectId, projectFunding);
        
        if (project.fundingRaised >= project.fundingGoal && 
            project.status == OpenLabTypes.ResearchStatus.Proposed) {
            project.status = OpenLabTypes.ResearchStatus.Active;
            totalActiveProjects++;
        }
        
        emit OpenLabEvents.ProjectFunded(_projectId, msg.sender, projectFunding, project.fundingRaised);
    }
    
    function _processProjectFunding(
        OpenLabTypes.ResearchProject storage project,
        uint256 projectId,
        uint256 projectFunding
    ) private {
        project.fundingRaised += projectFunding;
        if (!project.contributors[msg.sender]) {
            project.contributors[msg.sender] = true;
            project.contributorCount++;
        }
        project.contributions[msg.sender] += projectFunding;
        
        uint256 contributionId = contributions.length;
        contributions.push(OpenLabTypes.Contribution({
            contributor: msg.sender,
            projectId: projectId,
            contributionType: OpenLabTypes.ContributionType.Funding,
            amount: projectFunding,
            dataHash: "",
            timestamp: block.timestamp,
            reputationAwarded: projectFunding / 1000000000000000,
            isVerified: true
        }));
        
        researcherContributions[msg.sender].push(contributionId);
        projectContributions[projectId].push(contributionId);
        
        uint256 reputationReward = projectFunding / 1000000000000000;
        researchers[msg.sender].reputation += reputationReward;
        researchers[msg.sender].totalContributions += projectFunding;
        totalFundingRaised += projectFunding;
        
        emit OpenLabEvents.ContributionMade(contributionId, msg.sender, projectId, OpenLabTypes.ContributionType.Funding, reputationReward);
        emit OpenLabEvents.ReputationAwarded(msg.sender, reputationReward, "Project funding");
    }
    
    function contributeData(
        uint256 _projectId,
        string calldata _dataHash,
        OpenLabTypes.ContributionType _type
    ) external 
        validProject(_projectId)
        activeProject(_projectId)
        notBlacklisted(msg.sender)
        notEmergencyStop
        cooldownPassed(msg.sender)
    {
        OpenLabValidation.validateContribution(_type, _dataHash);
        
        OpenLabTypes.ResearchProject storage project = researchProjects[_projectId];
        require(researchers[msg.sender].reputation >= project.reputationRequired, "Insufficient reputation");
        
        _processDataContribution(project, _projectId, _dataHash, _type);
        
        lastActionBlock[msg.sender] = block.number;
    }
    
    function _processDataContribution(
        OpenLabTypes.ResearchProject storage project,
        uint256 projectId,
        string calldata dataHash,
        OpenLabTypes.ContributionType contributionType
    ) private {
        uint256 contributionId = contributions.length;
        uint256 reputationReward = 50;
        
        contributions.push(OpenLabTypes.Contribution({
            contributor: msg.sender,
            projectId: projectId,
            contributionType: contributionType,
            amount: 0,
            dataHash: dataHash,
            timestamp: block.timestamp,
            reputationAwarded: reputationReward,
            isVerified: false
        }));
        
        researcherContributions[msg.sender].push(contributionId);
        projectContributions[projectId].push(contributionId);
        
        if (!project.contributors[msg.sender]) {
            project.contributors[msg.sender] = true;
            project.contributorCount++;
            researchers[msg.sender].projectsContributed++;
        }
        
        emit OpenLabEvents.ContributionMade(contributionId, msg.sender, projectId, contributionType, reputationReward);
    }
    
    function submitPeerReview(
        uint256 _projectId,
        string calldata _reviewHash,
        uint8 _rating,
        bool _isAnonymous
    ) external 
        validProject(_projectId)
        notBlacklisted(msg.sender)
        notEmergencyStop
        cooldownPassed(msg.sender)
        sufficientReputation(minReputationForReview)
        onlyRole(REVIEWER_ROLE)
    {
        OpenLabValidation.validatePeerReview(_rating);
        
        OpenLabTypes.ResearchProject storage project = researchProjects[_projectId];
        require(project.status == OpenLabTypes.ResearchStatus.UnderReview || 
                project.status == OpenLabTypes.ResearchStatus.Completed, "Project not ready for review");
        require(project.principal != msg.sender, "Cannot review own project");
        
        _processPeerReview(_projectId, _reviewHash, _rating, _isAnonymous, project);
        
        lastActionBlock[msg.sender] = block.number;
    }
    
    function _processPeerReview(
        uint256 projectId,
        string calldata reviewHash,
        uint8 rating,
        bool isAnonymous,
        OpenLabTypes.ResearchProject storage project
    ) private {
        uint256 reviewId = nextReviewId;
        OpenLabTypes.PeerReview storage review = peerReviews[reviewId];
        
        review.projectId = projectId;
        review.reviewer = msg.sender;
        review.reviewHash = reviewHash;
        review.rating = rating;
        review.status = OpenLabTypes.PeerReviewStatus.Completed;
        review.submittedAtBlock = block.number;
        review.isAnonymous = isAnonymous;
        review.reward = reviewRewardBase * (researchers[msg.sender].reputation / 100);
        
        project.reviewCount++;
        researchers[msg.sender].reviewsCompleted++;
        researchers[msg.sender].reputation += 25;
        
        if (review.reward > 0 && address(this).balance >= review.reward) {
            payable(msg.sender).sendValue(review.reward);
        }
        
        nextReviewId++;
        
        emit OpenLabEvents.PeerReviewSubmitted(reviewId, projectId, msg.sender, rating, review.reward);
        emit OpenLabEvents.ReputationAwarded(msg.sender, 25, "Peer review completion");
    }
    
    // VIEW FUNCTIONS
    
    function getProject(uint256 _projectId) 
        external 
        view 
        validProject(_projectId)
        returns (
            string memory title,
            string memory description,
            string memory metadataHash,
            address principal,
            OpenLabTypes.ResearchCategory category,
            OpenLabTypes.ResearchStatus status,
            uint256 fundingGoal,
            uint256 fundingRaised,
            uint32 contributorCount
        ) 
    {
        OpenLabTypes.ResearchProject storage project = researchProjects[_projectId];
        return (
            project.title,
            project.description,
            project.metadataHash,
            project.principal,
            project.category,
            project.status,
            project.fundingGoal,
            project.fundingRaised,
            project.contributorCount
        );
    }
    
    function getResearcher(address _researcher) 
        external 
        view 
        returns (
            string memory name,
            string memory profileHash,
            uint256 reputation,
            uint256 projectsLed,
            uint256 projectsContributed,
            uint256 reviewsCompleted,
            bool isVerified
        ) 
    {
        OpenLabTypes.Researcher storage researcher = researchers[_researcher];
        return (
            researcher.name,
            researcher.profileHash,
            researcher.reputation,
            researcher.projectsLed,
            researcher.projectsContributed,
            researcher.reviewsCompleted,
            researcher.isVerified
        );
    }
    
    function getPlatformStats() 
        external 
        view 
        returns (
            uint256 totalProjects,
            uint256 activeProjects,
            uint256 completedProjects,
            uint256 totalFunding,
            uint256 researcherCount,
            uint256 totalContributionsCount
        ) 
    {
        return (
            nextProjectId,
            totalActiveProjects,
            totalCompletedProjects,
            totalFundingRaised,
            totalResearchers,
            contributions.length
        );
    }
    
    function getContribution(uint256 _contributionId) 
        external 
        view 
        returns (OpenLabTypes.Contribution memory) 
    {
        require(_contributionId < contributions.length, "Contribution not found");
        return contributions[_contributionId];
    }
    
    function isProjectContributor(uint256 _projectId, address _contributor) 
        external 
        view 
        validProject(_projectId)
        returns (bool) 
    {
        return researchProjects[_projectId].contributors[_contributor];
    }
    
    function getProjectContributionAmount(uint256 _projectId, address _contributor) 
        external 
        view 
        validProject(_projectId)
        returns (uint256) 
    {
        return researchProjects[_projectId].contributions[_contributor];
    }
    
    // ADMIN FUNCTIONS
    
    function verifyResearcher(address _researcher, string calldata _reason) 
        external 
        onlyRole(MODERATOR_ROLE) 
    {
        require(researchers[_researcher].joinedAtBlock > 0, "Researcher not registered");
        
        researchers[_researcher].isVerified = true;
        researchers[_researcher].reputation += 50;
        
        emit OpenLabEvents.ResearcherVerified(_researcher, msg.sender);
        emit OpenLabEvents.ReputationAwarded(_researcher, 50, _reason);
    }
    
    function blacklistUser(address _user, string calldata _reason) 
        external 
        onlyRole(MODERATOR_ROLE) 
    {
        blacklistedUsers[_user] = true;
        emit OpenLabEvents.EmergencyAction(msg.sender, _reason, _user, block.number);
    }
    
    function activateEmergencyStop() external onlyRole(EMERGENCY_ROLE) {
        emergencyStop = true;
        _pause();
        emit OpenLabEvents.EmergencyAction(msg.sender, "Emergency stop activated", address(0), block.number);
    }
    
    function resetEmergencyState() external onlyOwner {
        emergencyStop = false;
        _unpause();
        emit OpenLabEvents.EmergencyAction(msg.sender, "Emergency state reset", address(0), block.number);
    }
    
    function updatePlatformParameters(
        uint256 _baseFundingFee,
        uint256 _reviewRewardBase,
        uint256 _minProjectFunding,
        uint256 _maxProjectFunding
    ) external onlyOwner {
        require(_baseFundingFee <= 1000, "Fee too high");
        require(_minProjectFunding > 0, "Invalid min funding");
        require(_maxProjectFunding > _minProjectFunding, "Invalid max funding");
        require(_reviewRewardBase > 0, "Invalid review reward");
        
        baseFundingFee = _baseFundingFee;
        reviewRewardBase = _reviewRewardBase;
        minProjectFunding = _minProjectFunding;
        maxProjectFunding = _maxProjectFunding;
        
        emit OpenLabEvents.EmergencyAction(msg.sender, "Platform parameters updated", address(0), block.number);
    }
    
    function withdrawFees(uint256 _amount) external onlyOwner {
        require(_amount <= address(this).balance, "Insufficient balance");
        payable(owner()).transfer(_amount);
        emit OpenLabEvents.EmergencyAction(msg.sender, "Fee withdrawal", address(0), block.number);
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
    
    receive() external payable {
        emit OpenLabEvents.EmergencyAction(msg.sender, "Contract funded via receive", address(0), block.number);
    }
    
    fallback() external {
        revert("Function not found");
    }
}