"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CompanySidebar } from "@/components/company-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Save,
  UserPlus,
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
  Star,
  Trash2,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - in real app, fetch from API
const projectData = {
  1: {
    id: 1,
    title: "E-commerce Platform Development",
    description: "Pengembangan platform e-commerce dengan fitur lengkap untuk UMKM",
    status: "active",
    budget: "50000000",
    deadline: "2024-03-15",
    category: "Web Development",
    progress: 65,
    assignedWorkers: [
      {
        id: 1,
        name: "Ahmad Rizki",
        role: "Full Stack Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "ahmad@example.com",
        phone: "+62 812-3456-7890",
        joinedDate: "2024-01-10",
      },
      {
        id: 2,
        name: "Siti Nurhaliza",
        role: "UI/UX Designer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "siti@example.com",
        phone: "+62 813-4567-8901",
        joinedDate: "2024-01-12",
      },
    ],
    applicants: [
      {
        id: 3,
        name: "Budi Santoso",
        role: "Backend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "budi@example.com",
        phone: "+62 814-5678-9012",
        appliedDate: "2024-02-01",
        status: "pending",
        matchScore: 92,
      },
      {
        id: 4,
        name: "Dewi Lestari",
        role: "Frontend Developer",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "dewi@example.com",
        phone: "+62 815-6789-0123",
        appliedDate: "2024-02-03",
        status: "pending",
        matchScore: 88,
      },
    ],
    updates: [
      {
        id: 1,
        date: "2024-02-15",
        title: "Milestone 1 Completed",
        description: "Database design dan API endpoints selesai dibuat",
        author: "Ahmad Rizki",
      },
      {
        id: 2,
        date: "2024-02-10",
        title: "UI Design Approved",
        description: "Design sistem telah disetujui oleh client",
        author: "Siti Nurhaliza",
      },
    ],
  },
}

