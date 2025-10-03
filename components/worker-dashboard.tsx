"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Wallet, Star, Award, DollarSign, BookOpen, ChevronRight, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export function WorkerDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const workerData = {
    name: user?.name || "Ahmad Rizki",
    email: user?.email || "ahmad.rizki@email.com",
    avatar: "/professional-indonesian-man.jpg",
    level: "Intermediate",
    completedProjects: 24,
    rating: 4.8,
    earnings: 15750000,
    skillPoints: 1250,
    badges: ["Fast Delivery", "Quality Work", "Communication Expert"],
  }

  const skills = [
    { name: "Web Development", level: 85, category: "Technical" },
    { name: "UI/UX Design", level: 72, category: "Design" },
    { name: "Content Writing", level: 90, category: "Content" },
    { name: "Digital Marketing", level: 68, category: "Marketing" },
  ]

  const recentProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "PT Digital Nusantara",
      status: "Completed",
      rating: 5,
      earnings: 2500000,
      completedAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "Startup Teknologi",
      status: "In Progress",
      earnings: 1800000,
      progress: 75,
    },
    {
      id: 3,
      title: "Content Marketing Strategy",
      client: "CV Kreatif Media",
      status: "Completed",
      rating: 4.9,
      earnings: 1200000,
      completedAt: "2024-01-10",
    },
  ]

  const recommendedProjects = [
    {
      id: 1,
      title: "React.js Dashboard Development",
      client: "PT Tech Solutions",
      budget: "Rp 3,000,000 - Rp 5,000,000",
      deadline: "2 minggu",
      matchScore: 95,
      skills: ["React.js", "JavaScript", "CSS"],
    },
    {
      id: 2,
      title: "Landing Page Design & Development",
      client: "Startup Fintech",
      budget: "Rp 2,000,000 - Rp 3,500,000",
      deadline: "1 minggu",
      matchScore: 88,
      skills: ["HTML", "CSS", "JavaScript", "Figma"],
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Button asChild>
          <Link href="/projects">
            <Briefcase className="w-4 h-4 mr-2" />
            Cari Proyek
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Proyek Selesai</p>
                <p className="text-3xl font-bold text-foreground">{workerData.completedProjects}</p>
                <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Rating</p>
                <p className="text-3xl font-bold text-foreground">{workerData.rating}</p>
                <p className="text-xs text-muted-foreground">Dari 5.0</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Penghasilan</p>
                <p className="text-3xl font-bold text-foreground">Rp {(workerData.earnings / 1000000).toFixed(1)}M</p>
                <p className="text-xs text-muted-foreground">+15% dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Skill Points</p>
                <p className="text-3xl font-bold text-foreground">{workerData.skillPoints}</p>
                <p className="text-xs text-muted-foreground">Level {workerData.level}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <CardTitle className="text-xl font-semibold">Proyek Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nama Proyek</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Rating</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Penghasilan</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{project.title}</p>
                          <p className="text-sm text-muted-foreground">{project.client}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          project.status === "Completed"
                            ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                            : project.status === "In Progress"
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
                        }
                      >
                        {project.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      {project.rating ? (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-foreground">{project.rating}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-foreground">Rp {project.earnings.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      {project.progress ? (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-foreground min-w-[3rem]">{project.progress}%</span>
                          <div className="flex-1 max-w-[100px]">
                            <div className="w-full bg-muted rounded-full h-2">
                              <div
                                className="bg-primary h-2 rounded-full transition-all"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold">Rekomendasi Proyek</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {recommendedProjects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground">{project.title}</h4>
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">{project.matchScore}% Match</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span>{project.budget}</span>
                  <span>•</span>
                  <span>{project.deadline}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="w-full">
                  Lihat Detail
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Skill Development</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/learning">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Learning
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">{skill.name}</h4>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                  </div>
                  <Badge variant="outline" className="font-semibold">
                    {skill.level}%
                  </Badge>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Saldo Tersedia</p>
                <p className="text-2xl font-bold text-foreground">Rp 2,450,000</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
            </div>
            <Button className="w-full" asChild>
              <Link href="/dashboard/worker/wallet">
                <Wallet className="w-4 h-4 mr-2" />
                Tarik Dana
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Penghasilan Bulan Ini</p>
                <p className="text-2xl font-bold text-foreground">Rp 4,200,000</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +25% dari bulan lalu
                </p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Rata-rata per Proyek</p>
                <p className="text-2xl font-bold text-foreground">Rp 1,750,000</p>
                <p className="text-xs text-muted-foreground">Berdasarkan 24 proyek</p>
              </div>
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
