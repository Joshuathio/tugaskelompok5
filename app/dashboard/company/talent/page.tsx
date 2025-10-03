"use client"

import { CompanySidebar } from "@/components/company-sidebar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, MapPin, Star, Users, MessageSquare, Eye, Sparkles, TrendingUp, Zap } from "lucide-react"

const talentPool = [
  {
    id: 1,
    name: "Ahmad Rizki",
    title: "Senior Frontend Developer",
    location: "Jakarta",
    experience: "5+ tahun",
    rating: 4.9,
    completedProjects: 47,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    hourlyRate: "Rp 150,000/jam",
    availability: "Available",
    avatar: "/professional-indonesian-man.jpg",
    description: "Experienced frontend developer dengan spesialisasi React ecosystem",
  },
  {
    id: 2,
    name: "Sari Dewi",
    title: "UI/UX Designer",
    location: "Bandung",
    experience: "4+ tahun",
    rating: 4.8,
    completedProjects: 32,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    hourlyRate: "Rp 120,000/jam",
    availability: "Available",
    avatar: "/professional-indonesian-woman.jpg",
    description: "Creative designer dengan fokus pada user experience dan interface design",
  },
  {
    id: 3,
    name: "Budi Santoso",
    title: "Full Stack Developer",
    location: "Surabaya",
    experience: "6+ tahun",
    rating: 4.9,
    completedProjects: 58,
    skills: ["Node.js", "React", "PostgreSQL", "Docker"],
    hourlyRate: "Rp 180,000/jam",
    availability: "Busy",
    avatar: "/professional-indonesian-man-developer.jpg",
    description: "Full stack developer dengan expertise dalam modern web technologies",
  },
  {
    id: 4,
    name: "Maya Putri",
    title: "Mobile Developer",
    location: "Jakarta",
    experience: "3+ tahun",
    rating: 4.7,
    completedProjects: 28,
    skills: ["React Native", "Flutter", "Firebase", "iOS"],
    hourlyRate: "Rp 140,000/jam",
    availability: "Available",
    avatar: "/professional-indonesian-woman-mobile-developer.jpg",
    description: "Mobile developer dengan pengalaman dalam cross-platform development",
  },
]

const aiRecommendations = [
  {
    id: 1,
    name: "Ahmad Rizki",
    title: "Senior Frontend Developer",
    location: "Jakarta",
    experience: "5+ tahun",
    rating: 4.9,
    completedProjects: 47,
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    hourlyRate: "Rp 150,000/jam",
    availability: "Available",
    avatar: "/professional-indonesian-man.jpg",
    matchScore: 95,
    matchReasons: [
      "Skill match dengan proyek aktif Anda",
      "Rating tinggi dan track record bagus",
      "Tersedia untuk mulai segera",
    ],
  },
  {
    id: 4,
    name: "Maya Putri",
    title: "Mobile Developer",
    location: "Jakarta",
    experience: "3+ tahun",
    rating: 4.7,
    completedProjects: 28,
    skills: ["React Native", "Flutter", "Firebase", "iOS"],
    hourlyRate: "Rp 140,000/jam",
    availability: "Available",
    avatar: "/professional-indonesian-woman-mobile-developer.jpg",
    matchScore: 88,
    matchReasons: [
      "Expertise dalam mobile development",
      "Lokasi dekat dengan kantor Anda",
      "Rate kompetitif untuk skill level",
    ],
  },
  {
    id: 2,
    name: "Sari Dewi",
    title: "UI/UX Designer",
    location: "Bandung",
    experience: "4+ tahun",
    rating: 4.8,
    completedProjects: 32,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    hourlyRate: "Rp 120,000/jam",
    availability: "Available",
    avatar: "/professional-indonesian-woman.jpg",
    matchScore: 85,
    matchReasons: [
      "Portfolio sesuai dengan industri Anda",
      "Pengalaman user research yang kuat",
      "Tersedia untuk kolaborasi jangka panjang",
    ],
  },
]

