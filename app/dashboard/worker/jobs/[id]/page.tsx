"use client"

import { WorkerSidebar } from "@/components/worker-sidebar"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  Heart,
  Share2,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle,
  Bookmark,
} from "lucide-react"
import Image from "next/image"

const jobDetails = {
  1: {
    id: 1,
    title: "Senior Database Programmer",
    company: "Highspeed Studios",
    companyType: "Creative Design Agency",
    location: "London, England",
    workLevel: "Senior",
    experience: "3 Years",
    employmentType: "Part-Time",
    salary: "$1200/month",
    postedBy: "Martinez Team",
    postedDate: "Posted 5days ago",
    employees: "80 - 100",
    rating: "4.5",
    reviews: "Reviews",
    following: false,
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    requirements: [
      "Quis nostrud exercitation ullamco",
      "Velit voluptate dulcisute",
      "Irure dolor in reprehenderit in voluptate",
      "Lorem ipsum dolor sit amet",
    ],
    responsibilities: [
      "Quis nostrud exercitation ullamco",
      "Velit voluptate dulcisute",
      "Irure dolor in reprehenderit in voluptate",
      "Lorem ipsum dolor sit amet",
    ],
    gallery: [
      "/placeholder.svg?height=120&width=200",
      "/placeholder.svg?height=120&width=200",
      "/placeholder.svg?height=120&width=200",
      "/placeholder.svg?height=120&width=200",
    ],
  },
}

export default function JobDetailPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const router = useRouter()
  const params = useParams()
  const jobId = Number.parseInt(params.id as string)

  const job = jobDetails[jobId as keyof typeof jobDetails]

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

  const handleShare = async () => {
    const shareData = {
      title: job?.title || "Job Opportunity",
      text: `Check out this job: ${job?.title} at ${job?.company}`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  const handleApplyNow = () => {
    router.push(`/dashboard/worker/jobs/${jobId}/apply`)
  }

  const handleSaveJob = () => {
    setIsSaved(!isSaved)
    // Here you would typically save to backend/localStorage
    const savedJobs = JSON.parse(localStorage.getItem("kerjoo_saved_jobs") || "[]")
    if (!isSaved) {
      savedJobs.push(jobId)
      localStorage.setItem("kerjoo_saved_jobs", JSON.stringify(savedJobs))
    } else {
      const filtered = savedJobs.filter((id: number) => id !== jobId)
      localStorage.setItem("kerjoo_saved_jobs", JSON.stringify(filtered))
    }
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

  if (!user || !job) return null

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8 text-foreground">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <span className="text-primary">Search Job /</span>
            <span>{job.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-2xl mx-auto mb-4 p-4">
                      <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-foreground">{job.company}</h3>
                    <p className="text-muted-foreground text-sm">{job.companyType}</p>
                  </div>

                  <Button
                    className={`w-full mb-6 ${isFollowing ? "bg-primary" : "bg-primary"}`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? "Following" : "Following"}
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-bold text-foreground">{job.employees}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">Employees</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-400" />
                        <span className="text-2xl font-bold text-foreground">{job.rating}</span>
                      </div>
                      <span className="text-muted-foreground text-sm">{job.reviews}</span>
                    </div>

                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-sm">{job.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  {/* Job header */}
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h1 className="text-3xl font-bold mb-2 text-foreground">{job.title}</h1>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="text-primary">{job.postedBy}</span>
                        <span>{job.postedDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsLiked(!isLiked)}
                        className={isLiked ? "text-red-500" : ""}
                      >
                        <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleShare}>
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Job details badges */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-2 mx-auto">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Work Level</p>
                      <p className="font-semibold text-foreground">{job.workLevel}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/20 rounded-lg mb-2 mx-auto">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Min Experience</p>
                      <p className="font-semibold text-foreground">{job.experience}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-2 mx-auto">
                        <Users className="h-6 w-6 text-green-400" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Employee Type</p>
                      <p className="font-semibold text-foreground">{job.employmentType}</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-yellow-500/20 rounded-lg mb-2 mx-auto">
                        <DollarSign className="h-6 w-6 text-yellow-400" />
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">Offer Salary</p>
                      <p className="font-semibold text-foreground">{job.salary}</p>
                    </div>
                  </div>

                  {/* Overview */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-foreground">Overview</h2>
                    <p className="text-muted-foreground leading-relaxed">{job.overview}</p>
                  </div>

                  {/* Requirements and Responsibilities */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">Requirements</h3>
                      <ul className="space-y-3">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-foreground">Responsibilities</h3>
                      <ul className="space-y-3">
                        {job.responsibilities.map((resp, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Gallery */}
                  <div className="mb-8">
                    <h2 className="text-xl font-bold mb-4 text-foreground">Gallery</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {job.gallery.map((image, index) => (
                        <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Gallery ${index + 1}`}
                            width={200}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="flex gap-4">
                    <Button className="flex-1 py-3" onClick={handleApplyNow}>
                      Apply Now
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleSaveJob}
                      className={isSaved ? "bg-primary text-primary-foreground" : ""}
                    >
                      <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
                      {isSaved ? "Saved" : "Save Job"}
                    </Button>
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
