"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { WorkerSidebar } from "@/components/worker-sidebar"
import { Search, Play, BookOpen, Clock, Star, Award } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    instructor: "John Doe",
    duration: "8 hours",
    progress: 65,
    rating: 4.8,
    level: "Advanced",
    category: "Frontend",
    thumbnail: "/react-course.png",
    status: "in-progress",
  },
  {
    id: 2,
    title: "Node.js Microservices",
    instructor: "Jane Smith",
    duration: "12 hours",
    progress: 0,
    rating: 4.9,
    level: "Intermediate",
    category: "Backend",
    thumbnail: "/nodejs-course.jpg",
    status: "not-started",
  },
  {
    id: 3,
    title: "TypeScript Fundamentals",
    instructor: "Mike Johnson",
    duration: "6 hours",
    progress: 100,
    rating: 4.7,
    level: "Beginner",
    category: "Programming",
    thumbnail: "/typescript-course.png",
    status: "completed",
  },
  {
    id: 4,
    title: "UI/UX Design Principles",
    instructor: "Sarah Wilson",
    duration: "10 hours",
    progress: 30,
    rating: 4.6,
    level: "Beginner",
    category: "Design",
    thumbnail: "/ui-ux-design-course.png",
    status: "in-progress",
  },
]

const allAvailableCourses = [
  {
    id: 5,
    title: "Advanced CSS & Animations",
    instructor: "Emily Chen",
    duration: "7 hours",
    rating: 4.9,
    level: "Advanced",
    category: "Frontend",
    thumbnail: "/css-course.png",
    price: "Rp 299,000",
  },
  {
    id: 6,
    title: "Python for Data Science",
    instructor: "David Lee",
    duration: "15 hours",
    rating: 4.8,
    level: "Intermediate",
    category: "Programming",
    thumbnail: "/python-course.png",
    price: "Rp 399,000",
  },
  {
    id: 7,
    title: "Mobile App Development with React Native",
    instructor: "Alex Turner",
    duration: "20 hours",
    rating: 4.7,
    level: "Intermediate",
    category: "Mobile",
    thumbnail: "/react-native-course.png",
    price: "Rp 499,000",
  },
  {
    id: 8,
    title: "GraphQL & Apollo Client",
    instructor: "Maria Garcia",
    duration: "9 hours",
    rating: 4.6,
    level: "Advanced",
    category: "Backend",
    thumbnail: "/graphql-course.png",
    price: "Rp 349,000",
  },
]

const learningStats = [
  { label: "Courses Completed", value: "12", icon: Award },
  { label: "Hours Learned", value: "156", icon: Clock },
  { label: "Certificates Earned", value: "8", icon: BookOpen },
  { label: "Current Streak", value: "15 days", icon: Star },
]

export default function WorkerLearning() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isBrowseCoursesOpen, setIsBrowseCoursesOpen] = useState(false)

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
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Selesai</Badge>
      case "in-progress":
        return <Badge className="bg-blue-100 text-blue-800">Berlangsung</Badge>
      case "not-started":
        return <Badge variant="outline">Belum Dimulai</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "text-green-600"
      case "Intermediate":
        return "text-yellow-600"
      case "Advanced":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || course.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  const handleContinueCourse = (courseId: number) => {
    router.push(`/dashboard/worker/learning/${courseId}`)
  }

  const handleEnrollCourse = (courseId: number) => {
    console.log("Enrolling in course:", courseId)
    setIsBrowseCoursesOpen(false)
    alert("Berhasil mendaftar ke kursus!")
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Learning Center</h1>
              <p className="text-muted-foreground">Tingkatkan skill Anda dengan kursus dan pelatihan terbaik</p>
            </div>
            <Button onClick={() => setIsBrowseCoursesOpen(true)}>
              <BookOpen className="w-4 h-4 mr-2" />
              Browse Courses
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {learningStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Cari kursus atau instruktur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                onClick={() => setCategoryFilter("all")}
              >
                Semua
              </Button>
              <Button
                variant={categoryFilter === "frontend" ? "default" : "outline"}
                onClick={() => setCategoryFilter("frontend")}
              >
                Frontend
              </Button>
              <Button
                variant={categoryFilter === "backend" ? "default" : "outline"}
                onClick={() => setCategoryFilter("backend")}
              >
                Backend
              </Button>
              <Button
                variant={categoryFilter === "design" ? "default" : "outline"}
                onClick={() => setCategoryFilter("design")}
              >
                Design
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={course.thumbnail || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      className="bg-white/90 text-black hover:bg-white"
                      onClick={() => handleContinueCourse(course.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {course.status === "not-started" ? "Mulai" : "Lanjutkan"}
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <CardDescription className="mt-1">by {course.instructor}</CardDescription>
                    </div>
                    {getStatusBadge(course.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}
                    </span>
                    <span className={`font-medium ${getLevelColor(course.level)}`}>{course.level}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada kursus yang ditemukan</p>
            </div>
          )}

          <Dialog open={isBrowseCoursesOpen} onOpenChange={setIsBrowseCoursesOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Jelajahi Kursus Baru</DialogTitle>
                <DialogDescription>Temukan kursus terbaik untuk meningkatkan skill dan karir Anda</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                {allAvailableCourses.map((course) => (
                  <Card key={course.id}>
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-base">{course.title}</CardTitle>
                      <CardDescription>by {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {course.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {course.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{course.category}</Badge>
                        <span className="font-semibold text-primary">{course.price}</span>
                      </div>
                      <Button className="w-full" onClick={() => handleEnrollCourse(course.id)}>
                        Daftar Sekarang
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>
    </div>
  )
}
