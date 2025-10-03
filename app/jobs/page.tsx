"use client"

import { useState } from "react"
import { Search, MapPin, Clock, DollarSign, Star, Filter, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const jobs = [
  {
    id: 1,
    title: "Design Logo untuk Startup",
    company: "TechStart Indonesia",
    location: "Remote",
    type: "Microtask",
    budget: "Rp 150,000 - Rp 300,000",
    duration: "2-3 hari",
    skills: ["Logo Design", "Illustrator", "Branding"],
    description:
      "Butuh logo sederhana untuk startup teknologi. Format vector, 3 konsep awal, revisi 2x. Portfolio logo wajib ada.",
    rating: 4.8,
    reviews: 127,
    posted: "2 jam yang lalu",
    saved: false,
    urgency: "high",
  },
  {
    id: 2,
    title: "Tulis 5 Artikel Blog SEO",
    company: "Digital Media Corp",
    location: "Remote",
    type: "Microjob",
    budget: "Rp 75,000 - Rp 100,000",
    duration: "1-2 hari",
    skills: ["Content Writing", "SEO", "Research"],
    description:
      "Tulis 5 artikel blog 500 kata tentang teknologi. Keyword sudah disediakan. Harus SEO friendly dan original.",
    rating: 4.6,
    reviews: 89,
    posted: "4 jam yang lalu",
    saved: true,
    urgency: "medium",
  },
  {
    id: 3,
    title: "Fix Bug React Component",
    company: "StartupXYZ",
    location: "Remote",
    type: "Microtask",
    budget: "Rp 200,000 - Rp 400,000",
    duration: "1 hari",
    skills: ["React.js", "JavaScript", "Debugging"],
    description:
      "Ada bug di component React untuk form validation. Butuh fix cepat dalam 24 jam. Code sudah ada, tinggal debug.",
    rating: 4.9,
    reviews: 203,
    posted: "1 jam yang lalu",
    saved: false,
    urgency: "high",
  },
  {
    id: 4,
    title: "Edit 10 Foto Produk",
    company: "Fashion Brand Co",
    location: "Remote",
    type: "Microtask",
    budget: "Rp 100,000 - Rp 200,000",
    duration: "1 hari",
    skills: ["Photo Editing", "Photoshop", "Color Correction"],
    description:
      "Edit 10 foto produk fashion: background removal, color correction, resize untuk e-commerce. Template disediakan.",
    rating: 4.7,
    reviews: 156,
    posted: "3 jam yang lalu",
    saved: false,
    urgency: "medium",
  },
  {
    id: 5,
    title: "Buat Landing Page Sederhana",
    company: "Local Business",
    location: "Remote",
    type: "Microjob",
    budget: "Rp 300,000 - Rp 500,000",
    duration: "2-3 hari",
    skills: ["HTML", "CSS", "JavaScript", "Responsive"],
    description:
      "Landing page 1 halaman untuk bisnis lokal. Design sudah ada, tinggal coding. Responsive dan fast loading.",
    rating: 4.5,
    reviews: 67,
    posted: "5 jam yang lalu",
    saved: false,
    urgency: "low",
  },
  {
    id: 6,
    title: "Translate 20 Halaman EN-ID",
    company: "Content Agency",
    location: "Remote",
    type: "Microtask",
    budget: "Rp 150,000 - Rp 250,000",
    duration: "1-2 hari",
    skills: ["Translation", "English", "Indonesian"],
    description:
      "Translate 20 halaman dokumen teknis dari English ke Indonesian. Harus akurat dan natural. Domain IT/Tech.",
    rating: 4.4,
    reviews: 92,
    posted: "6 jam yang lalu",
    saved: false,
    urgency: "medium",
  },
  {
    id: 7,
    title: "Setup WordPress + Plugin",
    company: "Small Business",
    location: "Remote",
    type: "Microtask",
    budget: "Rp 100,000 - Rp 200,000",
    duration: "4-6 jam",
    skills: ["WordPress", "Plugin Setup", "Configuration"],
    description:
      "Install WordPress, theme, dan 5 plugin essential. Basic configuration dan tutorial singkat untuk client.",
    rating: 4.6,
    reviews: 134,
    posted: "8 jam yang lalu",
    saved: false,
    urgency: "low",
  },
  {
    id: 8,
    title: "Data Entry 500 Kontak",
    company: "Marketing Agency",
    location: "Remote",
    type: "Microtask",
    budget: "Rp 75,000 - Rp 125,000",
    duration: "1 hari",
    skills: ["Data Entry", "Excel", "Accuracy"],
    description: "Input 500 data kontak dari business card ke Excel. Format template sudah ada. Akurasi 99% required.",
    rating: 4.3,
    reviews: 78,
    posted: "10 jam yang lalu",
    saved: false,
    urgency: "medium",
  },
]

export default function JobSearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [savedJobs, setSavedJobs] = useState<number[]>([2])

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) => (prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]))
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === "all" ||
      job.skills.some(
        (skill) =>
          (selectedCategory === "design" &&
            ["Logo Design", "Illustrator", "Photo Editing", "Photoshop"].includes(skill)) ||
          (selectedCategory === "development" &&
            ["React.js", "JavaScript", "HTML", "CSS", "WordPress"].includes(skill)) ||
          (selectedCategory === "content" && ["Content Writing", "SEO", "Translation", "Data Entry"].includes(skill)),
      )

    const matchesType = selectedType === "all" || job.type.toLowerCase() === selectedType

    return matchesSearch && matchesCategory && matchesType
  })

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Cari Microtask & Microjob</h1>
          <p className="text-muted-foreground">
            Temukan pekerjaan cepat dan mudah yang bisa diselesaikan dalam hitungan jam atau hari
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filter Microtask
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Kategori</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      <SelectItem value="design">Design & Visual</SelectItem>
                      <SelectItem value="development">Development & Tech</SelectItem>
                      <SelectItem value="content">Content & Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Tipe Task</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="all">Semua Tipe</SelectItem>
                      <SelectItem value="microtask">Microtask (1-3 hari)</SelectItem>
                      <SelectItem value="microjob">Microjob (3-7 hari)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Budget Range</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border bg-input" />
                      <span className="text-sm text-muted-foreground">&lt; Rp 100,000</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border bg-input" />
                      <span className="text-sm text-muted-foreground">Rp 100,000 - Rp 300,000</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border bg-input" />
                      <span className="text-sm text-muted-foreground">&gt; Rp 300,000</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">Urgency</label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border bg-input" />
                      <span className="text-sm text-red-500">High (Rush Job)</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border bg-input" />
                      <span className="text-sm text-yellow-500">Medium</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-border bg-input" />
                      <span className="text-sm text-green-500">Low (Flexible)</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Cari microtask, skill, atau perusahaan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Menampilkan {filteredJobs.length} microtask dari {jobs.length} total task tersedia
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="bg-card border-border hover:border-primary transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSaveJob(job.id)}
                            className="text-muted-foreground hover:text-primary"
                          >
                            {savedJobs.includes(job.id) ? (
                              <BookmarkCheck className="h-5 w-5" />
                            ) : (
                              <Bookmark className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="font-medium text-primary">{job.company}</span>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {job.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            {job.rating} ({job.reviews} reviews)
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-2 mb-2">
                          <Badge variant="default" className="bg-primary text-primary-foreground">
                            {job.type}
                          </Badge>
                          <Badge variant="outline" className={getUrgencyColor(job.urgency)}>
                            {job.urgency === "high" ? "Rush" : job.urgency === "medium" ? "Normal" : "Flexible"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-semibold">
                          <DollarSign className="h-4 w-4" />
                          {job.budget}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 line-clamp-2">{job.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="border-border text-muted-foreground">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">{job.posted}</span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground bg-transparent"
                        >
                          Lihat Detail
                        </Button>
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                          {job.urgency === "high" ? "Apply Fast!" : "Lamar Sekarang"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Tidak ada microtask yang sesuai dengan filter Anda</p>
                  <p className="text-sm">Coba ubah kata kunci pencarian atau filter yang dipilih</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
