"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CompanySidebar } from "@/components/company-sidebar"
import { Search, Plus, Calendar, DollarSign, Users, Clock } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform Development",
    description: "Pengembangan platform e-commerce dengan fitur lengkap untuk UMKM",
    status: "active",
    budget: "Rp 50,000,000",
    deadline: "2024-03-15",
    assignedWorkers: 3,
    progress: 65,
    category: "Web Development",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Aplikasi mobile banking dengan fitur keamanan tinggi",
    status: "planning",
    budget: "Rp 75,000,000",
    deadline: "2024-04-30",
    assignedWorkers: 0,
    progress: 0,
    category: "Mobile Development",
  },
  {
    id: 3,
    title: "Corporate Website Redesign",
    description: "Redesign website perusahaan dengan modern UI/UX",
    status: "completed",
    budget: "Rp 25,000,000",
    deadline: "2024-01-20",
    assignedWorkers: 2,
    progress: 100,
    category: "Web Design",
  },
  {
    id: 4,
    title: "Data Analytics Dashboard",
    description: "Dashboard analytics untuk monitoring business metrics",
    status: "active",
    budget: "Rp 35,000,000",
    deadline: "2024-02-28",
    assignedWorkers: 2,
    progress: 40,
    category: "Data Analytics",
  },
]

export default function CompanyProjects() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const userData = localStorage.getItem("kerjoo_user")
    const authStatus = localStorage.getItem("kerjoo_auth")

    if (!userData || !authStatus || authStatus !== "true") {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-100 text-blue-800">Aktif</Badge>
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>
      case "planning":
        return <Badge className="bg-yellow-100 text-yellow-800">Perencanaan</Badge>
      case "on-hold":
        return <Badge className="bg-gray-100 text-gray-800">Ditunda</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewDetail = (projectId: number) => {
    router.push(`/dashboard/company/projects/${projectId}`)
  }

  const handleManageProject = (projectId: number) => {
    router.push(`/dashboard/company/projects/${projectId}/manage`)
  }

  const handleCreateProject = () => {
    router.push("/dashboard/company/projects/new")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Manajemen Proyek</h1>
              <p className="text-muted-foreground">Kelola dan pantau semua proyek perusahaan</p>
            </div>
            <Button onClick={handleCreateProject}>
              <Plus className="w-4 h-4 mr-2" />
              Proyek Baru
            </Button>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Proyek</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">+2 dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proyek Aktif</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.filter((p) => p.status === "active").length}</div>
                <p className="text-xs text-muted-foreground">Sedang dikerjakan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 185M</div>
                <p className="text-xs text-muted-foreground">Semua proyek</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Worker Assigned</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">Pekerja aktif</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari proyek..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant={statusFilter === "all" ? "default" : "outline"} onClick={() => setStatusFilter("all")}>
                Semua
              </Button>
              <Button
                variant={statusFilter === "active" ? "default" : "outline"}
                onClick={() => setStatusFilter("active")}
              >
                Aktif
              </Button>
              <Button
                variant={statusFilter === "planning" ? "default" : "outline"}
                onClick={() => setStatusFilter("planning")}
              >
                Perencanaan
              </Button>
              <Button
                variant={statusFilter === "completed" ? "default" : "outline"}
                onClick={() => setStatusFilter("completed")}
              >
                Selesai
              </Button>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">{project.description}</CardDescription>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="outline">{project.category}</Badge>
                    <span className="font-medium">{project.budget}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Deadline
                      </span>
                      <span>{new Date(project.deadline).toLocaleDateString("id-ID")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Workers
                      </span>
                      <span>{project.assignedWorkers} assigned</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-transparent"
                      variant="outline"
                      onClick={() => handleViewDetail(project.id)}
                    >
                      Lihat Detail
                    </Button>
                    <Button className="flex-1" onClick={() => handleManageProject(project.id)}>
                      Kelola
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada proyek yang ditemukan</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
