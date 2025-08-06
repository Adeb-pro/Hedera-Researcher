# OpenLabNetwork - Decentralized Scientific Research Platform

## Overview

OpenLabNetwork is a comprehensive decentralized platform for scientific research collaboration, funding, and publication built on the Hedera blockchain. The platform democratizes scientific research by enabling transparent project funding, peer review, milestone tracking, and publication management through smart contracts.

## Architecture

The platform consists of five interconnected smart contracts:

```
OpenLabNetwork (Core)
├── OpenLabAnalyticsManager (Analytics & Reporting)
├── OpenLabFundingPoolManager (Specialized Funding Pools)
├── OpenLabMilestoneManager (Project Milestone Tracking)
└── OpenLabPublicationManager (Research Publication Management)
```

## Contracts Overview

### 1. OpenLabNetwork (Core Contract)
**File:** `OpenLabNetwork.sol`  
**Purpose:** Main platform contract handling researchers, projects, contributions, and peer reviews.

**Key Features:**
- Researcher registration and reputation system
- Project proposal and funding mechanism
- Data contribution tracking
- Peer review system with anonymous options
- Role-based access control (Moderator, Reviewer, Emergency, Validator)
- Emergency controls and security measures

### 2. OpenLabAnalyticsManager
**File:** `OpenLabAnalyticsManager.sol`  
**Purpose:** Advanced analytics and reporting for research projects and platform metrics.

**Key Features:**
- Time-period statistics tracking
- Research category analysis
- Funding trend analysis
- Researcher performance metrics
- Project success rate calculations
- Platform overview statistics

### 3. OpenLabFundingPoolManager
**File:** `OpenLabFundingPoolManager.sol`  
**Purpose:** Manages specialized funding pools for different research categories.

**Key Features:**
- Category-specific funding pools
- Batch funding allocation
- Reputation-based fund access
- Pool management and withdrawal
- Multi-project funding coordination

### 4. OpenLabMilestoneManager
**File:** `OpenLabMilestoneManager.sol`  
**Purpose:** Tracks project milestones and validates their completion.

**Key Features:**
- Milestone creation and tracking
- Multi-validator approval system
- Block-based target setting
- Funding allocation per milestone
- Completion verification

### 5. OpenLabPublicationManager
**File:** `OpenLabPublicationManager.sol`  
**Purpose:** Manages research publication workflow and citation tracking.

**Key Features:**
- Multi-author publication proposals
- Collaborative approval system
- Citation tracking and management
- Peer review status marking
- Publication status management

## Getting Started

### Prerequisites

- Node.js >= 16.0.0
- Hardhat or Truffle development environment
- Hedera Hashgraph testnet/mainnet access
- OpenZeppelin Contracts library

### Deployment

1. **Deploy Core Contract First:**
```bash
# Deploy OpenLabNetwork with initial owner
npx hardhat run scripts/deploy-core.js --network hedera-testnet
```

2. **Deploy Specialized Contracts:**
```bash
# Deploy all specialized contracts with core contract address
npx hardhat run scripts/deploy-modules.js --network hedera-testnet
```

3. **Configure Cross-Contract References:**
```bash
# Set up contract addresses and permissions
npx hardhat run scripts/configure-system.js --network hedera-testnet
```

### Configuration

Update the deployment script with your parameters:

```javascript
// deployment-config.js
module.exports = {
  // Platform Parameters
  baseFundingFee: 250, // 2.5% (in basis points)
  reviewRewardBase: "1000000000000000", // 0.001 HBAR
  minProjectFunding: "10000000000000000", // 0.01 HBAR
  maxProjectFunding: "100000000000000000000", // 100 HBAR
  
  // Security Parameters
  cooldownBlocks: 50,
  disputeWindow: 2000,
  fundingDeadlineBlocks: 100000,
  
  // Validation Thresholds
  milestoneValidationThreshold: 3,
  minReputationForReview: 100
};
```

## Usage Examples

### Register as a Researcher

```solidity
// Register with specializations
ResearchCategory[] memory specializations = [
    ResearchCategory.Biology,
    ResearchCategory.Medicine
];

openLabNetwork.registerResearcher(
    "Dr. Alice Johnson",
    "QmHashOfProfile...",
    specializations
);
```

