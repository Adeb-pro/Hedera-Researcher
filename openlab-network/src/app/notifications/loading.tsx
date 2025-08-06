import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-4 w-32 mb-6 bg-dark-700" />
            <div className="flex items-center justify-between">
              <div>
                <Skeleton className="h-10 w-64 mb-2 bg-dark-700" />
                <Skeleton className="h-4 w-48 bg-dark-700" />
              </div>
              <Skeleton className="h-10 w-24 bg-dark-700" />
            </div>
          </div>

          {/* Search and Filters Skeleton */}
          <Card className="bg-dark-800/50 border-dark-700 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <Skeleton className="flex-1 h-10 bg-dark-700" />
                <Skeleton className="h-10 w-24 bg-dark-700" />
              </div>
            </CardContent>
          </Card>

          {/* Tabs Skeleton */}
          <div className="mb-6">
            <div className="grid w-full grid-cols-2 gap-2 mb-6">
              <Skeleton className="h-10 bg-dark-700" />
              <Skeleton className="h-10 bg-dark-700" />
            </div>
          </div>

          {/* Notifications Skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="bg-dark-800/50 border-dark-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-4 h-4 bg-dark-700" />
                    <Skeleton className="w-5 h-5 bg-dark-700" />
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-5 w-48 bg-dark-700" />
                          <Skeleton className="h-5 w-16 bg-dark-700" />
                        </div>
                        <Skeleton className="h-4 w-20 bg-dark-700" />
                      </div>
                      <Skeleton className="h-4 w-full bg-dark-700" />
                      <div className="bg-dark-900/50 rounded-lg p-3 space-y-2">
                        <Skeleton className="h-3 w-full bg-dark-600" />
                        <Skeleton className="h-3 w-3/4 bg-dark-600" />
                        <Skeleton className="h-3 w-1/2 bg-dark-600" />
                      </div>
                    </div>
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
