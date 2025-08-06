# OpenLabNetwork Frontend

A decentralized scientific research platform built on Hedera network that democratizes scientific research through blockchain technology.

## Overview

OpenLabNetwork is a comprehensive platform that enables researchers to propose projects, receive funding, collaborate, and publish their work in a decentralized manner. The platform includes peer review systems, milestone tracking, funding pools, and analytics.

## Architecture

### Core Components

- **OpenLabNetwork** - Main contract managing researchers, projects, and contributions
- **OpenLabAnalyticsManager** - Advanced analytics and reporting
- **OpenLabFundingPoolManager** - Manages funding pools for different research categories
- **OpenLabMilestoneManager** - Project milestone tracking and validation
- **OpenLabPublicationManager** - Research publication management

### Research Categories

- Biology
- Chemistry
- Physics
- Medicine
- Computer Science
- Environment
- Social Sciences
- Other

## Getting Started

### Prerequisites

```bash
Node.js >= 16.x
npm or yarn
MetaMask or compatible wallet
Hedera testnet/mainnet access
```

### Environment Variables

```env
NEXT_PUBLIC_HEDERA_NETWORK=testnet
NEXT_PUBLIC_OPENLAB_NETWORK_ADDRESS=0x...
NEXT_PUBLIC_ANALYTICS_MANAGER_ADDRESS=0x...
NEXT_PUBLIC_FUNDING_POOL_MANAGER_ADDRESS=0x...
NEXT_PUBLIC_MILESTONE_MANAGER_ADDRESS=0x...
NEXT_PUBLIC_PUBLICATION_MANAGER_ADDRESS=0x...
NEXT_PUBLIC_IPFS_GATEWAY=https://ipfs.io/ipfs/
```

### Running the Development Server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Key Features

### For Researchers

#### Registration & Profile Management
- Register as a researcher with specializations
- Build reputation through contributions
- Verify credentials through moderators
- Track project participation and publications

#### Project Management
- Propose research projects with funding goals
- Set reputation requirements for contributors
- Manage project milestones and deadlines
- Submit data and collaborate with team members

#### Publications
- Propose publications for completed projects
- Multi-author approval system
- Citation tracking and peer review
- IPFS integration for content storage

### For Funders

#### Project Funding
- Browse projects by category and status
- Fund projects with automatic fee handling
- Track funding contributions and rewards
- Earn reputation points for funding

#### Funding Pools
- Create category-specific funding pools
- Set allocation criteria and limits
- Batch allocate funds to multiple projects
- Manage pool parameters and withdrawals

### For Validators & Reviewers

#### Peer Review System
- Submit detailed project reviews with ratings
- Anonymous review options available
- Earn rewards based on reputation
- Dispute resolution mechanisms

#### Milestone Validation
- Validate project milestone completion
- Multi-validator approval system
- Block-based timing requirements
- Reputation-based validation weights

## Technical Implementation

### Smart Contract Integration

```javascript
// Example: Connect to OpenLabNetwork
import { ethers } from 'ethers';
import OpenLabNetworkABI from './abi/OpenLabNetwork.json';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const openLabNetwork = new ethers.Contract(
  process.env.NEXT_PUBLIC_OPENLAB_NETWORK_ADDRESS,
  OpenLabNetworkABI,
  signer
);

// Register as researcher
async function registerResearcher(name, profileHash, specializations) {
  const tx = await openLabNetwork.registerResearcher(
    name,
    profileHash,
    specializations
  );
  await tx.wait();
}
```

### IPFS Integration

```javascript
// Upload metadata to IPFS
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

async function uploadToIPFS(data) {
  const result = await ipfs.add(JSON.stringify(data));
  return result.path;
}
```

### State Management

```javascript
// Redux store structure
const initialState = {
  user: {
    address: null,
    profile: null,
    reputation: 0,
    isVerified: false
  },
  projects: {
    active: [],
    proposed: [],
    completed: []
  },
  funding: {
    pools: [],
    contributions: []
  },
  publications: {
    published: [],
    pending: []
  }
};
```

## Analytics Dashboard

### Platform Statistics
- Total projects and funding raised
- Active researchers and completion rates
- Category-wise project distribution
- Funding trends and analytics

### Research Metrics
- Project success rates by category
- Researcher performance rankings
- Publication citation networks
- Milestone completion tracking

### Funding Analytics
- Pool utilization and allocation rates
- Funding source distribution
- ROI calculations for funders
- Category-wise funding trends

## Security Features

### Access Control
- Role-based permissions (Admin, Moderator, Reviewer, Validator)
- Multi-signature requirements for critical operations
- Blacklist management for malicious users
- Emergency stop functionality

### Validation & Verification
- Reputation-based contribution limits
- Multi-validator milestone approval
- Peer review dispute resolution
- Automated fraud detection

