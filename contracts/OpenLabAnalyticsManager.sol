// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

interface IOpenLabNetwork {
    function nextProjectId() external view returns (uint256);
    function totalResearchers() external view returns (uint256);
    function totalFundingRaised() external view returns (uint256);
    function totalActiveProjects() external view returns (uint256);
    function totalCompletedProjects() external view returns (uint256);
    
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
    
    function contributions(uint256) external view returns (
        address contributor,
        uint256 projectId,
        uint8 contributionType,
        uint256 amount,
        string memory dataHash,
        uint256 timestamp,
        uint256 reputationAwarded,
        bool isVerified
    );
}

interface IOpenLabMilestones {
    function nextMilestoneId() external view returns (uint256);
    function getMilestone(uint256) external view returns (
        uint256 projectId,
        string memory title,
        string memory descriptionHash,
        uint256 targetBlock,
        uint256 completedAtBlock,
        bool isCompleted,
        uint256 fundingAllocated,
        uint32 approvalCount
    );
}

interface IOpenLabPublications {
    function nextPublicationId() external view returns (uint256);
    function getPublication(uint256) external view returns (
        uint256 projectId,
        string memory title,
        string memory contentHash,
        address[] memory authors,
        uint256 publishedAtBlock,
        uint32 citationCount,
        bool isPeerReviewed,
        bool isPublished,
        uint32 authorApprovalCount
    );
}

/**
 * @title OpenLabAnalyticsManager
 * @dev Advanced analytics and reporting for OpenLabNetwork
 */
