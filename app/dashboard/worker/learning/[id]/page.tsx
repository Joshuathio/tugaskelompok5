"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { WorkerSidebar } from "@/components/worker-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Play, CheckCircle, Lock, Clock, Star, Award, ArrowLeft } from "lucide-react"

const courseModules = [
  {
    id: 1,
    title: "Introduction to React",
    duration: "45 min",
    completed: true,
    locked: false,
  },
  {
    id: 2,
    title: "Components and Props",
    duration: "60 min",
    completed: true,
    locked: false,
  },
  {
    id: 3,
    title: "State and Lifecycle",
    duration: "75 min",
    completed: false,
    locked: false,
  },
  {
    id: 4,
    title: "Hooks in Depth",
    duration: "90 min",
    completed: false,
    locked: false,
  },
  {
    id: 5,
    title: "Advanced Patterns",
    duration: "120 min",
    completed: false,
    locked: true,
  },
]

export default function CourseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<any>(null)

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

  const handleStartModule = (moduleId: number) => {
    console.log("Starting module:", moduleId)
    // Here you would navigate to the video player or lesson content
    alert(`Memulai modul ${moduleId}`)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">Advanced React Patterns</CardTitle>
                      <CardDescription className="mt-2">by John Doe</CardDescription>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Berlangsung</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-6 text-sm">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />8 hours
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      4.8
                    </span>
                    <Badge variant="outline">Advanced</Badge>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-2">Tentang Kursus</h3>
                    <p className="text-muted-foreground">
                      Pelajari advanced patterns dalam React untuk membangun aplikasi yang scalable dan maintainable.
                      Kursus ini mencakup custom hooks, compound components, render props, dan banyak lagi.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress Kursus</span>
                      <span>65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Course Modules */}
              <Card>
                <CardHeader>
                  <CardTitle>Materi Kursus</CardTitle>
                  <CardDescription>5 modul pembelajaran</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {courseModules.map((module, index) => (
                      <div key={module.id}>
                        <div
                          className={`flex items-center justify-between p-4 rounded-lg border ${
                            module.locked ? "bg-muted/50" : "hover:bg-muted/50 cursor-pointer"
                          }`}
                          onClick={() => !module.locked && handleStartModule(module.id)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${
                                module.completed
                                  ? "bg-green-100 text-green-600"
                                  : module.locked
                                    ? "bg-gray-100 text-gray-400"
                                    : "bg-blue-100 text-blue-600"
                              }`}
                            >
                              {module.completed ? (
                                <CheckCircle className="w-4 h-4" />
                              ) : module.locked ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4" />
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${module.locked ? "text-muted-foreground" : ""}`}>
                                {module.title}
                              </p>
                              <p className="text-sm text-muted-foreground">{module.duration}</p>
                            </div>
                          </div>
                          {!module.locked && !module.completed && (
                            <Button size="sm" variant="ghost">
                              Mulai
                            </Button>
                          )}
                        </div>
                        {index < courseModules.length - 1 && <Separator className="my-2" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instruktur</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-semibold">JD</span>
                    </div>
                    <div>
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">React Expert</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pencapaian</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">Sertifikat setelah selesai</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm">Badge React Expert</span>
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
