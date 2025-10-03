"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { WorkerSidebar } from "@/components/worker-sidebar"
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  MessageSquare,
  User,
  Building2,
  Mail,
  Phone,
} from "lucide-react"

// Mock project data - in real app, this would come from API/database
const projectsData = [
  {
    id: 1,
    title: "E-commerce Website Development",
    client: "PT Maju Bersama",
    status: "completed",
    budget: "Rp 15,000,000",
    deadline: "2024-01-15",
    startDate: "2023-11-01",
    progress: 100,
    description: "Pengembangan website e-commerce lengkap dengan sistem pembayaran.",
    detailedDescription:
      "Proyek ini meliputi pengembangan website e-commerce dari awal hingga deployment. Termasuk integrasi payment gateway, sistem manajemen produk, keranjang belanja, dan dashboard admin.",
    clientContact: {
      name: "Budi Santoso",
      email: "budi@majubersama.com",
      phone: "+62 812-3456-7890",
    },
    milestones: [
      { id: 1, title: "Desain UI/UX", status: "completed", dueDate: "2023-11-15" },
      { id: 2, title: "Frontend Development", status: "completed", dueDate: "2023-12-01" },
      { id: 3, title: "Backend Development", status: "completed", dueDate: "2023-12-15" },
      { id: 4, title: "Testing & Deployment", status: "completed", dueDate: "2024-01-15" },
    ],
    deliverables: [
      { id: 1, name: "Design Mockups.fig", uploadedAt: "2023-11-16", size: "2.4 MB" },
      { id: 2, name: "Source Code.zip", uploadedAt: "2024-01-10", size: "45.2 MB" },
      { id: 3, name: "Documentation.pdf", uploadedAt: "2024-01-15", size: "1.8 MB" },
    ],
    messages: [
      {
        id: 1,
        sender: "client",
        name: "Budi Santoso",
        message: "Halo, bagaimana progress proyeknya?",
        timestamp: "2023-12-01 10:30",
      },
      {
        id: 2,
        sender: "worker",
        name: "Anda",
        message: "Halo Pak Budi, frontend sudah 80% selesai. Minggu depan akan mulai backend.",
        timestamp: "2023-12-01 14:20",
      },
    ],
  },
  {
    id: 2,
    title: "Mobile App UI/UX Design",
    client: "Startup TechCorp",
    status: "in-progress",
    budget: "Rp 8,500,000",
    deadline: "2024-02-28",
    startDate: "2024-01-10",
    progress: 65,
    description: "Desain antarmuka dan pengalaman pengguna untuk aplikasi mobile fintech.",
    detailedDescription:
      "Membuat desain UI/UX untuk aplikasi mobile fintech yang user-friendly dan modern. Termasuk wireframe, prototype interaktif, dan design system lengkap.",
    clientContact: {
      name: "Sarah Johnson",
      email: "sarah@techcorp.id",
      phone: "+62 821-9876-5432",
    },
    milestones: [
      { id: 1, title: "Research & Wireframe", status: "completed", dueDate: "2024-01-20" },
      { id: 2, title: "UI Design", status: "in-progress", dueDate: "2024-02-10" },
      { id: 3, title: "Prototype & Testing", status: "pending", dueDate: "2024-02-25" },
      { id: 4, title: "Final Delivery", status: "pending", dueDate: "2024-02-28" },
    ],
    deliverables: [
      { id: 1, name: "Wireframes.pdf", uploadedAt: "2024-01-21", size: "3.2 MB" },
      { id: 2, name: "Design System.fig", uploadedAt: "2024-02-05", size: "5.8 MB" },
    ],
    messages: [
      {
        id: 1,
        sender: "client",
        name: "Sarah Johnson",
        message: "Wireframe sudah bagus! Bisa lanjut ke UI design.",
        timestamp: "2024-01-22 09:15",
      },
      {
        id: 2,
        sender: "worker",
        name: "Anda",
        message: "Terima kasih! Saya akan mulai UI design minggu ini.",
        timestamp: "2024-01-22 10:30",
      },
    ],
  },
  {
    id: 3,
    title: "Company Website Redesign",
    client: "CV Digital Solutions",
    status: "pending",
    budget: "Rp 12,000,000",
    deadline: "2024-03-15",
    startDate: "2024-02-01",
    progress: 0,
    description: "Redesign website perusahaan dengan fokus pada modern design dan user experience.",
    detailedDescription:
      "Melakukan redesign total website perusahaan dengan pendekatan modern dan fokus pada user experience. Termasuk analisis kompetitor, wireframe, desain visual, dan implementasi.",
    clientContact: {
      name: "Ahmad Wijaya",
      email: "ahmad@digitalsolutions.co.id",
      phone: "+62 813-2468-1357",
    },
    milestones: [
      { id: 1, title: "Discovery & Analysis", status: "pending", dueDate: "2024-02-10" },
      { id: 2, title: "Design Concept", status: "pending", dueDate: "2024-02-25" },
      { id: 3, title: "Development", status: "pending", dueDate: "2024-03-10" },
      { id: 4, title: "Launch", status: "pending", dueDate: "2024-03-15" },
    ],
    deliverables: [],
    messages: [
      {
        id: 1,
        sender: "client",
        name: "Ahmad Wijaya",
        message: "Selamat bergabung di proyek ini! Kapan bisa mulai?",
        timestamp: "2024-01-28 11:00",
      },
    ],
  },
]

