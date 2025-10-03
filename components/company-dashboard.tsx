"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase, Star, Search, Filter, Plus, Eye, MessageSquare, DollarSign, Target } from "lucide-react"
import { CompanySidebar } from "@/components/company-sidebar"

export function CompanyDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")

  // Mock data
  const companyData = {
    name: "PT Digital Nusantara",
    activeProjects: 12,
    totalWorkers: 45,
    completedProjects: 128,
    averageRating: 4.7,
    monthlyBudget: 85000000,
  }

  const talentPool = [
    {
      id: 1,
      name: "Ahmad Rizki",
      avatar: "/placeholder.svg?key=talent1",
      skills: ["React.js", "Node.js", "TypeScript"],
      rating: 4.9,
      completedProjects: 24,
      hourlyRate: 150000,
      availability: "Available",
      matchScore: 95,
      lastActive: "2 jam lalu",
      location: "Jakarta",
    },
    {
      id: 2,
      name: "Sari Dewi",
      avatar: "/placeholder.svg?key=talent2",
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      rating: 4.8,
      completedProjects: 18,
      hourlyRate: 120000,
      availability: "Busy",
      matchScore: 88,
      lastActive: "1 hari lalu",
      location: "Bandung",
    },
    {
      id: 3,
      name: "Budi Santoso",
      avatar: "/placeholder.svg?key=talent3",
      skills: ["Content Writing", "SEO", "Digital Marketing"],
      rating: 4.7,
      completedProjects: 32,
      hourlyRate: 100000,
      availability: "Available",
      matchScore: 82,
      lastActive: "30 menit lalu",
      location: "Surabaya",
    },
  ]

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      worker: "Ahmad Rizki",
      progress: 75,
      priority: "High",
      hours: 120,
      deadline: "2024-02-15",
      budget: 5000000,
      status: "In Progress",
      members: ["/placeholder.svg?key=talent1"],
    },
    {
      id: 2,
      title: "Company Website Redesign",
      worker: "Sari Dewi",
      progress: 45,
      priority: "Medium",
      hours: 80,
      deadline: "2024-02-20",
      budget: 3500000,
      status: "In Progress",
      members: ["/placeholder.svg?key=talent2", "/placeholder.svg?key=talent1"],
    },
    {
      id: 3,
      title: "Content Marketing Campaign",
      worker: "Budi Santoso",
      progress: 90,
      priority: "Low",
      hours: 40,
      deadline: "2024-02-10",
      budget: 2000000,
      status: "Review",
      members: ["/placeholder.svg?key=talent3"],
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Proyek</h1>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post Proyek Baru
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Proyek Aktif</p>
                    <p className="text-3xl font-bold text-foreground">{companyData.activeProjects}</p>
                    <p className="text-xs text-muted-foreground">+3 dari bulan lalu</p>
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
                    <p className="text-sm font-medium text-muted-foreground">Total Pekerja</p>
                    <p className="text-3xl font-bold text-foreground">{companyData.totalWorkers}</p>
                    <p className="text-xs text-muted-foreground">Aktif bekerja</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Proyek Selesai</p>
                    <p className="text-3xl font-bold text-foreground">{companyData.completedProjects}</p>
                    <p className="text-xs text-muted-foreground">Success rate 98%</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Budget Bulan Ini</p>
                    <p className="text-3xl font-bold text-foreground">
                      Rp {(companyData.monthlyBudget / 1000000).toFixed(0)}M
                    </p>
                    <p className="text-xs text-muted-foreground">75% terpakai</p>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-xl font-semibold">Proyek Aktif</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nama Proyek</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Jam</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Prioritas</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Anggota</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {activeProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-muted/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                              <Briefcase className="w-5 h-5 text-primary-foreground" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{project.title}</p>
                              <p className="text-sm text-muted-foreground">Dikerjakan oleh {project.worker}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-foreground">{project.hours}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              project.priority === "High"
                                ? "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
                                : project.priority === "Medium"
                                  ? "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                                  : "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                            }
                          >
                            {project.priority}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {project.members.map((member, idx) => (
                              <Avatar key={idx} className="w-8 h-8 border-2 border-background">
                                <AvatarImage src={member || "/placeholder.svg"} />
                                <AvatarFallback>U</AvatarFallback>
                              </Avatar>
                            ))}
                            {project.members.length > 2 && (
                              <div className="w-8 h-8 rounded-full bg-primary border-2 border-background flex items-center justify-center">
                                <span className="text-xs text-primary-foreground font-medium">
                                  +{project.members.length - 2}
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-foreground min-w-[3rem]">
                              {project.progress}%
                            </span>
                            <div className="flex-1 max-w-[100px]">
                              <div className="w-full bg-muted rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Cari berdasarkan nama, skill, atau lokasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="react">React.js</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="content">Content Writing</SelectItem>
                      <SelectItem value="marketing">Digital Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Lanjutan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talentPool.map((talent) => (
                <Card key={talent.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                          <AvatarFallback>
                            {talent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-foreground">{talent.name}</h3>
                          <p className="text-sm text-muted-foreground">{talent.location}</p>
                        </div>
                      </div>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {talent.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {talent.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-foreground">{talent.rating}</span>
                          <span className="text-muted-foreground">({talent.completedProjects} proyek)</span>
                        </div>
                        <Badge
                          variant={talent.availability === "Available" ? "default" : "secondary"}
                          className={
                            talent.availability === "Available"
                              ? "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
                              : ""
                          }
                        >
                          {talent.availability}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">Rp {talent.hourlyRate.toLocaleString()}/jam</span>
                        <span className="text-muted-foreground">{talent.lastActive}</span>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Profil
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
