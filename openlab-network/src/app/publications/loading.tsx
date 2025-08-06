"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import ParticleBackground from "@/components/ui/particle-background"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    },
  },
}

export default function PublicationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div className="max-w-7xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header Skeleton */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <motion.div
                  className="h-10 w-80 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg mb-2"
                  variants={shimmer}
                  animate="animate"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
                <motion.div
                  className="h-6 w-96 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg"
                  variants={shimmer}
                  animate="animate"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <motion.div
                  className="h-10 w-32 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg"
                  variants={shimmer}
                  animate="animate"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
                <motion.div
                  className="h-10 w-28 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg"
                  variants={shimmer}
                  animate="animate"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="bg-dark-800/50 rounded-lg p-4 border border-dark-700"
                  variants={fadeInUp}
                >
                  <motion.div
                    className="h-8 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-2"
                    variants={shimmer}
                    animate="animate"
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  />
                  <motion.div
                    className="h-4 w-24 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                    variants={shimmer}
                    animate="animate"
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Search and Filters Skeleton */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Search Skeleton */}
                  <motion.div
                    className="h-12 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg"
                    variants={shimmer}
                    animate="animate"
                    style={{
                      backgroundSize: "200% 100%",
                    }}
                  />

                  {/* Filters Skeleton */}
                  <div className="flex flex-col lg:flex-row gap-4">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-10 w-full lg:w-48 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg"
                        variants={shimmer}
                        animate="animate"
                        style={{
                          backgroundSize: "200% 100%",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Count Skeleton */}
          <motion.div className="mb-6" variants={fadeInUp}>
            <motion.div
              className="h-5 w-48 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
              variants={shimmer}
              animate="animate"
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </motion.div>

          {/* Publications List Skeleton */}
          <div className="space-y-6">
            {[...Array(6)].map((_, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-dark-800/50 border-dark-700">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            {/* Badges Skeleton */}
                            <div className="flex items-center gap-2 mb-2">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="h-5 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-full"
                                  variants={shimmer}
                                  animate="animate"
                                  style={{
                                    backgroundSize: "200% 100%",
                                  }}
                                />
                              ))}
                            </div>

                            {/* Title Skeleton */}
                            <motion.div
                              className="h-7 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-2"
                              variants={shimmer}
                              animate="animate"
                              style={{
                                backgroundSize: "200% 100%",
                              }}
                            />
                            <motion.div
                              className="h-7 w-3/4 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-3"
                              variants={shimmer}
                              animate="animate"
                              style={{
                                backgroundSize: "200% 100%",
                              }}
                            />

                            {/* Status Badges Skeleton */}
                            <div className="flex items-center gap-2 mb-3">
                              {[...Array(3)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="h-5 w-20 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-full"
                                  variants={shimmer}
                                  animate="animate"
                                  style={{
                                    backgroundSize: "200% 100%",
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Authors Skeleton */}
                        <div className="flex items-center gap-2 mb-3">
                          <motion.div
                            className="h-4 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                          <div className="flex items-center gap-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <motion.div
                                  className="w-6 h-6 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-full"
                                  variants={shimmer}
                                  animate="animate"
                                  style={{
                                    backgroundSize: "200% 100%",
                                  }}
                                />
                                <motion.div
                                  className="h-4 w-24 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                                  variants={shimmer}
                                  animate="animate"
                                  style={{
                                    backgroundSize: "200% 100%",
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Journal and Date Skeleton */}
                        <div className="flex items-center gap-4 mb-3">
                          <motion.div
                            className="h-4 w-32 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                          <motion.div
                            className="h-4 w-24 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                          <motion.div
                            className="h-4 w-40 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                        </div>

                        {/* Abstract Skeleton */}
                        <div className="space-y-2 mb-4">
                          <motion.div
                            className="h-4 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                          <motion.div
                            className="h-4 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                          <motion.div
                            className="h-4 w-2/3 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                        </div>

                        {/* Tags Skeleton */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="h-5 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-full"
                              variants={shimmer}
                              animate="animate"
                              style={{
                                backgroundSize: "200% 100%",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Stats Sidebar Skeleton */}
                      <div className="lg:w-80 space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="text-center p-3 bg-dark-700/30 rounded-lg">
                              <motion.div
                                className="h-6 w-12 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mx-auto mb-1"
                                variants={shimmer}
                                animate="animate"
                                style={{
                                  backgroundSize: "200% 100%",
                                }}
                              />
                              <motion.div
                                className="h-3 w-16 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mx-auto"
                                variants={shimmer}
                                animate="animate"
                                style={{
                                  backgroundSize: "200% 100%",
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        <div className="p-3 bg-dark-700/30 rounded-lg">
                          <motion.div
                            className="h-3 w-12 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded mb-1"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                          <motion.div
                            className="h-4 w-full bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded"
                            variants={shimmer}
                            animate="animate"
                            style={{
                              backgroundSize: "200% 100%",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="h-10 flex-1 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg"
                          variants={shimmer}
                          animate="animate"
                          style={{
                            backgroundSize: "200% 100%",
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More Button Skeleton */}
          <div className="text-center mt-12">
            <motion.div
              className="h-10 w-48 bg-gradient-to-r from-dark-700 via-dark-600 to-dark-700 rounded-lg mx-auto"
              variants={shimmer}
              animate="animate"
              style={{
                backgroundSize: "200% 100%",
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
