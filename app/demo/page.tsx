"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DemoPage() {
  const [activeDemo, setActiveDemo] = useState("assessment")

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Demo Interaktif
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Lihat Kerjoo! <span className="text-primary">Beraksi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Jelajahi fitur-fitur unggulan platform kami melalui demo interaktif
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Demo Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Pilih Demo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={activeDemo === "assessment" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveDemo("assessment")}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    AI Skill Assessment
                  </Button>
                  <Button
                    variant={activeDemo === "dashboard" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveDemo("dashboard")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Worker Dashboard
                  </Button>
                  <Button
                    variant={activeDemo === "matching" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveDemo("matching")}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    AI Job Matching
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Demo Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {activeDemo === "assessment" && (
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Brain className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">AI Skill Assessment</h3>
                      <p className="text-muted-foreground mb-6">
                        Sistem penilaian otomatis yang menganalisis kemampuan teknis dan soft skill Anda
                      </p>
                      <div className="bg-muted/50 rounded-lg p-6 mb-6">
                        <div className="text-left space-y-4">
                          <div className="flex items-center justify-between">
                            <span>JavaScript Proficiency</span>
                            <Badge>Expert - 95%</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>React.js Knowledge</span>
                            <Badge>Advanced - 88%</Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Problem Solving</span>
                            <Badge>Expert - 92%</Badge>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href="/assessment">
                          Coba Assessment
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {activeDemo === "dashboard" && (
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">Worker Dashboard</h3>
                      <p className="text-muted-foreground mb-6">
                        Dashboard lengkap untuk mengelola proyek, skill, dan penghasilan Anda
                      </p>
                      <div className="bg-muted/50 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-primary">12</div>
                            <div className="text-sm text-muted-foreground">Proyek Selesai</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">4.9</div>
                            <div className="text-sm text-muted-foreground">Rating</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-primary">Rp 8.5M</div>
                            <div className="text-sm text-muted-foreground">Total Earnings</div>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href="/dashboard/worker">
                          Lihat Dashboard
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  )}

                  {activeDemo === "matching" && (
                    <div className="text-center">
                      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <TrendingUp className="w-12 h-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">AI Job Matching</h3>
                      <p className="text-muted-foreground mb-6">
                        Algoritma cerdas yang mencocokkan skill Anda dengan proyek yang tepat
                      </p>
                      <div className="bg-muted/50 rounded-lg p-6 mb-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-background rounded">
                            <span className="font-medium">React Developer - TechCorp</span>
                            <Badge className="bg-green-600">98% Match</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-background rounded">
                            <span className="font-medium">UI/UX Designer - StartupXYZ</span>
                            <Badge className="bg-blue-600">85% Match</Badge>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-background rounded">
                            <span className="font-medium">Content Writer - MediaCo</span>
                            <Badge className="bg-yellow-600">72% Match</Badge>
                          </div>
                        </div>
                      </div>
                      <Button asChild>
                        <Link href="/jobs">
                          Cari Pekerjaan
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-bold mb-4">Siap Memulai?</h3>
            <p className="text-muted-foreground mb-6">
              Bergabunglah dengan ribuan pekerja yang telah merasakan manfaat Kerjoo!
            </p>
            <Button size="lg" asChild>
              <Link href="/register">
                Daftar Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
