"use client"

import { WorkerSidebar } from "@/components/worker-sidebar"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bookmark, MapPin, DollarSign, Clock, Trash2 } from "lucide-react"
import Image from "next/image"

const savedJobsData = [
  {
    id: 2,
    title: "Senior UI/UX Designer",
    company: "Apple",
    location: "Boston, USA",
    type: "FULL-TIME",
    salary: "$30,000 - $55,000",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    savedDate: "3 hari yang lalu",
    deadline: "20 Januari 2025",
  },
  {
    id: 3,
    title: "Marketing Officer",
    company: "Intel Corp",
    location: "Bangalore, India",
    type: "PART-TIME",
    salary: "15,000 INR - 35,000 INR",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg",
    savedDate: "1 minggu yang lalu",
    deadline: "18 Januari 2025",
  },
]

export default function SavedJobsPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [savedJobs, setSavedJobs] = useState(savedJobsData)
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
        if (parsedUser.role !== "worker") {
          router.push("/dashboard/company")
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

  const handleRemove = (jobId: number) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== jobId))
  }

  const handleViewDetails = (jobId: number) => {
    router.push(`/dashboard/worker/jobs/${jobId}`)
  }

  const handleApply = (jobId: number) => {
    router.push(`/dashboard/worker/jobs/${jobId}/apply`)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Memuat halaman...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Pekerjaan Tersimpan</h1>
            <p className="text-muted-foreground">Anda memiliki {savedJobs.length} pekerjaan yang disimpan</p>
          </div>

          {savedJobs.length === 0 ? (
            <Card className="p-12 text-center">
              <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2 text-foreground">Belum ada pekerjaan tersimpan</h3>
              <p className="text-muted-foreground mb-6">
                Simpan pekerjaan yang menarik untuk Anda agar mudah ditemukan nanti
              </p>
              <Button onClick={() => router.push("/dashboard/worker/jobs")}>Cari Pekerjaan</Button>
            </Card>
          ) : (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <Card key={job.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-6">
                    <div className="w-16 h-16 rounded-lg bg-white p-3 shadow-sm flex items-center justify-center flex-shrink-0">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        alt={job.company}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground mb-1">{job.title}</h3>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(job.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Deadline: {job.deadline}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="bg-primary text-primary-foreground">
                            {job.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">Disimpan {job.savedDate}</span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" onClick={() => handleViewDetails(job.id)}>
                            Lihat Detail
                          </Button>
                          <Button onClick={() => handleApply(job.id)}>Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
