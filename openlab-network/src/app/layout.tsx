import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { BlockchainProvider } from "@/contexts/blockchain-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "OpenLab Network - Decentralized Scientific Research Platform",
  description:
    "Connect with researchers globally, secure transparent funding, and publish breakthrough discoveries on the blockchain. The future of scientific collaboration is here.",
  keywords: ["blockchain", "research", "science", "decentralized", "funding", "collaboration", "hedera"],
  authors: [{ name: "OpenLab Network" }],
  openGraph: {
    title: "OpenLab Network - Decentralized Scientific Research",
    description: "The future of scientific collaboration through blockchain technology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenLab Network",
    description: "Decentralized Scientific Research Platform",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <BlockchainProvider>{children}</BlockchainProvider>
      </body>
    </html>
  )
}
