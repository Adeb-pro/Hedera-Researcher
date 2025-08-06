"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { blockchainService, type PlatformStats, type ResearchProject, type Researcher } from "@/lib/blockchain"

interface BlockchainContextType {
  isConnected: boolean
  account: string | null
  isLoading: boolean
  error: string | null
  platformStats: PlatformStats | null
  connect: () => Promise<void>
  disconnect: () => void
  getPlatformStats: () => Promise<void>
  getResearchProjects: (offset?: number, limit?: number) => Promise<ResearchProject[]>
  getResearcher: (address: string) => Promise<Researcher>
  registerResearcher: (name: string, profileHash: string, specializations: number[]) => Promise<string>
  proposeProject: (
    title: string,
    description: string,
    metadataHash: string,
    category: number,
    fundingGoal: string,
    reputationRequired: number,
  ) => Promise<string>
  fundProject: (projectId: number, amount: string) => Promise<string>
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export function BlockchainProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [platformStats, setPlatformStats] = useState<PlatformStats | null>(null)

  const connect = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const address = await blockchainService.connect()
      setAccount(address)
      setIsConnected(true)
      await getPlatformStats()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect")
    } finally {
      setIsLoading(false)
    }
  }

  const disconnect = () => {
    blockchainService.disconnect()
    setIsConnected(false)
    setAccount(null)
    setPlatformStats(null)
    setError(null)
  }

  const getPlatformStats = async () => {
    try {
      const stats = await blockchainService.getPlatformStats()
      setPlatformStats(stats)
    } catch (err) {
      console.error("Failed to get platform stats:", err)
      // Don&apos;t set error for stats failure, just log it
    }
  }

  const getResearchProjects = async (offset = 0, limit = 10) => {
    return await blockchainService.getResearchProjects(offset, limit)
  }

  const getResearcher = async (address: string) => {
    return await blockchainService.getResearcher(address)
  }

  const registerResearcher = async (name: string, profileHash: string, specializations: number[]) => {
    return await blockchainService.registerResearcher(name, profileHash, specializations)
  }

  const proposeProject = async (
    title: string,
    description: string,
    metadataHash: string,
    category: number,
    fundingGoal: string,
    reputationRequired: number,
  ) => {
    return await blockchainService.proposeProject(
      title,
      description,
      metadataHash,
      category,
      fundingGoal,
      reputationRequired,
    )
  }

  const fundProject = async (projectId: number, amount: string) => {
    return await blockchainService.fundProject(projectId, amount)
  }

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (blockchainService.isConnected()) {
        const address = await blockchainService.getAccount()
        if (address) {
          setAccount(address)
          setIsConnected(true)
          await getPlatformStats()
        }
      }
    }
    checkConnection()
  }, [])

  const value: BlockchainContextType = {
    isConnected,
    account,
    isLoading,
    error,
    platformStats,
    connect,
    disconnect,
    getPlatformStats,
    getResearchProjects,
    getResearcher,
    registerResearcher,
    proposeProject,
    fundProject,
  }

  return <BlockchainContext.Provider value={value}>{children}</BlockchainContext.Provider>
}

export function useBlockchain() {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }
  return context
}