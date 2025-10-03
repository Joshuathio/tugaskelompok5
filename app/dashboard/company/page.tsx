"use client"

import { CompanySidebar } from "@/components/company-sidebar"
import { CompanyDashboard } from "@/components/company-dashboard"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CompanyDashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    console.log("[v0] Company dashboard loading...")

    const checkAuth = () => {
      const userData = localStorage.getItem("kerjoo_user") || sessionStorage.getItem("kerjoo_user")
      const authStatus = localStorage.getItem("kerjoo_auth") || sessionStorage.getItem("kerjoo_auth")

      console.log("[v0] User data from storage:", userData)
      console.log("[v0] Auth status:", authStatus)

      if (!userData || !authStatus) {
        console.log("[v0] No user data, redirecting to login")
        router.push("/login")
        return
      }

      try {
        const parsedUser = JSON.parse(userData)
        console.log("[v0] Parsed user:", parsedUser)

        if (parsedUser.role !== "company") {
          console.log("[v0] User is not company, redirecting to worker dashboard")
          router.push("/dashboard/worker")
          return
        }

        console.log("[v0] Company dashboard loaded successfully")
        setUser(parsedUser)
        setIsLoading(false)
      } catch (error) {
        console.error("[v0] Error parsing user data:", error)
        router.push("/login")
      }
    }

    checkAuth()
    const timer = setTimeout(checkAuth, 500)
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
      <CompanySidebar />
      <main className="flex-1 ml-64 p-6">
        <CompanyDashboard />
      </main>
    </div>
  )
}
