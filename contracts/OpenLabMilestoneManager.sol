// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

interface IOpenLabNetwork {
    function researchProjects(uint256) external view returns (
        string memory title,
        string memory description,
        string memory metadataHash,
        address principal,
        uint8 category,
        uint8 status,
        uint256 fundingGoal,
        uint256 fundingRaised,
        uint32 contributorCount
    );
    
    function researchers(address) external view returns (
        string memory name,
        string memory profileHash,
        uint256 reputation,
        uint256 totalContributions,
        uint256 projectsLed,
        uint256 projectsContributed,
        uint256 reviewsCompleted,
        uint256 publicationsCount,
        bool isVerified,
        uint256 joinedAtBlock
    );
    
    function hasRole(bytes32 role, address account) external view returns (bool);
    function VALIDATOR_ROLE() external view returns (bytes32);
}

/**
 * @title OpenLabMilestoneManager
 * @dev Manages project milestones for OpenLabNetwork
 */
contract OpenLabMilestoneManager is AccessControl, Pausable {
    IOpenLabNetwork public immutable openLabNetwork;
    
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
    
    mapping(uint256 => Milestone) public milestones;
    mapping(uint256 => uint256[]) public projectMilestones;
    uint256 public nextMilestoneId;
    uint256 public milestoneValidationThreshold = 3;
    
    event MilestoneCreated(uint256 indexed milestoneId, uint256 indexed projectId, string title, uint256 targetBlock);
    event MilestoneCompleted(uint256 indexed milestoneId, uint256 indexed projectId, uint256 blockNumber);
    event ValidatorApproved(uint256 indexed milestoneId, address indexed validator);
    
    error MilestoneNotFound(uint256 milestoneId);
    error NotProjectPrincipal();
    error AlreadyCompleted();
    error TargetBlockNotReached();
    error AlreadyValidated();
    error InsufficientValidators();
    
    modifier onlyProjectPrincipal(uint256 _projectId) {
        (, , , address principal, , , , , ) = openLabNetwork.researchProjects(_projectId);
        require(principal == msg.sender, "Not project principal");
        _;
    }
    
    modifier onlyValidator() {
        require(openLabNetwork.hasRole(openLabNetwork.VALIDATOR_ROLE(), msg.sender), "Not validator");
        _;
    }
    
    modifier validMilestone(uint256 _milestoneId) {
        if (_milestoneId >= nextMilestoneId) revert MilestoneNotFound(_milestoneId);
        _;
    }
    
    constructor(address _openLabNetwork, address _admin) {
        openLabNetwork = IOpenLabNetwork(_openLabNetwork);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }
    
    function createMilestone(
        uint256 _projectId,
        string calldata _title,
        string calldata _descriptionHash,
        uint256 _targetBlock,
        uint256 _fundingAllocated
    ) external onlyProjectPrincipal(_projectId) whenNotPaused {
        require(_targetBlock > block.number, "Target block must be in future");
        require(bytes(_title).length > 0, "Title required");
        
        (, , , , , , , uint256 fundingRaised, ) = openLabNetwork.researchProjects(_projectId);
        require(_fundingAllocated <= fundingRaised, "Insufficient project funds");
        
        uint256 milestoneId = nextMilestoneId;
        Milestone storage milestone = milestones[milestoneId];
        
        milestone.projectId = _projectId;
        milestone.title = _title;
        milestone.descriptionHash = _descriptionHash;
        milestone.targetBlock = _targetBlock;
        milestone.fundingAllocated = _fundingAllocated;
        
        projectMilestones[_projectId].push(milestoneId);
        nextMilestoneId++;
        
        emit MilestoneCreated(milestoneId, _projectId, _title, _targetBlock);
    }
    
    function validateMilestone(uint256 _milestoneId) 
        external 
        onlyValidator 
        validMilestone(_milestoneId)
        whenNotPaused
    {
        Milestone storage milestone = milestones[_milestoneId];
        
        if (milestone.isCompleted) revert AlreadyCompleted();
        if (block.number < milestone.targetBlock) revert TargetBlockNotReached();
        if (milestone.validatorApprovals[msg.sender]) revert AlreadyValidated();
        
        milestone.validators.push(msg.sender);
        milestone.validatorApprovals[msg.sender] = true;
        milestone.approvalCount++;
        
        emit ValidatorApproved(_milestoneId, msg.sender);
        
        if (milestone.approvalCount >= milestoneValidationThreshold) {
            milestone.isCompleted = true;
            milestone.completedAtBlock = block.number;
            emit MilestoneCompleted(_milestoneId, milestone.projectId, block.number);
        }
    }
    
    function getMilestone(uint256 _milestoneId) 
        external 
        view 
        validMilestone(_milestoneId)
        returns (
            uint256 projectId,
            string memory title,
            string memory descriptionHash,
            uint256 targetBlock,
            uint256 completedAtBlock,
            bool isCompleted,
            uint256 fundingAllocated,
            uint32 approvalCount
        ) 
    {
        Milestone storage milestone = milestones[_milestoneId];
        return (
            milestone.projectId,
            milestone.title,
            milestone.descriptionHash,
            milestone.targetBlock,
            milestone.completedAtBlock,
            milestone.isCompleted,
            milestone.fundingAllocated,
            milestone.approvalCount
        );
    }
    
    function getProjectMilestones(uint256 _projectId) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return projectMilestones[_projectId];
    }
    
    function updateValidationThreshold(uint256 _threshold) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_threshold >= 1 && _threshold <= 10, "Invalid threshold");
        milestoneValidationThreshold = _threshold;
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}