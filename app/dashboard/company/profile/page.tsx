"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CompanySidebar } from "@/components/company-sidebar"
import { MapPin, Mail, Calendar, Edit, Building2, Users, Briefcase, TrendingUp } from "lucide-react"

export default function CompanyProfile() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)

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

  const companyStats = [
    { label: "Active Projects", value: "8", icon: Briefcase },
    { label: "Total Workers", value: "24", icon: Users },
    { label: "Completed Projects", value: "45", icon: TrendingUp },
    { label: "Success Rate", value: "96%", icon: TrendingUp },
  ]

  const topWorkers = [
    {
      id: 1,
      name: "Ahmad Rizki",
      role: "Full Stack Developer",
      rating: 4.9,
      projects: 12,
      avatar: "/professional-indonesian-man.jpg",
    },
    {
      id: 2,
      name: "Sari Dewi",
      role: "UI/UX Designer",
      rating: 4.8,
      projects: 10,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Budi Santoso",
      role: "Mobile Developer",
      rating: 4.7,
      projects: 8,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Profil Perusahaan</h1>
              <p className="text-muted-foreground">Kelola informasi profil dan pengaturan perusahaan</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Simpan" : "Edit Profil"}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Company Profile Card */}
            <Card className="lg:col-span-1">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src="/placeholder.svg?key=company" />
                  <AvatarFallback>DN</AvatarFallback>
                </Avatar>
                <CardTitle>PT Digital Nusantara</CardTitle>
                <CardDescription>Premium Account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>contact@digitalnusantara.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>Teknologi & Digital</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Bergabung sejak 2023</span>
                </div>
              </CardContent>
            </Card>

            {/* Company Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistik Perusahaan</CardTitle>
                  <CardDescription>Ringkasan aktivitas dan pencapaian perusahaan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {companyStats.map((stat) => (
                      <div key={stat.label} className="text-center p-4 bg-accent/50 rounded-lg">
                        <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                        <div className="text-2xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Workers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Workers</CardTitle>
                  <CardDescription>Worker terbaik yang bekerja dengan perusahaan Anda</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topWorkers.map((worker, index) => (
                      <div
                        key={worker.id}
                        className="flex items-center gap-4 p-4 bg-card border-2 border-border rounded-lg hover:shadow-md hover:border-primary/50 transition-all duration-200"
                      >
                        <div className="flex-shrink-0">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={worker.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{worker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-foreground">{worker.name}</h4>
                            <Badge variant="secondary" className="text-xs">
                              #{index + 1}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{worker.role}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-md">
                            <span className="text-yellow-500">★</span>
                            <span className="font-semibold text-yellow-700 dark:text-yellow-400">{worker.rating}</span>
                          </div>
                          <div className="text-muted-foreground">
                            <span className="font-semibold">{worker.projects}</span> projects
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Company Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Perusahaan</CardTitle>
                  <CardDescription>Informasi dasar tentang perusahaan Anda</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company-name">Nama Perusahaan</Label>
                      <Input id="company-name" value="PT Digital Nusantara" disabled={!isEditing} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon</Label>
                      <Input id="phone" value="+62 21-1234-5678" disabled={!isEditing} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Alamat</Label>
                    <Input
                      id="address"
                      value="Jl. Sudirman No. 123, Jakarta Pusat"
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Deskripsi Perusahaan</Label>
                    <Textarea
                      id="description"
                      value="PT Digital Nusantara adalah perusahaan teknologi yang fokus pada pengembangan solusi digital untuk UMKM dan enterprise di Indonesia. Kami berkomitmen untuk memberikan layanan terbaik dan inovasi berkelanjutan."
                      disabled={!isEditing}
                      className="mt-1"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Industry & Specialization */}
              <Card>
                <CardHeader>
                  <CardTitle>Industri & Spesialisasi</CardTitle>
                  <CardDescription>Bidang dan keahlian perusahaan</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Web Development</Badge>
                    <Badge variant="secondary">Mobile Apps</Badge>
                    <Badge variant="secondary">Cloud Solutions</Badge>
                    <Badge variant="secondary">AI & Machine Learning</Badge>
                    <Badge variant="secondary">Digital Marketing</Badge>
                    <Badge variant="secondary">UI/UX Design</Badge>
                    <Badge variant="secondary">E-commerce</Badge>
                    <Badge variant="secondary">Consulting</Badge>
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