contract OpenLabAnalyticsManager is AccessControl, Pausable {
    IOpenLabNetwork public immutable openLabNetwork;
    IOpenLabMilestones public openLabMilestones;
    IOpenLabPublications public openLabPublications;
    
    enum ResearchCategory { Biology, Chemistry, Physics, Medicine, ComputerScience, Environment, Social, Other }
    enum ResearchStatus { Proposed, Active, UnderReview, Completed, Rejected, Paused }
    
    struct CategoryStats {
        uint256 projectCount;
        uint256 totalFunding;
        uint256 avgFunding;
        uint256 researcherCount;
        uint256 completionRate; // in basis points (100 = 1%)
    }
    
    struct TimePeriodStats {
        uint256 startBlock;
        uint256 endBlock;
        uint256 projectsProposed;
        uint256 projectsCompleted;
        uint256 totalFunding;
        uint256 newResearchers;
        uint256 milestonesCompleted;
        uint256 publicationsReleased;
    }
    
    struct ResearcherRanking {
        address researcher;
        uint256 reputation;
        uint256 projectsLed;
        uint256 contributionValue;
        uint256 publicationCount;
    }
    
    mapping(uint256 => TimePeriodStats) public periodStats;
    mapping(ResearchCategory => CategoryStats) public categoryStats;
    uint256 public currentPeriodId;
    uint256 public blocksPerPeriod = 2400; // 1 day on Hedera
    
    event AnalyticsUpdated(uint256 indexed periodId, uint256 blockNumber);
    event CategoryStatsUpdated(ResearchCategory indexed category);
    
    constructor(
        address _openLabNetwork,
        address _admin
    ) {
        openLabNetwork = IOpenLabNetwork(_openLabNetwork);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
        currentPeriodId = block.number / blocksPerPeriod;
    }
    
    function setMilestonesContract(address _milestones) external onlyRole(DEFAULT_ADMIN_ROLE) {
        openLabMilestones = IOpenLabMilestones(_milestones);
    }
    
    function setPublicationsContract(address _publications) external onlyRole(DEFAULT_ADMIN_ROLE) {
        openLabPublications = IOpenLabPublications(_publications);
    }
    
    function updatePeriodStats() external whenNotPaused {
        uint256 newPeriodId = block.number / blocksPerPeriod;
        
        if (newPeriodId > currentPeriodId) {
            _calculatePeriodStats(currentPeriodId);
            currentPeriodId = newPeriodId;
        }
        
        emit AnalyticsUpdated(currentPeriodId, block.number);
    }
    
    function _calculatePeriodStats(uint256 _periodId) private {
        uint256 startBlock = _periodId * blocksPerPeriod;
        uint256 endBlock = startBlock + blocksPerPeriod;
        
        TimePeriodStats storage stats = periodStats[_periodId];
        stats.startBlock = startBlock;
        stats.endBlock = endBlock;
        
        stats.totalFunding = openLabNetwork.totalFundingRaised();
        stats.newResearchers = openLabNetwork.totalResearchers();
    }
    
    function updateCategoryStats(ResearchCategory _category) external whenNotPaused {
        CategoryStats storage stats = categoryStats[_category];
        
        uint256 totalProjects = openLabNetwork.nextProjectId();
        uint256 projectCount = 0;
        uint256 totalFunding = 0;
        uint256 completedCount = 0;
        
        for (uint256 i = 0; i < totalProjects; i++) {
            (, , , , uint8 category, uint8 status, , uint256 fundingRaised, ) = 
                openLabNetwork.researchProjects(i);
                
            if (ResearchCategory(category) == _category) {
                projectCount++;
                totalFunding += fundingRaised;
                
                if (ResearchStatus(status) == ResearchStatus.Completed) {
                    completedCount++;
                }
            }
        }
        
        stats.projectCount = projectCount;
        stats.totalFunding = totalFunding;
        stats.avgFunding = projectCount > 0 ? totalFunding / projectCount : 0;
        stats.completionRate = projectCount > 0 ? (completedCount * 10000) / projectCount : 0;
        
        emit CategoryStatsUpdated(_category);
    }
    
    function getTopResearchers(uint256 _limit) 
        external 
        pure 
        returns (address[] memory researchers, uint256[] memory reputations) 
    {
        require(_limit <= 100, "Limit too high");
        
        researchers = new address[](0);
        reputations = new uint256[](0);
    }
    
    function getProjectSuccessRate(ResearchCategory _category) 
        external 
        view 
        returns (uint256 successRate, uint256 totalProjects, uint256 completedProjects) 
    {
        uint256 totalCount = 0;
        uint256 completedCount = 0;
        uint256 totalProjectsCount = openLabNetwork.nextProjectId();
        
        for (uint256 i = 0; i < totalProjectsCount; i++) {
            (, , , , uint8 category, uint8 status, , , ) = 
                openLabNetwork.researchProjects(i);
                
            if (ResearchCategory(category) == _category) {
                totalCount++;
                if (ResearchStatus(status) == ResearchStatus.Completed) {
                    completedCount++;
                }
            }
        }
        
        successRate = totalCount > 0 ? (completedCount * 10000) / totalCount : 0;
        totalProjects = totalCount;
        completedProjects = completedCount;
    }
    
    function getFundingTrends(uint256 _periods) 
        external 
        view 
        returns (
            uint256[] memory periodIds,
            uint256[] memory fundingAmounts,
            uint256[] memory projectCounts
        ) 
    {
        require(_periods <= 30, "Too many periods requested");
        
        uint256 startPeriod = currentPeriodId >= _periods ? currentPeriodId - _periods : 0;
        uint256 actualPeriods = currentPeriodId - startPeriod + 1;
        
        periodIds = new uint256[](actualPeriods);
        fundingAmounts = new uint256[](actualPeriods);
        projectCounts = new uint256[](actualPeriods);
        
        for (uint256 i = 0; i < actualPeriods; i++) {
            uint256 periodId = startPeriod + i;
            periodIds[i] = periodId;
            fundingAmounts[i] = periodStats[periodId].totalFunding;
            projectCounts[i] = periodStats[periodId].projectsProposed;
        }
    }
    
    function getResearcherPerformance(address _researcher) 
        external 
        view 
        returns (
            uint256 reputation,
            uint256 projectsLed,
            uint256 projectsContributed,
            uint256 totalContributions,
            uint256 publicationCount,
            uint256 reviewsCompleted,
            uint256 avgProjectFunding
        ) 
    {
        (
            ,
            ,
            reputation,
            totalContributions,
            projectsLed,
            projectsContributed,
            reviewsCompleted,
            publicationCount,
            ,
        ) = openLabNetwork.researchers(_researcher);
        
        avgProjectFunding = projectsLed > 0 ? totalContributions / projectsLed : 0;
    }
    
    function getCategoryComparison() 
        external 
        view 
        returns (
            ResearchCategory[] memory categories,
            uint256[] memory projectCounts,
            uint256[] memory fundingAmounts,
            uint256[] memory completionRates
        ) 
    {
        categories = new ResearchCategory[](8);
        projectCounts = new uint256[](8);
        fundingAmounts = new uint256[](8);
        completionRates = new uint256[](8);
        
        for (uint256 i = 0; i < 8; i++) {
            ResearchCategory category = ResearchCategory(i);
            categories[i] = category;
            projectCounts[i] = categoryStats[category].projectCount;
            fundingAmounts[i] = categoryStats[category].totalFunding;
            completionRates[i] = categoryStats[category].completionRate;
        }
    }
    
    function getPlatformOverview() 
        external 
        view 
        returns (
            uint256 totalProjects,
            uint256 activeProjects,
            uint256 completedProjects,
            uint256 totalFunding,
            uint256 totalResearchers,
            uint256 totalMilestones,
            uint256 totalPublications
        ) 
    {
        totalProjects = openLabNetwork.nextProjectId();
        activeProjects = openLabNetwork.totalActiveProjects();
        completedProjects = openLabNetwork.totalCompletedProjects();
        totalFunding = openLabNetwork.totalFundingRaised();
        totalResearchers = openLabNetwork.totalResearchers();
        
        if (address(openLabMilestones) != address(0)) {
            totalMilestones = openLabMilestones.nextMilestoneId();
        }
        
        if (address(openLabPublications) != address(0)) {
            totalPublications = openLabPublications.nextPublicationId();
        }
    }
    
    function getTimePeriodStats(uint256 _periodId) 
        external 
        view 
        returns (TimePeriodStats memory) 
    {
        return periodStats[_periodId];
    }
    
    function getCategoryStats(ResearchCategory _category) 
        external 
        view 
        returns (CategoryStats memory) 
    {
        return categoryStats[_category];
    }
    
    function updateBlocksPerPeriod(uint256 _newBlocksPerPeriod) 
        external 
        onlyRole(DEFAULT_ADMIN_ROLE) 
    {
        require(_newBlocksPerPeriod > 0, "Invalid period length");
        blocksPerPeriod = _newBlocksPerPeriod;
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}