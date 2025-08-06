// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";

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
    function MODERATOR_ROLE() external view returns (bytes32);
}

/**
 * @title OpenLabFundingPoolManager
 * @dev Manages funding pools for OpenLabNetwork projects
 */
contract OpenLabFundingPoolManager is AccessControl, Pausable, ReentrancyGuard {
    using Address for address payable;
    
    IOpenLabNetwork public immutable openLabNetwork;
    
    enum ResearchCategory { Biology, Chemistry, Physics, Medicine, ComputerScience, Environment, Social, Other }
    
    struct FundingPool {
        string name;
        uint256 totalFunds;
        uint256 allocatedFunds;
        ResearchCategory category;
        address manager;
        uint256 minProjectReputation;
        bool isActive;
        mapping(uint256 => uint256) projectAllocations;
        uint256 createdAtBlock;
        uint256 maxAllocationPerProject;
    }
    
    mapping(uint256 => FundingPool) public fundingPools;
    mapping(ResearchCategory => uint256[]) public poolsByCategory;
    mapping(address => uint256[]) public managerPools;
    uint256 public nextPoolId;
    uint256 public totalPoolFunds;
    uint256 public totalAllocatedFunds;
    
    event FundingPoolCreated(uint256 indexed poolId, string name, ResearchCategory category, address manager, uint256 initialFunding);
    event FundingPoolFunded(uint256 indexed poolId, address indexed funder, uint256 amount);
    event FundingAllocated(uint256 indexed poolId, uint256 indexed projectId, uint256 amount, address recipient);
    event PoolStatusChanged(uint256 indexed poolId, bool isActive);
    event PoolManagerChanged(uint256 indexed poolId, address oldManager, address newManager);
    
    error PoolNotFound(uint256 poolId);
    error NotPoolManager();
    error PoolNotActive();
    error InsufficientPoolFunds();
    error CategoryMismatch();
    error InsufficientReputation();
    error InvalidAllocation();
    error AllocationExceedsLimit();
    
    modifier validPool(uint256 _poolId) {
        if (_poolId >= nextPoolId) revert PoolNotFound(_poolId);
        _;
    }
    
    modifier onlyPoolManager(uint256 _poolId) {
        if (fundingPools[_poolId].manager != msg.sender && 
            !openLabNetwork.hasRole(openLabNetwork.MODERATOR_ROLE(), msg.sender)) {
            revert NotPoolManager();
        }
        _;
    }
    
    modifier onlyModerator() {
        require(openLabNetwork.hasRole(openLabNetwork.MODERATOR_ROLE(), msg.sender), "Not moderator");
        _;
    }
    
    constructor(address _openLabNetwork, address _admin) {
        openLabNetwork = IOpenLabNetwork(_openLabNetwork);
        _grantRole(DEFAULT_ADMIN_ROLE, _admin);
    }
    
    function createFundingPool(
        string calldata _name,
        ResearchCategory _category,
        uint256 _minProjectReputation,
        uint256 _maxAllocationPerProject
    ) external payable onlyModerator whenNotPaused {
        require(msg.value > 0, "Initial funding required");
        require(_minProjectReputation <= 1000, "Reputation requirement too high");
        require(bytes(_name).length > 0, "Name required");
        require(_maxAllocationPerProject > 0, "Max allocation must be positive");
        
        uint256 poolId = nextPoolId;
        FundingPool storage pool = fundingPools[poolId];
        
        pool.name = _name;
        pool.totalFunds = msg.value;
        pool.category = _category;
        pool.manager = msg.sender;
        pool.minProjectReputation = _minProjectReputation;
        pool.isActive = true;
        pool.createdAtBlock = block.number;
        pool.maxAllocationPerProject = _maxAllocationPerProject;
        
        poolsByCategory[_category].push(poolId);
        managerPools[msg.sender].push(poolId);
        totalPoolFunds += msg.value;
        nextPoolId++;
        
        emit FundingPoolCreated(poolId, _name, _category, msg.sender, msg.value);
    }
    
    function fundPool(uint256 _poolId) 
        external 
        payable 
        validPool(_poolId)
        whenNotPaused
    {
        require(msg.value > 0, "Invalid amount");
        
        FundingPool storage pool = fundingPools[_poolId];
        require(pool.isActive, "Pool not active");
        
        pool.totalFunds += msg.value;
        totalPoolFunds += msg.value;
        
        emit FundingPoolFunded(_poolId, msg.sender, msg.value);
    }
    
    function allocateFunding(
        uint256 _poolId,
        uint256 _projectId,
        uint256 _amount
    ) external nonReentrant validPool(_poolId) onlyPoolManager(_poolId) whenNotPaused {
        FundingPool storage pool = fundingPools[_poolId];
        
        if (!pool.isActive) revert PoolNotActive();
        if (_amount > pool.totalFunds - pool.allocatedFunds) revert InsufficientPoolFunds();
        if (_amount > pool.maxAllocationPerProject) revert AllocationExceedsLimit();
        
        (, , , address principal, uint8 category, , , , ) = openLabNetwork.researchProjects(_projectId);
        if (ResearchCategory(category) != pool.category) revert CategoryMismatch();
        
        (, , uint256 reputation, , , , , , , ) = openLabNetwork.researchers(principal);
        if (reputation < pool.minProjectReputation) revert InsufficientReputation();
        
        pool.allocatedFunds += _amount;
        pool.projectAllocations[_projectId] += _amount;
        totalAllocatedFunds += _amount;
        
        payable(principal).sendValue(_amount);
        
        emit FundingAllocated(_poolId, _projectId, _amount, principal);
    }
    
    function batchAllocateFunding(
        uint256 _poolId,
        uint256[] calldata _projectIds,
        uint256[] calldata _amounts
    ) external nonReentrant validPool(_poolId) onlyPoolManager(_poolId) whenNotPaused {
        require(_projectIds.length == _amounts.length, "Array length mismatch");
        require(_projectIds.length <= 10, "Too many allocations");
        
        FundingPool storage pool = fundingPools[_poolId];
        if (!pool.isActive) revert PoolNotActive();
        
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < _amounts.length; i++) {
            totalAmount += _amounts[i];
        }
        
        if (totalAmount > pool.totalFunds - pool.allocatedFunds) revert InsufficientPoolFunds();
        
        for (uint256 i = 0; i < _projectIds.length; i++) {
            uint256 projectId = _projectIds[i];
            uint256 amount = _amounts[i];
            
            if (amount > pool.maxAllocationPerProject) revert AllocationExceedsLimit();
            
            (, , , address principal, uint8 category, , , , ) = openLabNetwork.researchProjects(projectId);
            if (ResearchCategory(category) != pool.category) revert CategoryMismatch();
            
            (, , uint256 reputation, , , , , , , ) = openLabNetwork.researchers(principal);
            if (reputation < pool.minProjectReputation) revert InsufficientReputation();
            
            pool.allocatedFunds += amount;
            pool.projectAllocations[projectId] += amount;
            totalAllocatedFunds += amount;
            
            payable(principal).sendValue(amount);
            
            emit FundingAllocated(_poolId, projectId, amount, principal);
        }
    }
    
    function updatePoolStatus(uint256 _poolId, bool _isActive) 
        external 
        validPool(_poolId)
        onlyPoolManager(_poolId)
    {
        fundingPools[_poolId].isActive = _isActive;
        emit PoolStatusChanged(_poolId, _isActive);
    }
    
    function changePoolManager(uint256 _poolId, address _newManager) 
        external 
        validPool(_poolId)
        onlyModerator
    {
        require(_newManager != address(0), "Invalid manager");
        
        FundingPool storage pool = fundingPools[_poolId];
        address oldManager = pool.manager;
        pool.manager = _newManager;
        
        // Update manager pools mapping
        managerPools[_newManager].push(_poolId);
        
        emit PoolManagerChanged(_poolId, oldManager, _newManager);
    }
    
    function updatePoolParameters(
        uint256 _poolId,
        uint256 _minProjectReputation,
        uint256 _maxAllocationPerProject
    ) external validPool(_poolId) onlyPoolManager(_poolId) {
        require(_minProjectReputation <= 1000, "Reputation requirement too high");
        require(_maxAllocationPerProject > 0, "Max allocation must be positive");
        
        FundingPool storage pool = fundingPools[_poolId];
        pool.minProjectReputation = _minProjectReputation;
        pool.maxAllocationPerProject = _maxAllocationPerProject;
    }
    
    function withdrawUnallocatedFunds(uint256 _poolId, uint256 _amount) 
        external 
        nonReentrant
        validPool(_poolId)
        onlyPoolManager(_poolId)
    {
        FundingPool storage pool = fundingPools[_poolId];
        uint256 availableFunds = pool.totalFunds - pool.allocatedFunds;
        
        require(_amount <= availableFunds, "Insufficient unallocated funds");
        require(_amount > 0, "Invalid amount");
        
        pool.totalFunds -= _amount;
        totalPoolFunds -= _amount;
        
        payable(msg.sender).sendValue(_amount);
    }
    
    // VIEW FUNCTIONS
    
    function getFundingPool(uint256 _poolId) 
        external 
        view 
        validPool(_poolId)
        returns (
            string memory name,
            uint256 totalFunds,
            uint256 allocatedFunds,
            ResearchCategory category,
            address manager,
            uint256 minProjectReputation,
            bool isActive,
            uint256 createdAtBlock,
            uint256 maxAllocationPerProject
        ) 
    {
        FundingPool storage pool = fundingPools[_poolId];
        return (
            pool.name,
            pool.totalFunds,
            pool.allocatedFunds,
            pool.category,
            pool.manager,
            pool.minProjectReputation,
            pool.isActive,
            pool.createdAtBlock,
            pool.maxAllocationPerProject
        );
    }
    
    function getPoolAllocation(uint256 _poolId, uint256 _projectId) 
        external 
        view 
        validPool(_poolId)
        returns (uint256) 
    {
        return fundingPools[_poolId].projectAllocations[_projectId];
    }
    
    function getPoolsByCategory(ResearchCategory _category) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return poolsByCategory[_category];
    }
    
    function getManagerPools(address _manager) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return managerPools[_manager];
    }
    
    function getActivePools(uint256 _offset, uint256 _limit) 
        external 
        view 
        returns (uint256[] memory poolIds, uint256 totalActive) 
    {
        uint256[] memory tempIds = new uint256[](_limit);
        uint256 count = 0;
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < nextPoolId && count < _limit; i++) {
            if (fundingPools[i].isActive) {
                if (activeCount >= _offset) {
                    tempIds[count] = i;
                    count++;
                }
                activeCount++;
            }
        }
        
        poolIds = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            poolIds[i] = tempIds[i];
        }
        
        totalActive = activeCount;
    }
    
    function getPoolStats() 
        external 
        view 
        returns (
            uint256 totalPools,
            uint256 totalFunds,
            uint256 totalAllocated,
            uint256 totalAvailable
        ) 
    {
        return (
            nextPoolId,
            totalPoolFunds,
            totalAllocatedFunds,
            totalPoolFunds - totalAllocatedFunds
        );
    }
    
    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }
    
    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
    
    receive() external payable {
        // Allow direct funding to contract
        totalPoolFunds += msg.value;
    }
}