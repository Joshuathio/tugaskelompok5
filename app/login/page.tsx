"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Login attempt with email:", email)

    const demoCredentials = {
      "worker@demo.com": { role: "worker", name: "Pekerja Demo" },
      "hr@company.com": { role: "company", name: "HR Manager" },
    }

    // Check if email matches demo credentials
    if (!demoCredentials[email as keyof typeof demoCredentials]) {
      alert("Gunakan demo credentials: worker@demo.com atau hr@company.com")
      setIsLoading(false)
      return
    }

    // Simulate authentication
    setTimeout(() => {
      const userConfig = demoCredentials[email as keyof typeof demoCredentials]
      const mockUser = {
        id: Date.now(),
        name: userConfig.name,
        email,
        role: userConfig.role,
        avatar: "/professional-indonesian-man.jpg",
      }

      console.log("[v0] User created:", mockUser)

      try {
        const userDataString = JSON.stringify(mockUser)
        localStorage.setItem("kerjoo_user", userDataString)
        localStorage.setItem("kerjoo_auth", "true")
        sessionStorage.setItem("kerjoo_user", userDataString)
        sessionStorage.setItem("kerjoo_auth", "true")

        console.log("[v0] User stored successfully")

        if (mockUser.role === "company") {
          console.log("[v0] Redirecting to company dashboard")
          window.location.href = "/dashboard/company"
        } else {
          console.log("[v0] Redirecting to worker dashboard")
          window.location.href = "/dashboard/worker"
        }
      } catch (error) {
        console.error("[v0] Error storing user data:", error)
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-16">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">Kerjoo!</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Masuk ke Akun Anda</h1>
          <p className="text-muted-foreground">Selamat datang kembali! Silakan masuk ke akun Anda.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Masuk</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link href="/register" className="text-primary hover:underline">
                  Daftar sekarang
                </Link>
              </div>
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded-md">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>
                  <strong>Pekerja:</strong> worker@demo.com
                </p>
                <p>
                  <strong>HRD:</strong> hr@company.com
                </p>
                <p>
                  <strong>Password:</strong> apapun
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
