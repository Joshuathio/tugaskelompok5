"use client"

import type React from "react"

import { WorkerSidebar } from "@/components/worker-sidebar"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, FileText, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const jobData = {
  1: {
    title: "Technical Support Specialist",
    company: "Google Inc.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  2: {
    title: "Senior UI/UX Designer",
    company: "Apple",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
}

export default function JobApplicationPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    experience: "",
    availability: "immediate",
    expectedSalary: "",
    portfolio: "",
    resume: null as File | null,
  })
  const router = useRouter()
  const params = useParams()
  const jobId = Number(params.id)
  const job = jobData[jobId as keyof typeof jobData] || jobData[1]

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
        setFormData((prev) => ({
          ...prev,
          fullName: parsedUser.name || "",
          email: parsedUser.email || "",
        }))
        setIsLoading(false)
      } catch (error) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the application to your backend
    console.log("Application submitted:", formData)
    setIsSubmitted(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] })
    }
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

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen bg-background">
        <WorkerSidebar />
        <main className="flex-1 ml-64 p-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-12 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
              </div>
              <h1 className="text-2xl font-bold mb-4 text-foreground">Lamaran Berhasil Dikirim!</h1>
              <p className="text-muted-foreground mb-8">
                Terima kasih telah melamar untuk posisi <strong>{job.title}</strong> di <strong>{job.company}</strong>.
                Kami akan meninjau lamaran Anda dan menghubungi Anda segera.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => router.push("/dashboard/worker/jobs")}>
                  Lihat Pekerjaan Lain
                </Button>
                <Button onClick={() => router.push("/dashboard/worker")}>Kembali ke Dashboard</Button>
              </div>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            ← Kembali
          </Button>

          <Card className="p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white p-2 shadow-sm flex items-center justify-center">
                <Image
                  src={job.logo || "/placeholder.svg"}
                  alt={job.company}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{job.title}</h1>
                <p className="text-muted-foreground">{job.company}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Form Lamaran</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Informasi Pribadi</h3>

                <div>
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Nomor Telepon *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Resume Upload */}
              <div>
                <Label htmlFor="resume">Upload CV/Resume *</Label>
                <div className="mt-2 flex items-center gap-4">
                  <label
                    htmlFor="resume"
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-md cursor-pointer hover:bg-accent"
                  >
                    <Upload className="h-4 w-4" />
                    <span className="text-sm">Pilih File</span>
                  </label>
                  <input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {formData.resume && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      {formData.resume.name}
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Format: PDF, DOC, DOCX (Max 5MB)</p>
              </div>

              {/* Cover Letter */}
              <div>
                <Label htmlFor="coverLetter">Cover Letter *</Label>
                <Textarea
                  id="coverLetter"
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  placeholder="Ceritakan mengapa Anda tertarik dengan posisi ini dan mengapa Anda cocok untuk peran ini..."
                  rows={6}
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <Label htmlFor="experience">Pengalaman Relevan</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="Jelaskan pengalaman kerja Anda yang relevan dengan posisi ini..."
                  rows={4}
                />
              </div>

              {/* Portfolio */}
              <div>
                <Label htmlFor="portfolio">Link Portfolio/LinkedIn (Opsional)</Label>
                <Input
                  id="portfolio"
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              {/* Availability */}
              <div>
                <Label>Ketersediaan Mulai Bekerja *</Label>
                <RadioGroup
                  value={formData.availability}
                  onValueChange={(value) => setFormData({ ...formData, availability: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="immediate" id="immediate" />
                    <Label htmlFor="immediate" className="font-normal">
                      Segera
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2weeks" id="2weeks" />
                    <Label htmlFor="2weeks" className="font-normal">
                      2 Minggu
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1month" id="1month" />
                    <Label htmlFor="1month" className="font-normal">
                      1 Bulan
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Expected Salary */}
              <div>
                <Label htmlFor="expectedSalary">Ekspektasi Gaji (Opsional)</Label>
                <Input
                  id="expectedSalary"
                  value={formData.expectedSalary}
                  onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                  placeholder="Contoh: Rp 5.000.000 - Rp 7.000.000"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="font-normal text-sm leading-relaxed">
                  Saya menyatakan bahwa informasi yang saya berikan adalah benar dan akurat. Saya memahami bahwa
                  informasi palsu dapat mengakibatkan diskualifikasi dari proses rekrutmen.
                </Label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button type="button" variant="outline" className="flex-1 bg-transparent" onClick={() => router.back()}>
                  Batal
                </Button>
                <Button type="submit" className="flex-1">
                  Kirim Lamaran
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </main>
    </div>
  )
}
