"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Star, Award, Target } from "lucide-react"

export function WorkerDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  // Mock data with fallback to user data
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

  const recentProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "PT Digital Nusantara",
      status: "Completed",
      priority: "High",
      hours: 120,
      progress: 100,
      earnings: 2500000,
      deadline: "2024-01-15",
      members: ["/professional-indonesian-man.jpg"],
    },
    {
      id: 2,
      title: "Mobile App UI Design",
      client: "Startup Teknologi",
      status: "In Progress",
      priority: "Medium",
      hours: 80,
      progress: 75,
      earnings: 1800000,
      deadline: "2024-02-20",
      members: ["/professional-indonesian-man.jpg", "/professional-indonesian-woman.jpg"],
    },
    {
      id: 3,
      title: "Content Marketing Strategy",
      client: "CV Kreatif Media",
      status: "In Progress",
      priority: "Low",
      hours: 40,
      progress: 45,
      earnings: 1200000,
      deadline: "2024-02-25",
      members: ["/professional-indonesian-man.jpg"],
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proyek</h1>
        </div>
        <Button className="bg-white text-gray-900 hover:bg-gray-100 shadow-sm">Cari Proyek Baru</Button>
      </div>

      {/* Stats Cards with new modern design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Proyek Aktif</p>
                <p className="text-3xl font-bold text-gray-900">{workerData.completedProjects}</p>
                <p className="text-xs text-gray-500">2 Selesai</p>
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
                <p className="text-sm font-medium text-gray-600">Tugas Aktif</p>
                <p className="text-3xl font-bold text-gray-900">132</p>
                <p className="text-xs text-gray-500">28 Selesai</p>
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
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-3xl font-bold text-gray-900">{workerData.rating}</p>
                <p className="text-xs text-gray-500">Dari 5.0</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Produktivitas</p>
                <p className="text-3xl font-bold text-gray-900">76%</p>
                <p className="text-xs text-gray-500">5% Selesai</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Projects Table */}
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
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <Briefcase className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{project.title}</p>
                          <p className="text-sm text-gray-500">{project.client}</p>
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
    </div>
  )
}