export default function CompanyTalentPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [skillFilter, setSkillFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const userData = sessionStorage.getItem("kerjoo_user") || localStorage.getItem("kerjoo_user")
      const authStatus = sessionStorage.getItem("kerjoo_auth") || localStorage.getItem("kerjoo_auth")

      if (!userData || !authStatus) {
        router.push("/login")
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        if (parsedUser.role !== "company") {
          router.push("/dashboard/worker")
          return
        }
        setUser(parsedUser)
        setIsLoading(false)
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  const filteredTalent = talentPool.filter((talent) => {
    const matchesSearch =
      talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesLocation = locationFilter === "all" || talent.location === locationFilter
    const matchesSkill =
      skillFilter === "all" || talent.skills.some((skill) => skill.toLowerCase().includes(skillFilter.toLowerCase()))
    const matchesAvailability = availabilityFilter === "all" || talent.availability === availabilityFilter

    return matchesSearch && matchesLocation && matchesSkill && matchesAvailability
  })

  const handleViewProfile = (talentId: number) => {
    router.push(`/profile/${talentId}`)
  }

  const handleContact = (talentId: number) => {
    router.push(`/dashboard/company/messages?contact=${talentId}`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat halaman...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen pt-16">
      <CompanySidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Talent Pool</h1>
            <p className="text-muted-foreground">Temukan talenta terbaik untuk proyek Anda</p>
          </div>

          {/* AI Recommendations Section */}
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Rekomendasi AI untuk Anda</CardTitle>
                    <CardDescription>Talenta terbaik yang cocok dengan kebutuhan perusahaan Anda</CardDescription>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Refresh Rekomendasi
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {aiRecommendations.map((talent, index) => (
                  <Card key={talent.id} className="border-2 hover:border-primary/50 transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16 border-2 border-primary/20">
                          <AvatarImage src={talent.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {talent.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg">{talent.name}</h3>
                                <Badge className="bg-primary/10 text-primary border-primary/20">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  {talent.matchScore}% Match
                                </Badge>
                              </div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">{talent.title}</p>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {talent.location}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                  {talent.rating}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {talent.completedProjects} proyek
                                </div>
                                <span className="font-medium text-foreground">{talent.hourlyRate}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleViewProfile(talent.id)}>
                                <Eye className="w-4 h-4 mr-2" />
                                Lihat Profil
                              </Button>
                              <Button size="sm" onClick={() => handleContact(talent.id)}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Hubungi
                              </Button>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {talent.skills.map((skill) => (
                              <Badge key={skill} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>

                          <div className="bg-muted/50 rounded-lg p-3">
                            <p className="text-xs font-medium text-muted-foreground mb-2">Mengapa direkomendasikan:</p>
                            <ul className="space-y-1">
                              {talent.matchReasons.map((reason, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <span className="text-primary mt-0.5">•</span>
                                  <span>{reason}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari nama, posisi, atau skill..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Lokasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Lokasi</SelectItem>
                  <SelectItem value="Jakarta">Jakarta</SelectItem>
                  <SelectItem value="Bandung">Bandung</SelectItem>
                  <SelectItem value="Surabaya">Surabaya</SelectItem>
                </SelectContent>
              </Select>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ketersediaan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Busy">Busy</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTalent.map((talent) => (
              <Card key={talent.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={talent.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {talent.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{talent.name}</CardTitle>
                        <Badge variant={talent.availability === "Available" ? "default" : "secondary"}>
                          {talent.availability}
                        </Badge>
                      </div>
                      <CardDescription className="text-base font-medium text-foreground mb-1">
                        {talent.title}
                      </CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {talent.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {talent.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {talent.completedProjects} proyek
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{talent.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <span className="font-medium">{talent.hourlyRate}</span>
                      <span className="text-muted-foreground"> • {talent.experience}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewProfile(talent.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Lihat Profil
                      </Button>
                      <Button size="sm" onClick={() => handleContact(talent.id)}>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Hubungi
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTalent.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Tidak ada talenta ditemukan</h3>
              <p className="text-muted-foreground">Coba ubah filter pencarian Anda</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