export default function ProjectDetail() {
  const router = useRouter()
  const params = useParams()
  const projectId = Number(params.id)
  const [user, setUser] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [progressUpdate, setProgressUpdate] = useState("")

  const project = projectsData.find((p) => p.id === projectId)

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

  if (!user || !project) {
    return <div>Loading...</div>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Selesai
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            Berlangsung
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Menunggu
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getMilestoneStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">Sedang Dikerjakan</Badge>
      case "pending":
        return <Badge className="bg-gray-100 text-gray-800">Belum Dimulai</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send to API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleUpdateProgress = () => {
    if (progressUpdate.trim()) {
      // In real app, this would update via API
      console.log("Updating progress:", progressUpdate)
      setProgressUpdate("")
    }
  }

  const handleFileUpload = () => {
    // In real app, this would handle file upload
    console.log("File upload triggered")
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.push("/dashboard/worker/projects")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Proyek
          </Button>

          {/* Project Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="text-muted-foreground mt-1">{project.client}</p>
            </div>
            {getStatusBadge(project.status)}
          </div>

          {/* Project Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Budget</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{project.budget}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Deadline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">
                    {new Date(project.deadline).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">{project.progress}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Durasi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold">
                    {Math.ceil(
                      (new Date(project.deadline).getTime() - new Date(project.startDate).getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    hari
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar */}
          <Card>
            <CardHeader>
              <CardTitle>Progress Keseluruhan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Progress value={project.progress} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {project.progress === 100
                    ? "Proyek telah selesai!"
                    : `${project.progress}% dari total pekerjaan telah diselesaikan`}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for different sections */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="milestones">Milestone</TabsTrigger>
              <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
              <TabsTrigger value="messages">Pesan</TabsTrigger>
              <TabsTrigger value="client">Info Klien</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Deskripsi Proyek</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{project.detailedDescription}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Update Progress</CardTitle>
                  <CardDescription>Berikan update terbaru tentang progress proyek Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Tulis update progress di sini..."
                    value={progressUpdate}
                    onChange={(e) => setProgressUpdate(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleUpdateProgress}>Kirim Update</Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Milestones Tab */}
            <TabsContent value="milestones" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Milestone Proyek</CardTitle>
                  <CardDescription>Tahapan-tahapan dalam penyelesaian proyek</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4 flex-1">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              milestone.status === "completed"
                                ? "bg-green-100"
                                : milestone.status === "in-progress"
                                  ? "bg-blue-100"
                                  : "bg-gray-100"
                            }`}
                          >
                            {milestone.status === "completed" ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : milestone.status === "in-progress" ? (
                              <Clock className="w-5 h-5 text-blue-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{milestone.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              Target: {new Date(milestone.dueDate).toLocaleDateString("id-ID")}
                            </p>
                          </div>
                        </div>
                        {getMilestoneStatusBadge(milestone.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Deliverables Tab */}
            <TabsContent value="deliverables" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>File Deliverables</CardTitle>
                      <CardDescription>File-file yang telah diupload untuk proyek ini</CardDescription>
                    </div>
                    <Button onClick={handleFileUpload}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {project.deliverables.length > 0 ? (
                    <div className="space-y-3">
                      {project.deliverables.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-medium">{file.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {file.size} • Uploaded {file.uploadedAt}
                              </p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Download
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>Belum ada file yang diupload</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messages Tab */}
            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Komunikasi dengan Klien</CardTitle>
                  <CardDescription>Riwayat pesan dengan klien</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {project.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex gap-3 ${msg.sender === "worker" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            msg.sender === "worker" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {msg.sender === "worker" ? "A" : "K"}
                        </div>
                        <div className={`flex-1 ${msg.sender === "worker" ? "text-right" : "text-left"}`}>
                          <div
                            className={`inline-block p-3 rounded-lg ${
                              msg.sender === "worker" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Input
                      placeholder="Tulis pesan..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Kirim
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Client Info Tab */}
            <TabsContent value="client" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Klien</CardTitle>
                  <CardDescription>Detail kontak dan informasi klien</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Building2 className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Perusahaan</p>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <User className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Nama Kontak</p>
                      <p className="font-medium">{project.clientContact.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{project.clientContact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Telepon</p>
                      <p className="font-medium">{project.clientContact.phone}</p>
                    </div>
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
