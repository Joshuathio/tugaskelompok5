"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Play,
  Clock,
  Star,
  Search,
  Award,
  CheckCircle,
  Target,
  TrendingUp,
  Code,
  Palette,
  PenTool,
  BarChart3,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

interface Course {
  id: number
  title: string
  description: string
  category: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  lessons: number
  students: number
  rating: number
  instructor: string
  thumbnail: string
  skills: string[]
  progress?: number
  isEnrolled?: boolean
}

interface Lesson {
  id: number
  title: string
  type: "video" | "text" | "quiz" | "practice"
  duration: string
  isCompleted: boolean
  isLocked: boolean
}

const categories = [
  { id: "web-development", name: "Web Development", icon: Code, color: "bg-blue-100 text-blue-800" },
  { id: "design", name: "UI/UX Design", icon: Palette, color: "bg-purple-100 text-purple-800" },
  { id: "content", name: "Content Writing", icon: PenTool, color: "bg-green-100 text-green-800" },
  { id: "marketing", name: "Digital Marketing", icon: BarChart3, color: "bg-orange-100 text-orange-800" },
]

const courses: Course[] = [
  {
    id: 1,
    title: "React.js Fundamentals",
    description: "Pelajari dasar-dasar React.js dari nol hingga bisa membuat aplikasi web modern",
    category: "web-development",
    level: "Beginner",
    duration: "8 jam",
    lessons: 24,
    students: 1250,
    rating: 4.8,
    instructor: "Budi Raharjo",
    thumbnail: "/react-course.png",
    skills: ["React.js", "JavaScript", "JSX", "Components"],
    progress: 65,
    isEnrolled: true,
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    description: "Kuasai pola-pola advanced TypeScript untuk development yang lebih robust",
    category: "web-development",
    level: "Advanced",
    duration: "12 jam",
    lessons: 18,
    students: 890,
    rating: 4.9,
    instructor: "Sarah Wijaya",
    thumbnail: "/typescript-course.png",
    skills: ["TypeScript", "Advanced Patterns", "Type Safety"],
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    description: "Pelajari prinsip-prinsip desain yang baik untuk menciptakan pengalaman pengguna yang optimal",
    category: "design",
    level: "Beginner",
    duration: "6 jam",
    lessons: 16,
    students: 2100,
    rating: 4.7,
    instructor: "Maya Sari",
    thumbnail: "/ui-ux-design-course.png",
    skills: ["UI Design", "UX Research", "Figma", "Prototyping"],
  },
  {
    id: 4,
    title: "Content Marketing Strategy",
    description: "Strategi content marketing yang efektif untuk meningkatkan engagement dan konversi",
    category: "marketing",
    level: "Intermediate",
    duration: "5 jam",
    lessons: 12,
    students: 1680,
    rating: 4.6,
    instructor: "Andi Pratama",
    thumbnail: "/content-marketing-course.png",
    skills: ["Content Strategy", "SEO", "Social Media", "Analytics"],
    progress: 30,
    isEnrolled: true,
  },
]

const sampleLessons: Lesson[] = [
  { id: 1, title: "Introduction to React", type: "video", duration: "15 min", isCompleted: true, isLocked: false },
  {
    id: 2,
    title: "Setting up Development Environment",
    type: "video",
    duration: "20 min",
    isCompleted: true,
    isLocked: false,
  },
  { id: 3, title: "Your First Component", type: "practice", duration: "30 min", isCompleted: true, isLocked: false },
  { id: 4, title: "Props and State", type: "video", duration: "25 min", isCompleted: false, isLocked: false },
  { id: 5, title: "Event Handling Quiz", type: "quiz", duration: "10 min", isCompleted: false, isLocked: false },
  { id: 6, title: "Advanced Hooks", type: "video", duration: "35 min", isCompleted: false, isLocked: false },
]

