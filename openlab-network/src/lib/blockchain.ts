import { ethers } from "ethers"

// Contract addresses (update these with your deployed contract addresses)
export const CONTRACT_ADDRESSES = {
  OPENLAB_NETWORK: "0x1234567890123456789012345678901234567890",
  ANALYTICS_MANAGER: "0x2345678901234567890123456789012345678901",
  FUNDING_POOL_MANAGER: "0x3456789012345678901234567890123456789012",
  MILESTONE_MANAGER: "0x4567890123456789012345678901234567890123",
  PUBLICATION_MANAGER: "0x5678901234567890123456789012345678901234",
}

// Simplified ABI interfaces for the contracts
export const OPENLAB_NETWORK_ABI = [
  "function nextProjectId() external view returns (uint256)",
  "function totalResearchers() external view returns (uint256)",
  "function totalFundingRaised() external view returns (uint256)",
  "function totalActiveProjects() external view returns (uint256)",
  "function totalCompletedProjects() external view returns (uint256)",
  "function researchProjects(uint256) external view returns (string, string, string, address, uint8, uint8, uint256, uint256, uint32)",
  "function researchers(address) external view returns (string, string, uint256, uint256, uint256, uint256, uint256, uint256, bool, uint256)",
  "function registerResearcher(string, string, uint8[]) external",
  "function proposeProject(string, string, string, uint8, uint256, uint256) external",
  "function fundProject(uint256) external payable",
  "function contributeData(uint256, string, uint8) external",
  "function submitPeerReview(uint256, string, uint8, bool) external",
]

export const ANALYTICS_MANAGER_ABI = [
  "function getPlatformOverview() external view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256)",
  "function getCategoryComparison() external view returns (uint8[], uint256[], uint256[], uint256[])",
  "function getFundingTrends(uint256) external view returns (uint256[], uint256[], uint256[])",
  "function getResearcherPerformance(address) external view returns (uint256, uint256, uint256, uint256, uint256, uint256, uint256)",
]

export const FUNDING_POOL_MANAGER_ABI = [
  "function getPoolStats() external view returns (uint256, uint256, uint256, uint256)",
  "function getActivePools(uint256, uint256) external view returns (uint256[], uint256)",
  "function getFundingPool(uint256) external view returns (string, uint256, uint256, uint8, address, uint256, bool, uint256, uint256)",
  "function createFundingPool(string, uint8, uint256, uint256) external payable",
  "function fundPool(uint256) external payable",
]

export interface PlatformStats {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  totalFunding: string
  totalResearchers: number
  totalMilestones: number
  totalPublications: number
}

export interface ResearchProject {
  id: number
  title: string
  description: string
  metadataHash: string
  principal: string
  category: number
  status: number
  fundingGoal: string
  fundingRaised: string
  contributorCount: number
}