### Rate Limiting
- Cooldown periods between actions
- Maximum batch operation limits
- Funding deadline enforcement
- Block-based timing validations

## UI/UX Components

### Project Cards
```jsx
const ProjectCard = ({ project }) => (
  <div className="project-card">
    <h3>{project.title}</h3>
    <div className="category-badge">{project.category}</div>
    <div className="funding-progress">
      <div className="progress-bar" style={{width: `${(project.fundingRaised / project.fundingGoal) * 100}%`}} />
      <span>{project.fundingRaised} / {project.fundingGoal} HBAR</span>
    </div>
    <div className="principal">by {project.principal}</div>
  </div>
);
```

### Researcher Profile
```jsx
const ResearcherProfile = ({ researcher }) => (
  <div className="researcher-profile">
    <div className="avatar">
      <img src={`${IPFS_GATEWAY}${researcher.profileHash}`} alt={researcher.name} />
      {researcher.isVerified && <VerifiedBadge />}
    </div>
    <h2>{researcher.name}</h2>
    <div className="reputation">Reputation: {researcher.reputation}</div>
    <div className="stats">
      <span>Projects Led: {researcher.projectsLed}</span>
      <span>Reviews: {researcher.reviewsCompleted}</span>
      <span>Publications: {researcher.publicationsCount}</span>
    </div>
  </div>
);
```

### Funding Pool Dashboard
```jsx
const FundingPoolDashboard = ({ pools }) => (
  <div className="funding-dashboard">
    {pools.map(pool => (
      <div key={pool.id} className="pool-card">
        <h3>{pool.name}</h3>
        <div className="pool-stats">
          <span>Total: {pool.totalFunds} HBAR</span>
          <span>Allocated: {pool.allocatedFunds} HBAR</span>
          <span>Available: {pool.totalFunds - pool.allocatedFunds} HBAR</span>
        </div>
        <div className="category">{pool.category}</div>
        <button onClick={() => allocateFunds(pool.id)}>Allocate Funds</button>
      </div>
    ))}
  </div>
);
```

## API Reference

### Core Functions

#### Researcher Management
- `registerResearcher(name, profileHash, specializations)`
- `getResearcher(address)`
- `verifyResearcher(address, reason)`
- `updateResearcherProfile(profileHash)`

#### Project Operations
- `proposeProject(title, description, category, fundingGoal, reputationRequired)`
- `fundProject(projectId)` - payable
- `contributeData(projectId, dataHash, contributionType)`
- `getProject(projectId)`
- `getProjectsByCategory(category)`

#### Milestone Management
- `createMilestone(projectId, title, description, targetBlock, funding)`
- `validateMilestone(milestoneId)`
- `getMilestone(milestoneId)`
- `getProjectMilestones(projectId)`

#### Publication System
- `proposePublication(projectId, title, contentHash, authors)`
- `approvePublication(publicationId)`
- `addCitation(publicationId, citingPublicationId)`
- `getPublication(publicationId)`

#### Funding Pools
- `createFundingPool(name, category, minReputation, maxAllocation)` - payable
- `fundPool(poolId)` - payable
- `allocateFunding(poolId, projectId, amount)`
- `batchAllocateFunding(poolId, projectIds, amounts)`

#### Analytics
- `updatePeriodStats()`
- `updateCategoryStats(category)`
- `getFundingTrends(periods)`
- `getProjectSuccessRate(category)`
- `getResearcherPerformance(address)`
- `getPlatformOverview()`

## Data Structures

### Research Project
```solidity
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
    uint32 contributorCount;
    uint256 reputationRequired;
}
```

### Researcher Profile
```solidity
struct Researcher {
    string name;
    string profileHash;
    uint256 reputation;
    uint256 totalContributions;
    uint256 projectsLed;
    uint256 projectsContributed;
    uint256 reviewsCompleted;
    uint256 publicationsCount;
    bool isVerified;
    uint256 joinedAtBlock;
}
```

### Milestone
```solidity
struct Milestone {
    uint256 projectId;
    string title;
    string descriptionHash;
    uint256 targetBlock;
    uint256 completedAtBlock;
    bool isCompleted;
    uint256 fundingAllocated;
    uint32 approvalCount;
}
```

### E2E Tests
```bash
npm run test:e2e
```

### Smart Contract Tests
```bash
# In the contracts directory
npx hardhat test
```

## Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Deploy smart contracts to Hedera network
2. Update contract addresses in environment variables
3. Configure IPFS gateway and API keys
4. Set up analytics and monitoring

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build
      - name: Deploy
        run: npm run deploy
```

### Development Guidelines
- Follow ESLint and Prettier configurations
- Write comprehensive tests for new features
- Update documentation for API changes
- Use conventional commit messages