### Propose a Research Project

```solidity
openLabNetwork.proposeProject(
    "Novel Cancer Treatment Research",
    "Investigating new immunotherapy approaches...",
    "QmProjectMetadataHash...",
    ResearchCategory.Medicine,
    1000000000000000000, // 1 HBAR funding goal
    200 // Minimum reputation required
);
```

### Create a Funding Pool

```solidity
fundingPoolManager.createFundingPool{value: 5000000000000000000}(
    "Medical Research Pool",
    ResearchCategory.Medicine,
    150, // Minimum project reputation
    500000000000000000 // Max allocation per project (0.5 HBAR)
);
```

### Track Project Milestones

```solidity
milestoneManager.createMilestone(
    projectId,
    "Phase 1: Literature Review Complete",
    "QmMilestoneDescriptionHash...",
    block.number + 10000, // Target completion
    100000000000000000 // Funding allocated (0.1 HBAR)
);
```

### Submit Research Publication

```solidity
address[] memory authors = [msg.sender, coAuthor1, coAuthor2];

publicationManager.proposePublication(
    projectId,
    "Revolutionary Cancer Treatment Results",
    "QmPublicationContentHash...",
    authors
);
```

## Platform Statistics

Access comprehensive platform analytics:

```solidity
// Get platform overview
(
    uint256 totalProjects,
    uint256 activeProjects,
    uint256 completedProjects,
    uint256 totalFunding,
    uint256 totalResearchers,
    uint256 totalMilestones,
    uint256 totalPublications
) = analyticsManager.getPlatformOverview();

// Get funding trends
(
    uint256[] memory periodIds,
    uint256[] memory fundingAmounts,
    uint256[] memory projectCounts
) = analyticsManager.getFundingTrends(12); // Last 12 periods
```

## Security Features

### Access Control
- **Role-based permissions** (Admin, Moderator, Reviewer, Emergency, Validator)
- **Multi-signature requirements** for critical operations
- **Cooldown periods** to prevent spam and abuse

### Emergency Controls
- **Emergency stop mechanism** for platform-wide halts
- **User blacklisting** capabilities
- **Parameter adjustment** for platform tuning

### Audit & Monitoring
- **Comprehensive event logging** for all operations
- **Reputation system** to incentivize good behavior
- **Dispute resolution** mechanisms for peer reviews

## Gas Optimization

The contracts are optimized for Hedera's low-cost environment:

- **Interface-based architecture** reduces deployment costs
- **Batch operations** for multiple actions
- **Efficient storage patterns** minimize state changes
- **Event-based logging** instead of expensive state queries

### Development Guidelines

- Follow Solidity style guide and best practices
- Write comprehensive tests for new features
- Update documentation for API changes
- Use meaningful commit messages
- Ensure all tests pass before submitting

## API Reference

### Core Contract Events

```solidity
event ProjectProposed(uint256 indexed projectId, address indexed principal, ResearchCategory indexed category, uint256 fundingGoal, uint256 blockNumber);
event ProjectFunded(uint256 indexed projectId, address indexed funder, uint256 amount, uint256 totalRaised);
event ContributionMade(uint256 indexed contributionId, address indexed contributor, uint256 indexed projectId, ContributionType contributionType, uint256 reputationAwarded);
event PeerReviewSubmitted(uint256 indexed reviewId, uint256 indexed projectId, address indexed reviewer, uint8 rating, uint256 reward);
event ReputationAwarded(address indexed researcher, uint256 amount, string reason);
```

### Research Categories

```solidity
enum ResearchCategory {
    Biology,        // 0
    Chemistry,      // 1
    Physics,        // 2
    Medicine,       // 3
    ComputerScience,// 4
    Environment,    // 5
    Social,         // 6
    Other          // 7
}
```

### Project Status Flow

```
Proposed → Active → UnderReview → Completed
    ↓         ↓           ↓
  Rejected   Paused    Paused
```

## Known Issues & Limitations

- **Block number dependencies** may need adjustment for different networks
- **Large dataset queries** may hit gas limits (use pagination)
- **Cross-contract calls** require careful error handling
- **Reputation gaming** possible through coordinated attacks (mitigated by cooldowns)