export interface Researcher {
  name: string
  profileHash: string
  reputation: number
  totalContributions: string
  projectsLed: number
  projectsContributed: number
  reviewsCompleted: number
  publicationsCount: number
  isVerified: boolean
  joinedAtBlock: number
}

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null
  private signer: ethers.Signer | null = null
  private contracts: { [key: string]: ethers.Contract } = {}

  async connect(): Promise<string> {
    if (typeof window === "undefined" || !window.ethereum) {
      throw new Error("MetaMask is not installed")
    }

    try {
      this.provider = new ethers.BrowserProvider(window.ethereum)
      await this.provider.send("eth_requestAccounts", [])
      this.signer = await this.provider.getSigner()

      // Initialize contracts
      this.initializeContracts()

      const address = await this.signer.getAddress()
      return address
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      throw error
    }
  }

  private initializeContracts() {
    if (!this.signer) return

    this.contracts.openLabNetwork = new ethers.Contract(
      CONTRACT_ADDRESSES.OPENLAB_NETWORK,
      OPENLAB_NETWORK_ABI,
      this.signer,
    )

    this.contracts.analyticsManager = new ethers.Contract(
      CONTRACT_ADDRESSES.ANALYTICS_MANAGER,
      ANALYTICS_MANAGER_ABI,
      this.signer,
    )

    this.contracts.fundingPoolManager = new ethers.Contract(
      CONTRACT_ADDRESSES.FUNDING_POOL_MANAGER,
      FUNDING_POOL_MANAGER_ABI,
      this.signer,
    )
  }

  async getPlatformStats(): Promise<PlatformStats> {
    if (!this.contracts.analyticsManager) {
      throw new Error("Analytics contract not initialized")
    }

    try {
      const [
        totalProjects,
        activeProjects,
        completedProjects,
        totalFunding,
        totalResearchers,
        totalMilestones,
        totalPublications,
      ] = await this.contracts.analyticsManager.getPlatformOverview()

      return {
        totalProjects: Number(totalProjects),
        activeProjects: Number(activeProjects),
        completedProjects: Number(completedProjects),
        totalFunding: ethers.formatEther(totalFunding),
        totalResearchers: Number(totalResearchers),
        totalMilestones: Number(totalMilestones),
        totalPublications: Number(totalPublications),
      }
    } catch (error) {
      console.error("Failed to get platform stats:", error)
      throw error
    }
  }

  async getResearchProjects(offset = 0, limit = 10): Promise<ResearchProject[]> {
    if (!this.contracts.openLabNetwork) {
      throw new Error("OpenLab Network contract not initialized")
    }

    try {
      const totalProjects = await this.contracts.openLabNetwork.nextProjectId()
      const projects: ResearchProject[] = []

      const end = Math.min(offset + limit, Number(totalProjects))
      for (let i = offset; i < end; i++) {
        const projectData = await this.contracts.openLabNetwork.researchProjects(i)
        projects.push({
          id: i,
          title: projectData[0],
          description: projectData[1],
          metadataHash: projectData[2],
          principal: projectData[3],
          category: Number(projectData[4]),
          status: Number(projectData[5]),
          fundingGoal: ethers.formatEther(projectData[6]),
          fundingRaised: ethers.formatEther(projectData[7]),
          contributorCount: Number(projectData[8]),
        })
      }

      return projects
    } catch (error) {
      console.error("Failed to get research projects:", error)
      throw error
    }
  }

  async getResearcher(address: string): Promise<Researcher> {
    if (!this.contracts.openLabNetwork) {
      throw new Error("OpenLab Network contract not initialized")
    }

    try {
      const researcherData = await this.contracts.openLabNetwork.researchers(address)
      return {
        name: researcherData[0],
        profileHash: researcherData[1],
        reputation: Number(researcherData[2]),
        totalContributions: ethers.formatEther(researcherData[3]),
        projectsLed: Number(researcherData[4]),
        projectsContributed: Number(researcherData[5]),
        reviewsCompleted: Number(researcherData[6]),
        publicationsCount: Number(researcherData[7]),
        isVerified: researcherData[8],
        joinedAtBlock: Number(researcherData[9]),
      }
    } catch (error) {
      console.error("Failed to get researcher:", error)
      throw error
    }
  }

  async registerResearcher(name: string, profileHash: string, specializations: number[]): Promise<string> {
    if (!this.contracts.openLabNetwork) {
      throw new Error("OpenLab Network contract not initialized")
    }

    try {
      const tx = await this.contracts.openLabNetwork.registerResearcher(name, profileHash, specializations)
      return tx.hash
    } catch (error) {
      console.error("Failed to register researcher:", error)
      throw error
    }
  }

  async proposeProject(
    title: string,
    description: string,
    metadataHash: string,
    category: number,
    fundingGoal: string,
    reputationRequired: number,
  ): Promise<string> {
    if (!this.contracts.openLabNetwork) {
      throw new Error("OpenLab Network contract not initialized")
    }

    try {
      const fundingGoalWei = ethers.parseEther(fundingGoal)
      const tx = await this.contracts.openLabNetwork.proposeProject(
        title,
        description,
        metadataHash,
        category,
        fundingGoalWei,
        reputationRequired,
      )
      return tx.hash
    } catch (error) {
      console.error("Failed to propose project:", error)
      throw error
    }
  }

  async fundProject(projectId: number, amount: string): Promise<string> {
    if (!this.contracts.openLabNetwork) {
      throw new Error("OpenLab Network contract not initialized")
    }

    try {
      const amountWei = ethers.parseEther(amount)
      const tx = await this.contracts.openLabNetwork.fundProject(projectId, { value: amountWei })
      return tx.hash
    } catch (error) {
      console.error("Failed to fund project:", error)
      throw error
    }
  }

  disconnect() {
    this.provider = null
    this.signer = null
    this.contracts = {}
  }

  isConnected(): boolean {
    return this.signer !== null
  }

  async getAccount(): Promise<string | null> {
    if (!this.signer) return null
    try {
      return await this.signer.getAddress()
    } catch {
      return null
    }
  }
}

export const blockchainService = new BlockchainService()
