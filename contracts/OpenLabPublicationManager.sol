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
}

/**
 * @title OpenLabPublicationManager
 * @dev Manages research publications for OpenLabNetwork
 */
contract OpenLabPublicationManager is AccessControl, Pausable {
    IOpenLabNetwork public immutable openLabNetwork;
    
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
        bool isPublished;
    }
    
    mapping(uint256 => Publication) public publications;
    mapping(uint256 => uint256[]) public projectPublications;
    mapping(address => uint256[]) public authorPublications;
    uint256 public nextPublicationId;
    uint256 public constant MAX_AUTHORS_PER_PUBLICATION = 10;
    
    event PublicationProposed(uint256 indexed publicationId, uint256 indexed projectId, string title, address[] authors);
    event PublicationApproved(uint256 indexed publicationId, address indexed author);
    event PublicationReleased(uint256 indexed publicationId, uint256 indexed projectId, string title, address[] authors);
    event CitationAdded(uint256 indexed publicationId, uint256 indexed citingPublicationId);
    
    error PublicationNotFound(uint256 publicationId);
    error NotProjectPrincipal();
    error TooManyAuthors();
    error ProjectNotCompleted();
    error NotAuthor();
    error AlreadyApproved();
    error AlreadyPublished();
    error InsufficientApprovals();
    
    modifier onlyProjectPrincipal(uint256 _projectId) {
        (, , , address principal, , , , , ) = openLabNetwork.researchProjects(_projectId);
        require(principal == msg.sender, "Not project principal");
        _;
    }
    
    modifier validPublication(uint256 _publicationId) {
        if (_publicationId >= nextPublicationId) revert PublicationNotFound(_publicationId);
        _;
    }
    
    modifier onlyAuthor(uint256 _publicationId) {
        Publication storage pub = publications[_publicationId];
        bool isAuthor = false;
        for (uint256 i = 0; i < pub.authors.length; i++) {
            if (pub.authors[i] == msg.sender) {
                isAuthor = true;
                break;
            }
        }
        if (!isAuthor) revert NotAuthor();
        _;
    }
    
    constructor(address _openLabNetwork, address _admin) {
        openLabNetwork = IOpenLabNetwork(_openLabNetwork);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }
    
    function proposePublication(
        uint256 _projectId,
        string calldata _title,
        string calldata _contentHash,
        address[] calldata _authors
    ) external onlyProjectPrincipal(_projectId) whenNotPaused {
        if (_authors.length > MAX_AUTHORS_PER_PUBLICATION) revert TooManyAuthors();
        require(bytes(_title).length > 0, "Title required");
        require(bytes(_contentHash).length > 0, "Content hash required");
        
        (, , , , , uint8 status, , , ) = openLabNetwork.researchProjects(_projectId);
        if (status != 3) revert ProjectNotCompleted(); // 3 = Completed status
        
        uint256 publicationId = nextPublicationId;
        Publication storage publication = publications[publicationId];
        
        publication.projectId = _projectId;
        publication.title = _title;
        publication.contentHash = _contentHash;
        publication.authors = _authors;
        publication.publishedAtBlock = block.number;
        
        // Project principal automatically approves
        publication.authorApprovals[msg.sender] = true;
        publication.authorApprovalCount = 1;
        
        projectPublications[_projectId].push(publicationId);
        
        for (uint256 i = 0; i < _authors.length; i++) {
            authorPublications[_authors[i]].push(publicationId);
        }
        
        nextPublicationId++;
        
        emit PublicationProposed(publicationId, _projectId, _title, _authors);
        emit PublicationApproved(publicationId, msg.sender);
    }
    
    function approvePublication(uint256 _publicationId) 
        external 
        validPublication(_publicationId)
        onlyAuthor(_publicationId)
        whenNotPaused
    {
        Publication storage publication = publications[_publicationId];
        
        if (publication.isPublished) revert AlreadyPublished();
        if (publication.authorApprovals[msg.sender]) revert AlreadyApproved();
        
        publication.authorApprovals[msg.sender] = true;
        publication.authorApprovalCount++;
        
        emit PublicationApproved(_publicationId, msg.sender);
        
        // Check if all authors have approved
        if (publication.authorApprovalCount >= publication.authors.length) {
            publication.isPublished = true;
            emit PublicationReleased(_publicationId, publication.projectId, publication.title, publication.authors);
        }
    }
    
    function addCitation(uint256 _publicationId, uint256 _citingPublicationId) 
        external 
        validPublication(_publicationId)
        validPublication(_citingPublicationId)
        whenNotPaused
    {
        Publication storage citingPub = publications[_citingPublicationId];
        require(citingPub.isPublished, "Citing publication not published");
        
        // Only authors of the citing publication can add citations
        bool isAuthor = false;
        for (uint256 i = 0; i < citingPub.authors.length; i++) {
            if (citingPub.authors[i] == msg.sender) {
                isAuthor = true;
                break;
            }
        }
        require(isAuthor, "Not author of citing publication");
        
        publications[_publicationId].citationCount++;
        
        emit CitationAdded(_publicationId, _citingPublicationId);
    }
    
    function markAsPeerReviewed(uint256 _publicationId) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE)
        validPublication(_publicationId)
    {
        publications[_publicationId].isPeerReviewed = true;
    }
    
    function getPublication(uint256 _publicationId) 
        external 
        view 
        validPublication(_publicationId)
        returns (
            uint256 projectId,
            string memory title,
            string memory contentHash,
            address[] memory authors,
            uint256 publishedAtBlock,
            uint32 citationCount,
            bool isPeerReviewed,
            bool isPublished,
            uint32 authorApprovalCount
        ) 
    {
        Publication storage publication = publications[_publicationId];
        return (
            publication.projectId,
            publication.title,
            publication.contentHash,
            publication.authors,
            publication.publishedAtBlock,
            publication.citationCount,
            publication.isPeerReviewed,
            publication.isPublished,
            publication.authorApprovalCount
        );
    }
    
    function getProjectPublications(uint256 _projectId) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return projectPublications[_projectId];
    }
    
    function getAuthorPublications(address _author) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return authorPublications[_author];
    }
    
    function hasAuthorApproved(uint256 _publicationId, address _author) 
        external 
        view 
        validPublication(_publicationId)
        returns (bool) 
    {
        return publications[_publicationId].authorApprovals[_author];
    }
    
    function getPublicationsByStatus(bool _isPublished, uint256 _offset, uint256 _limit) 
        external 
        view 
        returns (uint256[] memory publicationIds, uint256 totalMatching) 
    {
        uint256[] memory tempIds = new uint256[](_limit);
        uint256 count = 0;
        uint256 matchingCount = 0;
        
        for (uint256 i = 0; i < nextPublicationId && count < _limit; i++) {
            if (publications[i].isPublished == _isPublished) {
                if (matchingCount >= _offset) {
                    tempIds[count] = i;
                    count++;
                }
                matchingCount++;
            }
        }
        
        publicationIds = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            publicationIds[i] = tempIds[i];
        }
        
        totalMatching = matchingCount;
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}