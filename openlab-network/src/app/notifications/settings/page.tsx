"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Bell, Mail, Smartphone, Save, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import ParticleBackground from "@/components/ui/particle-background"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface NotificationSettings {
  email: {
    enabled: boolean
    frequency: string
    digest: boolean
    digestDay: string
    digestTime: string
  }
  push: {
    enabled: boolean
    sound: boolean
    vibration: boolean
    quietHours: {
      enabled: boolean
      start: string
      end: string
    }
  }
  inApp: {
    enabled: boolean
    desktop: boolean
    priority: string
  }
  categories: {
    reviews: boolean
    funding: boolean
    collaborations: boolean
    publications: boolean
    messages: boolean
    deadlines: boolean
    system: boolean
  }
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      frequency: "immediate",
      digest: true,
      digestDay: "monday",
      digestTime: "09:00",
    },
    push: {
      enabled: true,
      sound: true,
      vibration: true,
      quietHours: {
        enabled: true,
        start: "22:00",
        end: "08:00",
      },
    },
    inApp: {
      enabled: true,
      desktop: true,
      priority: "all",
    },
    categories: {
      reviews: true,
      funding: true,
      collaborations: true,
      publications: true,
      messages: true,
      deadlines: true,
      system: false,
    },
  })

  const [hasChanges, setHasChanges] = useState(false)

  const updateSettings = (path: string, value: string | boolean | number) => {
    setSettings((prev) => {
      const keys = path.split(".")
      const updated = { ...prev }
      let current: any = updated

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return updated
    })
    setHasChanges(true)
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Saving settings:", settings)
    setHasChanges(false)
  }

  const handleReset = () => {
    // Reset to defaults
    setHasChanges(false)
  }

  const presets = [
    {
      name: "All Notifications",
      description: "Receive all notifications immediately",
      action: () => {
        setSettings((prev) => ({
          ...prev,
          email: { ...prev.email, enabled: true, frequency: "immediate" },
          push: { ...prev.push, enabled: true },
          inApp: { ...prev.inApp, enabled: true },
          categories: Object.keys(prev.categories).reduce((acc, key) => ({ ...acc, [key]: true }), {} as NotificationSettings['categories']),
        }))
        setHasChanges(true)
      },
    },
    {
      name: "Important Only",
      description: "Only urgent notifications and deadlines",
      action: () => {
        setSettings((prev) => ({
          ...prev,
          email: { ...prev.email, enabled: true, frequency: "daily" },
          push: { ...prev.push, enabled: true },
          inApp: { ...prev.inApp, enabled: true, priority: "high" },
          categories: {
            reviews: true,
            funding: false,
            collaborations: false,
            publications: true,
            messages: false,
            deadlines: true,
            system: false,
          },
        }))
        setHasChanges(true)
      },
    },
    {
      name: "Minimal",
      description: "Weekly digest only",
      action: () => {
        setSettings((prev) => ({
          ...prev,
          email: { ...prev.email, enabled: true, frequency: "weekly", digest: true },
          push: { ...prev.push, enabled: false },
          inApp: { ...prev.inApp, enabled: true },
          categories: {
            reviews: true,
            funding: true,
            collaborations: false,
            publications: true,
            messages: false,
            deadlines: true,
            system: false,
          },
        }))
        setHasChanges(true)
      },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-dark-50">
      <ParticleBackground />

      <div className="container mx-auto px-4 py-8">
        <motion.div className="max-w-4xl mx-auto" initial="initial" animate="animate" variants={staggerContainer}>
          {/* Header */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Link href="/notifications" className="inline-flex items-center text-accent-400 hover:text-accent-300 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notifications
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Notification Settings</h1>
                <p className="text-dark-400">Customize how you receive notifications</p>
              </div>
              {hasChanges && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="border-dark-600 text-dark-300 bg-transparent"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Presets */}
          <motion.div className="mb-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary-400" />
                  Quick Presets
                </CardTitle>
                <CardDescription>Apply common notification configurations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {presets.map((preset, index) => (
                    <Card
                      key={index}
                      className="bg-dark-900/50 border-dark-600 hover:border-primary-500/30 cursor-pointer transition-colors"
                      onClick={preset.action}
                    >
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{preset.name}</h3>
                        <p className="text-sm text-dark-400">{preset.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Email Notifications */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-accent-400" />
                    Email Notifications
                  </CardTitle>
                  <CardDescription>Configure email notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email-enabled">Enable email notifications</Label>
                    <Switch
                      id="email-enabled"
                      checked={settings.email.enabled}
                      onCheckedChange={(checked) => updateSettings("email.enabled", checked)}
                    />
                  </div>

                  {settings.email.enabled && (
                    <>
                      <Separator className="bg-dark-600" />

                      <div className="space-y-2">
                        <Label>Frequency</Label>
                        <Select
                          value={settings.email.frequency}
                          onValueChange={(value) => updateSettings("email.frequency", value)}
                        >
                          <SelectTrigger className="bg-dark-700 border-dark-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-dark-800 border-dark-700">
                            <SelectItem value="immediate">Immediate</SelectItem>
                            <SelectItem value="hourly">Hourly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-digest">Weekly digest</Label>
                        <Switch
                          id="email-digest"
                          checked={settings.email.digest}
                          onCheckedChange={(checked) => updateSettings("email.digest", checked)}
                        />
                      </div>

                      {settings.email.digest && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Day</Label>
                            <Select
                              value={settings.email.digestDay}
                              onValueChange={(value) => updateSettings("email.digestDay", value)}
                            >
                              <SelectTrigger className="bg-dark-700 border-dark-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-800 border-dark-700">
                                <SelectItem value="monday">Monday</SelectItem>
                                <SelectItem value="tuesday">Tuesday</SelectItem>
                                <SelectItem value="wednesday">Wednesday</SelectItem>
                                <SelectItem value="thursday">Thursday</SelectItem>
                                <SelectItem value="friday">Friday</SelectItem>
                                <SelectItem value="saturday">Saturday</SelectItem>
                                <SelectItem value="sunday">Sunday</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Time</Label>
                            <Select
                              value={settings.email.digestTime}
                              onValueChange={(value) => updateSettings("email.digestTime", value)}
                            >
                              <SelectTrigger className="bg-dark-700 border-dark-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-800 border-dark-700">
                                <SelectItem value="08:00">8:00 AM</SelectItem>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                <SelectItem value="12:00">12:00 PM</SelectItem>
                                <SelectItem value="18:00">6:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Push Notifications */}
            <motion.div variants={fadeInUp}>
              <Card className="bg-dark-800/50 border-dark-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-secondary-400" />
                    Push Notifications
                  </CardTitle>
                  <CardDescription>Configure push notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-enabled">Enable push notifications</Label>
                    <Switch
                      id="push-enabled"
                      checked={settings.push.enabled}
                      onCheckedChange={(checked) => updateSettings("push.enabled", checked)}
                    />
                  </div>

                  {settings.push.enabled && (
                    <>
                      <Separator className="bg-dark-600" />

                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-sound">Sound</Label>
                        <Switch
                          id="push-sound"
                          checked={settings.push.sound}
                          onCheckedChange={(checked) => updateSettings("push.sound", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="push-vibration">Vibration</Label>
                        <Switch
                          id="push-vibration"
                          checked={settings.push.vibration}
                          onCheckedChange={(checked) => updateSettings("push.vibration", checked)}
                        />
                      </div>

                      <Separator className="bg-dark-600" />

                      <div className="flex items-center justify-between">
                        <Label htmlFor="quiet-hours">Quiet hours</Label>
                        <Switch
                          id="quiet-hours"
                          checked={settings.push.quietHours.enabled}
                          onCheckedChange={(checked) => updateSettings("push.quietHours.enabled", checked)}
                        />
                      </div>

                      {settings.push.quietHours.enabled && (
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start</Label>
                            <Select
                              value={settings.push.quietHours.start}
                              onValueChange={(value) => updateSettings("push.quietHours.start", value)}
                            >
                              <SelectTrigger className="bg-dark-700 border-dark-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-800 border-dark-700">
                                <SelectItem value="20:00">8:00 PM</SelectItem>
                                <SelectItem value="21:00">9:00 PM</SelectItem>
                                <SelectItem value="22:00">10:00 PM</SelectItem>
                                <SelectItem value="23:00">11:00 PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>End</Label>
                            <Select
                              value={settings.push.quietHours.end}
                              onValueChange={(value) => updateSettings("push.quietHours.end", value)}
                            >
                              <SelectTrigger className="bg-dark-700 border-dark-600">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-dark-800 border-dark-700">
                                <SelectItem value="06:00">6:00 AM</SelectItem>
                                <SelectItem value="07:00">7:00 AM</SelectItem>
                                <SelectItem value="08:00">8:00 AM</SelectItem>
                                <SelectItem value="09:00">9:00 AM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* In-App Notifications */}
          <motion.div className="mt-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary-400" />
                  In-App Notifications
                </CardTitle>
                <CardDescription>Configure in-app notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="inapp-enabled">Enable in-app notifications</Label>
                  <Switch
                    id="inapp-enabled"
                    checked={settings.inApp.enabled}
                    onCheckedChange={(checked) => updateSettings("inApp.enabled", checked)}
                  />
                </div>

                {settings.inApp.enabled && (
                  <>
                    <Separator className="bg-dark-600" />

                    <div className="flex items-center justify-between">
                      <Label htmlFor="desktop-notifications">Desktop notifications</Label>
                      <Switch
                        id="desktop-notifications"
                        checked={settings.inApp.desktop}
                        onCheckedChange={(checked) => updateSettings("inApp.desktop", checked)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Priority filter</Label>
                      <Select
                        value={settings.inApp.priority}
                        onValueChange={(value) => updateSettings("inApp.priority", value)}
                      >
                        <SelectTrigger className="bg-dark-700 border-dark-600">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-800 border-dark-700">
                          <SelectItem value="all">All notifications</SelectItem>
                          <SelectItem value="high">High priority only</SelectItem>
                          <SelectItem value="urgent">Urgent only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Notification Categories */}
          <motion.div className="mt-8" variants={fadeInUp}>
            <Card className="bg-dark-800/50 border-dark-700">
              <CardHeader>
                <CardTitle>Notification Categories</CardTitle>
                <CardDescription>Choose which types of notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(settings.categories).map(([category, enabled]) => (
                    <div key={category} className="flex items-center justify-between">
                      <Label htmlFor={category} className="capitalize">
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                      <Switch
                        id={category}
                        checked={enabled}
                        onCheckedChange={(checked) => updateSettings(`categories.${category}`, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
