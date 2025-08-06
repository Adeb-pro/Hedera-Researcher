"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ParticleBackground from "@/components/ui/particle-background"

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: {
    duration: 2,
    ease: "linear" as const,
    repeat: Number.POSITIVE_INFINITY,
  },
}

export default function ReviewLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <motion.div
              className="h-4 w-32 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-6"
              style={{
                backgroundSize: "200% 100%",
              }}
              animate={shimmer.animate}
              transition={shimmer.transition}
            />

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex-1">
                <motion.div
                  className="h-10 w-96 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-2"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
                <motion.div
                  className="h-6 w-80 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <motion.div
                  className="h-10 w-32 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
                <motion.div
                  className="h-10 w-36 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="bg-dark-800/50 border-dark-700">
                  <CardContent className="p-4">
                    <motion.div
                      className="h-8 w-12 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-2"
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                    <motion.div
                      className="h-4 w-20 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <Card className="bg-dark-800/50 border-dark-700 mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <motion.div
                  className="flex-1 h-10 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
                <motion.div
                  className="w-full lg:w-48 h-10 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
                <motion.div
                  className="w-full lg:w-48 h-10 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tabs Skeleton */}
          <div className="mb-8">
            <div className="grid w-full grid-cols-3 bg-dark-800 border-dark-700 rounded-lg p-1 mb-8">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="h-10 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                  animate={shimmer.animate}
                  transition={shimmer.transition}
                />
              ))}
            </div>
          </div>

          {/* Review Cards Skeleton */}
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="bg-dark-800/50 border-dark-700">
                <CardHeader>
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <motion.div
                          className="h-6 w-20 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                        <motion.div
                          className="h-6 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                        <motion.div
                          className="h-6 w-24 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                      </div>

                      <motion.div
                        className="h-7 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-2"
                        style={{
                          backgroundSize: "200% 100%",
                        }}
                        animate={shimmer.animate}
                        transition={shimmer.transition}
                      />

                      <div className="flex items-center gap-4 mb-3">
                        <motion.div
                          className="h-4 w-32 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                        <motion.div
                          className="h-4 w-24 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                        <motion.div
                          className="h-4 w-20 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                      </div>

                      <motion.div
                        className="h-4 w-64 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-3"
                        style={{
                          backgroundSize: "200% 100%",
                        }}
                        animate={shimmer.animate}
                        transition={shimmer.transition}
                      />

                      <div className="space-y-2 mb-4">
                        <motion.div
                          className="h-4 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                        <motion.div
                          className="h-4 w-3/4 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                          animate={shimmer.animate}
                          transition={shimmer.transition}
                        />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {[...Array(4)].map((_, j) => (
                          <motion.div
                            key={j}
                            className="h-6 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                            animate={shimmer.animate}
                            transition={shimmer.transition}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        {[...Array(4)].map((_, j) => (
                          <div key={j} className="text-center p-3 bg-dark-700/30 rounded-lg">
                            <motion.div
                              className="h-6 w-8 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-1 mx-auto"
                              style={{
                                backgroundSize: "200% 100%",
                              }}
                              animate={shimmer.animate}
                              transition={shimmer.transition}
                            />
                            <motion.div
                              className="h-3 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mx-auto"
                              style={{
                                backgroundSize: "200% 100%",
                              }}
                              animate={shimmer.animate}
                              transition={shimmer.transition}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.div
                      className="flex-1 h-10 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                    <motion.div
                      className="h-10 w-32 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                    <motion.div
                      className="h-10 w-24 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                      style={{
                        backgroundSize: "200% 100%",
                      }}
                      animate={shimmer.animate}
                      transition={shimmer.transition}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