export default function ManageProject() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string
  const [user, setUser] = useState<any>(null)
  const [project, setProject] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    status: "",
    category: "",
    progress: 0,
  })
  const [newUpdate, setNewUpdate] = useState({ title: "", description: "" })
  const [showAddUpdate, setShowAddUpdate] = useState(false)

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

      // Load project data
      const projectInfo = projectData[projectId as keyof typeof projectData]
      if (projectInfo) {
        setProject(projectInfo)
        setFormData({
          title: projectInfo.title,
          description: projectInfo.description,
          budget: projectInfo.budget,
          deadline: projectInfo.deadline,
          status: projectInfo.status,
          category: projectInfo.category,
          progress: projectInfo.progress,
        })
      }
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router, projectId])

  const handleSaveChanges = () => {
    // In real app, save to API
    console.log("Saving changes:", formData)
    setProject({ ...project, ...formData })
    setIsEditing(false)
  }

  const handleApproveApplicant = (applicantId: number) => {
    console.log("Approving applicant:", applicantId)
    // In real app, move applicant to assigned workers
  }

  const handleRejectApplicant = (applicantId: number) => {
    console.log("Rejecting applicant:", applicantId)
    // In real app, update applicant status
  }

  const handleRemoveWorker = (workerId: number) => {
    console.log("Removing worker:", workerId)
    // In real app, remove worker from project
  }

  const handleAddUpdate = () => {
    if (newUpdate.title && newUpdate.description) {
      console.log("Adding update:", newUpdate)
      // In real app, save to API
      setShowAddUpdate(false)
      setNewUpdate({ title: "", description: "" })
    }
  }

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

  if (!user || !project) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => router.back()}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Kelola Proyek</h1>
                <p className="text-muted-foreground">Manage project details and team</p>
              </div>
            </div>
            {getStatusBadge(project.status)}
          </div>

          <Tabs defaultValue="details" className="space-y-6">
            <TabsList>
              <TabsTrigger value="details">Detail Proyek</TabsTrigger>
              <TabsTrigger value="team">Tim & Pekerja</TabsTrigger>
              <TabsTrigger value="applicants">
                Pelamar
                {project.applicants.length > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    {project.applicants.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="updates">Update Proyek</TabsTrigger>
            </TabsList>

            {/* Project Details Tab */}
            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Informasi Proyek</CardTitle>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Batal
                        </Button>
                        <Button onClick={handleSaveChanges}>
                          <Save className="w-4 h-4 mr-2" />
                          Simpan
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Judul Proyek</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Kategori</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="budget"
                          type="number"
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Deadline</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="deadline"
                          type="date"
                          value={formData.deadline}
                          onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                          disabled={!isEditing}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData({ ...formData, status: value })}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="planning">Perencanaan</SelectItem>
                          <SelectItem value="active">Aktif</SelectItem>
                          <SelectItem value="on-hold">Ditunda</SelectItem>
                          <SelectItem value="completed">Selesai</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="progress">Progress</Label>
                      <span className="text-sm font-medium">{formData.progress}%</span>
                    </div>
                    <Input
                      id="progress"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={(e) => setFormData({ ...formData, progress: Number.parseInt(e.target.value) })}
                      disabled={!isEditing}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Tim Proyek</CardTitle>
                      <CardDescription>{project.assignedWorkers.length} pekerja assigned</CardDescription>
                    </div>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Tambah Pekerja
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.assignedWorkers.map((worker: any) => (
                      <div key={worker.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={worker.avatar || "/placeholder.svg"}
                            alt={worker.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <h4 className="font-semibold">{worker.name}</h4>
                            <p className="text-sm text-muted-foreground">{worker.role}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {worker.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {worker.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Joined {worker.joinedDate}</Badge>
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveWorker(worker.id)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Applicants Tab */}
            <TabsContent value="applicants" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pelamar Proyek</CardTitle>
                  <CardDescription>Review dan approve pelamar untuk proyek ini</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.applicants.map((applicant: any) => (
                      <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={applicant.avatar || "/placeholder.svg"}
                            alt={applicant.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold">{applicant.name}</h4>
                              <Badge className="bg-green-100 text-green-800">
                                <Star className="w-3 h-3 mr-1" />
                                {applicant.matchScore}% Match
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{applicant.role}</p>
                            <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {applicant.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Applied {applicant.appliedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleRejectApplicant(applicant.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Tolak
                          </Button>
                          <Button size="sm" onClick={() => handleApproveApplicant(applicant.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Terima
                          </Button>
                        </div>
                      </div>
                    ))}
                    {project.applicants.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">Belum ada pelamar untuk proyek ini</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Updates Tab */}
            <TabsContent value="updates" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Update Proyek</CardTitle>
                      <CardDescription>Timeline dan progress updates</CardDescription>
                    </div>
                    <Dialog open={showAddUpdate} onOpenChange={setShowAddUpdate}>
                      <DialogTrigger asChild>
                        <Button>
                          <FileText className="w-4 h-4 mr-2" />
                          Tambah Update
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Tambah Update Proyek</DialogTitle>
                          <DialogDescription>Tambahkan update atau milestone baru untuk proyek ini</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="update-title">Judul Update</Label>
                            <Input
                              id="update-title"
                              value={newUpdate.title}
                              onChange={(e) => setNewUpdate({ ...newUpdate, title: e.target.value })}
                              placeholder="Contoh: Milestone 2 Completed"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="update-description">Deskripsi</Label>
                            <Textarea
                              id="update-description"
                              value={newUpdate.description}
                              onChange={(e) => setNewUpdate({ ...newUpdate, description: e.target.value })}
                              placeholder="Jelaskan detail update..."
                              rows={4}
                            />
                          </div>
                          <Button onClick={handleAddUpdate} className="w-full">
                            Simpan Update
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.updates.map((update: any) => (
                      <div key={update.id} className="border-l-2 border-primary pl-4 pb-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{update.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              <span>{update.author}</span>
                              <span>•</span>
                              <span>{update.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
