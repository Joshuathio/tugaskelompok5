"use client"

import { WorkerSidebar } from "@/components/worker-sidebar"
import { WorkerDashboard } from "@/components/worker-dashboard"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function WorkerDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
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
        console.error("Error parsing user data:", error)
        router.push("/login")
      }
    }

    checkAuth()
    const timer = setTimeout(checkAuth, 100)
    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Memuat dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <WorkerDashboard />
        </div>
      </main>
    </div>
  )
}
