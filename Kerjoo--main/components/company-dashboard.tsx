"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Briefcase, Star, Search, Filter, Eye, MessageSquare, DollarSign, Target } from "lucide-react"

export function CompanyDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSkill, setSelectedSkill] = useState("")

  const companyData = {
    activeProjects: 12,
    totalWorkers: 45,
    completedProjects: 128,
    monthlyBudget: 85000000,
  }

  const activeProjects = [
    {
      id: 1,
      title: "E-commerce Mobile App",
      worker: "Ahmad Rizki",
      status: "In Progress",
      priority: "High",
      hours: 120,
      deadline: "2024-02-15",
      budget: 5000000,
      progress: 75,
      members: ["/professional-indonesian-man.jpg"],
    },
    {
      id: 2,
      title: "Company Website Redesign",
      worker: "Sari Dewi",
      status: "In Progress",
      priority: "Medium",
      hours: 80,
      deadline: "2024-02-20",
      budget: 3500000,
      progress: 45,
      members: ["/professional-indonesian-woman.jpg", "/professional-indonesian-man.jpg"],
    },
    {
      id: 3,
      title: "Content Marketing Campaign",
      worker: "Budi Santoso",
      status: "Review",
      priority: "Low",
      hours: 40,
      deadline: "2024-02-10",
      budget: 2000000,
      progress: 90,
      members: ["/professional-indonesian-man-developer.jpg"],
    },
  ]

  const talentPool = [
    {
      id: 1,
      name: "Ahmad Rizki",
      location: "Jakarta",
      skills: ["React.js", "Node.js", "TypeScript"],
      rating: 4.9,
      completedProjects: 24,
      availability: "Available",
      hourlyRate: 150000,
      lastActive: "2 jam lalu",
      avatar: "/professional-indonesian-man.jpg",
      matchScore: 95,
    },
    {
      id: 2,
      name: "Sari Dewi",
      location: "Bandung",
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      rating: 4.8,
      completedProjects: 18,
      availability: "Busy",
      hourlyRate: 120000,
      lastActive: "1 hari lalu",
      avatar: "/professional-indonesian-woman.jpg",
      matchScore: 88,
    },
    {
      id: 3,
      name: "Budi Santoso",
      location: "Surabaya",
      skills: ["Content Writing", "SEO", "Digital Marketing"],
      rating: 4.7,
      completedProjects: 32,
      availability: "Available",
      hourlyRate: 100000,
      lastActive: "30 menit lalu",
      avatar: "/professional-indonesian-man-developer.jpg",
      matchScore: 82,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proyek</h1>
        </div>
        <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm">Post Proyek Baru</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Proyek Aktif</p>
                <p className="text-3xl font-bold text-gray-900">{companyData.activeProjects}</p>
                <p className="text-xs text-gray-500">+3 dari bulan lalu</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Total Pekerja</p>
                <p className="text-3xl font-bold text-gray-900">{companyData.totalWorkers}</p>
                <p className="text-xs text-gray-500">Aktif bekerja</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Proyek Selesai</p>
                <p className="text-3xl font-bold text-gray-900">{companyData.completedProjects}</p>
                <p className="text-xs text-gray-500">Success rate 98%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Budget Bulan Ini</p>
                <p className="text-3xl font-bold text-gray-900">
                  Rp {(companyData.monthlyBudget / 1000000).toFixed(0)}M
                </p>
                <p className="text-xs text-gray-500">75% terpakai</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-semibold text-gray-900">Proyek Aktif</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Nama Proyek</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Jam</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Prioritas</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Anggota</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-600">Progress</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {activeProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{project.title}</p>
                          <p className="text-sm text-gray-500">Dikerjakan oleh {project.worker}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-900">{project.hours}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={
                          project.priority === "High"
                            ? "bg-red-100 text-red-700 hover:bg-red-100"
                            : project.priority === "Medium"
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                              : "bg-green-100 text-green-700 hover:bg-green-100"
                        }
                      >
                        {project.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.members.map((member, idx) => (
                          <Avatar key={idx} className="w-8 h-8 border-2 border-white">
                            <AvatarImage src={member || "/placeholder.svg"} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                        {project.members.length > 2 && (
                          <div className="w-8 h-8 rounded-full bg-purple-600 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-white font-medium">+{project.members.length - 2}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-gray-900 min-w-[3rem]">{project.progress}%</span>
                        <div className="flex-1 max-w-[100px]">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full transition-all"
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

      {/* Talent Pool Section */}
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card className="bg-white border-0 shadow-sm">
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

        {/* Talent Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talentPool.map((talent) => (
            <Card key={talent.id} className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
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
                      <h3 className="font-semibold text-gray-900">{talent.name}</h3>
                      <p className="text-sm text-gray-500">{talent.location}</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
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
                      <span className="text-gray-900">{talent.rating}</span>
                      <span className="text-gray-500">({talent.completedProjects} proyek)</span>
                    </div>
                    <Badge
                      variant={talent.availability === "Available" ? "default" : "secondary"}
                      className={
                        talent.availability === "Available"
                          ? "bg-green-100 text-green-700 hover:bg-green-100"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                      }
                    >
                      {talent.availability}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">Rp {talent.hourlyRate.toLocaleString()}/jam</span>
                    <span className="text-gray-500">{talent.lastActive}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
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
  )
}
