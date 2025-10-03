"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { WorkerSidebar } from "@/components/worker-sidebar"
import { MapPin, Mail, Calendar, Edit, Upload, FileText, Sparkles, Download, Eye } from "lucide-react"
import { CVATSForm, defaultCvData, type CVData } from "@/components/cv-ats-form"
import { generateCvPdf, cvDataToText } from "@/lib/cv-ats"

export default function WorkerProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isGeneratingCV, setIsGeneratingCV] = useState(false)
  const [hasCV, setHasCV] = useState(false)
  const [showCvForm, setShowCvForm] = useState(false)
  const [cvData, setCvData] = useState<CVData>(defaultCvData)
  const [cvPreview, setCvPreview] = useState<string>("")

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

  const handleCVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setCvFile(file)
      setHasCV(true)
    }
  }

  const handleGenerateCV = async () => {
    setIsGeneratingCV(true)
    setTimeout(() => {
      setIsGeneratingCV(false)
      setHasCV(true)
    }, 3000)
  }

  const topProjects = [
    {
      id: 1,
      title: "E-commerce Website Development",
      client: "PT Digital Nusantara",
      rating: 5.0,
      earnings: 2500000,
      completedAt: "2024-01-15",
      image: "/modern-ecommerce-website.png",
    },
    {
      id: 2,
      title: "Mobile Food Delivery App",
      client: "Startup Teknologi",
      rating: 4.9,
      earnings: 1800000,
      completedAt: "2024-01-10",
      image: "/mobile-food-delivery-app.png",
    },
    {
      id: 3,
      title: "Corporate Dashboard Interface",
      client: "CV Kreatif Media",
      rating: 4.8,
      earnings: 1200000,
      completedAt: "2024-01-05",
      image: "/corporate-dashboard-interface.jpg",
    },
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Profil Saya</h1>
              <p className="text-muted-foreground">Kelola informasi profil dan pengaturan akun Anda</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Simpan" : "Edit Profil"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={user.avatar || "/professional-indonesian-man.jpg"} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <CardTitle>{user.name || "Nama Pengguna"}</CardTitle>
                <CardDescription>Intermediate Level Worker</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Bergabung sejak 2024</span>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* CV Management Section */}
              <Card>
                <CardHeader>
                  <CardTitle>CV Management</CardTitle>
                  <CardDescription>Upload CV (PDF) atau buat CV dengan bantuan AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload CV Section */}
                    <div className="space-y-8">
                      <Label htmlFor="cv-upload" className="text-base font-medium">
                        Upload CV (PDF)
                      </Label>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Button variant="outline" className="flex-1 bg-transparent" asChild>
                            <label htmlFor="cv-upload" className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Browse...
                            </label>
                          </Button>
                          <Input
                            id="cv-upload"
                            type="file"
                            accept=".pdf"
                            onChange={handleCVUpload}
                            className="hidden"
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">{cvFile ? cvFile.name : "No file selected"}</p>
                      </div>
                    </div>

                    {/* AI CV Builder Section */}
                    <div className="space-y-8">
                      <Label className="text-base font-medium">Build CV dengan AI</Label>
                      <Button onClick={handleGenerateCV} disabled={isGeneratingCV} className="w-full h-12" size="lg">
                        {isGeneratingCV ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Generate CV
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        onClick={() => setShowCvForm((s) => !s)}
                      >
                        {showCvForm ? "Tutup Form CV ATS" : "Isi Form CV ATS (Template ATS)"}
                      </Button>
                    </div>
                  </div>

                  {showCvForm && (
                    <div className="mt-4 space-y-4">
                      <CVATSForm value={cvData} onChange={setCvData} />

                      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        <div className="flex gap-2">
                          <Button variant="outline" type="button" onClick={() => setCvPreview(cvDataToText(cvData))}>
                            Preview
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setCvPreview(cvDataToText(cvData))
                              generateCvPdf(cvData, { mode: "download" })
                              setHasCV(true)
                            }}
                          >
                            Download PDF (ATS)
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Tip: Gunakan angka (%/jumlah) pada bullet untuk hasil ATS yang lebih kuat.
                        </p>
                      </div>

                      {/* Lightweight text preview */}
                      {cvPreview && (
                        <div className="border rounded-lg p-4 bg-accent/30 border-[#374151]">
                          <Label className="mb-2 block">Preview (Teks ATS)</Label>
                          <pre className="whitespace-pre-wrap text-sm leading-6">{cvPreview}</pre>
                        </div>
                      )}
                    </div>
                  )}

                  {hasCV && (
                    <div className="flex items-center justify-between p-4 bg-accent/50 border-2 border-[#1f2937] rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">CV_Ahmad_Rizki.pdf</p>
                          <p className="text-sm text-muted-foreground">Uploaded successfully</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => generateCvPdf(cvData, { mode: "preview" })}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Preview
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          type="button"
                          onClick={() => generateCvPdf(cvData, { mode: "download" })}
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Top 3 Projects Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Top 3 Projects</CardTitle>
                  <CardDescription>Proyek terbaik dengan rating tertinggi</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProjects.map((project, index) => (
                      <div
                        key={project.id}
                        className="group relative overflow-hidden bg-card border-2 border-[#1f2937] rounded-lg hover:shadow-md hover:border-[#111827] transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-4 p-4">
                          {/* Project Image with better sizing */}
                          <div className="flex-shrink-0">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-[#1f2937] bg-muted">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                              />
                              {/* Ranking badge overlay */}
                              <div className="absolute -top-1 -left-1">
                                <Badge
                                  variant="default"
                                  className="text-xs font-bold px-2 py-1 bg-primary text-primary-foreground"
                                >
                                  #{index + 1}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          {/* Project Details with improved layout */}
                          <div className="flex-1 min-w-0 space-y-2">
                            {/* Title and Client */}
                            <div className="space-y-1">
                              <h4 className="font-semibold text-base text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                                {project.title}
                              </h4>
                              <p className="text-sm text-muted-foreground font-medium">{project.client}</p>
                            </div>

                            {/* Stats Row with proper spacing */}
                            <div className="flex items-center gap-4 text-sm">
                              {/* Rating */}
                              <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                                <span className="text-yellow-500 text-base">★</span>
                                <span className="font-semibold text-yellow-700 dark:text-yellow-400">
                                  {project.rating}
                                </span>
                              </div>

                              {/* Earnings */}
                              <div className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
                                <span className="font-bold text-green-700 dark:text-green-400">
                                  Rp {project.earnings.toLocaleString()}
                                </span>
                              </div>

                              {/* Completion Date */}
                              <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Calendar className="w-3.5 h-3.5" />
                                <span className="text-xs font-medium">
                                  {new Date(project.completedAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action indicator */}
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Eye className="w-4 h-4 text-primary" />
                            </div>
                          </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informasi Personal */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Personal</CardTitle>
                  <CardDescription>Informasi dasar tentang diri Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap</Label>
                      <Input id="name" value={user.name || ""} disabled={!isEditing} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" value="+62 812-3456-7890" disabled={!isEditing} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value="Saya adalah seorang developer dengan pengalaman 3+ tahun dalam pengembangan web dan mobile. Passionate tentang teknologi terbaru dan selalu eager untuk belajar hal-hal baru."
                      disabled={!isEditing}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Keahlian */}
              <Card>
                <CardHeader>
                  <CardTitle>Keahlian</CardTitle>
                  <CardDescription>Skill dan teknologi yang Anda kuasai</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Next.js</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">PostgreSQL</Badge>
                    <Badge variant="secondary">Tailwind CSS</Badge>
                    <Badge variant="secondary">Git</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Statistik */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistik</CardTitle>
                  <CardDescription>Ringkasan aktivitas dan pencapaian Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Proyek Selesai</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">4.8</div>
                      <div className="text-sm text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">95%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">24</div>
                      <div className="text-sm text-muted-foreground">Klien Puas</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