export function LearningModules() {
  const [activeTab, setActiveTab] = useState("courses")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const enrolledCourses = courses.filter((course) => course.isEnrolled)

  const renderCourseCard = (course: Course) => (
    <Card
      key={course.id}
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => setSelectedCourse(course)}
    >
      <div className="relative">
        <img
          src={course.thumbnail || "/placeholder.svg"}
          alt={course.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {course.isEnrolled && (
          <div className="absolute bottom-2 left-2 right-2">
            <Progress value={course.progress || 0} className="h-2" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="secondary" className={categories.find((c) => c.id === course.category)?.color}>
            {categories.find((c) => c.id === course.category)?.name}
          </Badge>
          <Badge variant="outline">{course.level}</Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{course.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {course.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {course.skills.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{course.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {course.lessons} lessons
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-primary">Gratis</p>
            <p className="text-xs text-muted-foreground">{course.students} students</p>
          </div>
          <Button size="sm" variant={course.isEnrolled ? "secondary" : "default"}>
            {course.isEnrolled ? "Lanjutkan" : "Mulai Belajar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  const renderCourseDetail = () => (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => setSelectedCourse(null)} className="mb-4">
        ← Kembali ke Courses
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <img
            src={selectedCourse?.thumbnail || "/placeholder.svg"}
            alt={selectedCourse?.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{selectedCourse?.title}</h1>
              <p className="text-muted-foreground text-lg">{selectedCourse?.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className={categories.find((c) => c.id === selectedCourse?.category)?.color}>
                {categories.find((c) => c.id === selectedCourse?.category)?.name}
              </Badge>
              <Badge variant="outline">{selectedCourse?.level}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {selectedCourse?.rating}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedCourse?.skills.map((skill) => (
                <Badge key={skill} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Course Content */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleLessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {lesson.isCompleted ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <span className="text-sm font-medium">{index + 1}</span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {lesson.type}
                          </Badge>
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">
                      {lesson.type === "video" ? <Play className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold mb-2 text-primary">Gratis</div>
                {selectedCourse?.isEnrolled && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{selectedCourse.progress}%</span>
                    </div>
                    <Progress value={selectedCourse.progress || 0} className="h-2" />
                  </div>
                )}
              </div>

              <Button className="w-full mb-4" size="lg">
                {selectedCourse?.isEnrolled ? "Lanjutkan Belajar" : "Mulai Belajar"}
              </Button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <span>{selectedCourse?.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Lessons</span>
                  <span>{selectedCourse?.lessons}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Students</span>
                  <span>{selectedCourse?.students}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Level</span>
                  <span>{selectedCourse?.level}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {selectedCourse?.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="font-medium">{selectedCourse?.instructor}</p>
                  <p className="text-sm text-muted-foreground">Senior Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  if (selectedCourse) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">{renderCourseDetail()}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Learning Modules</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tingkatkan skill Anda dengan kursus gratis berkualitas tinggi dari para ahli
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="courses">All Courses</TabsTrigger>
              <TabsTrigger value="enrolled">My Courses</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-8">
              {/* Search and Filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Cari kursus..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={selectedCategory === "all" ? "default" : "outline"}
                        onClick={() => setSelectedCategory("all")}
                      >
                        All
                      </Button>
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {category.name}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Course Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredCourses.map(renderCourseCard)}</div>
            </TabsContent>

            <TabsContent value="enrolled" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{enrolledCourses.map(renderCourseCard)}</div>
              {enrolledCourses.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Belum ada kursus</h3>
                  <p className="text-muted-foreground mb-4">Mulai belajar dengan mendaftar kursus pertama Anda</p>
                  <Button onClick={() => setActiveTab("courses")}>Jelajahi Kursus</Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="achievements" className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold mb-2">First Course Completed</h3>
                  <p className="text-sm text-muted-foreground">Selesaikan kursus pertama Anda</p>
                  <Badge className="mt-2">Earned</Badge>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Skill Master</h3>
                  <p className="text-sm text-muted-foreground">Kuasai 3 skill berbeda</p>
                  <Badge variant="outline" className="mt-2">
                    In Progress
                  </Badge>
                </Card>

                <Card className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Learning Streak</h3>
                  <p className="text-sm text-muted-foreground">Belajar 7 hari berturut-turut</p>
                  <Badge variant="outline" className="mt-2">
                    Locked
                  </Badge>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
