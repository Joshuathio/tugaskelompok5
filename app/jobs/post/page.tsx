"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X, DollarSign, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function PostJobPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
  const [jobData, setJobData] = useState({
    title: "",
    category: "",
    type: "",
    location: "",
    budget: "",
    duration: "",
    description: "",
    requirements: "",
    experience: "",
  })

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle job posting logic here
    console.log("Job posted:", { ...jobData, skills })
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Posting Pekerjaan</h1>
          <p className="text-gray-400">Temukan talenta terbaik untuk proyek Anda</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Informasi Dasar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-gray-300">
                  Judul Pekerjaan *
                </Label>
                <Input
                  id="title"
                  placeholder="Contoh: UI/UX Designer untuk Mobile App"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-gray-300">
                    Kategori *
                  </Label>
                  <Select
                    value={jobData.category}
                    onValueChange={(value) => setJobData({ ...jobData, category: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="design">Design & UI/UX</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="content">Content & Marketing</SelectItem>
                      <SelectItem value="data">Data & Analytics</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="type" className="text-gray-300">
                    Tipe Pekerjaan *
                  </Label>
                  <Select value={jobData.type} onValueChange={(value) => setJobData({ ...jobData, type: value })}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="freelance&microtask">Freelance & Micro Task</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="full-time">Full-time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="location" className="text-gray-300">
                    Lokasi
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="location"
                      placeholder="Remote / Jakarta"
                      value={jobData.location}
                      onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget" className="text-gray-300">
                    Budget *
                  </Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="budget"
                      placeholder="Rp 2,000,000 - Rp 5,000,000"
                      value={jobData.budget}
                      onChange={(e) => setJobData({ ...jobData, budget: e.target.value })}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration" className="text-gray-300">
                    Durasi
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="duration"
                      placeholder="2-3 minggu"
                      value={jobData.duration}
                      onChange={(e) => setJobData({ ...jobData, duration: e.target.value })}
                      className="pl-10 bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Description */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Deskripsi Pekerjaan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="description" className="text-gray-300">
                  Deskripsi *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Jelaskan detail pekerjaan, tujuan proyek, dan ekspektasi hasil..."
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white min-h-[120px]"
                  required
                />
              </div>

              <div>
                <Label htmlFor="requirements" className="text-gray-300">
                  Persyaratan
                </Label>
                <Textarea
                  id="requirements"
                  placeholder="Sebutkan persyaratan khusus, kualifikasi, atau pengalaman yang dibutuhkan..."
                  value={jobData.requirements}
                  onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="experience" className="text-gray-300">
                  Level Pengalaman
                </Label>
                <Select
                  value={jobData.experience}
                  onValueChange={(value) => setJobData({ ...jobData, experience: value })}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Pilih level pengalaman" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="entry">Entry Level (0-1 tahun)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-4 tahun)</SelectItem>
                    <SelectItem value="senior">Senior (5+ tahun)</SelectItem>
                    <SelectItem value="expert">Expert (10+ tahun)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Skills Required */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Skill yang Dibutuhkan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Tambahkan skill (contoh: React.js, Figma, SEO)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="bg-gray-800 border-gray-700 text-white"
                />
                <Button type="button" onClick={addSkill} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-blue-600 text-white">
                      {skill}
                      <button type="button" onClick={() => removeSkill(skill)} className="ml-2 hover:text-red-300">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview & Submit */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Preview Posting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-800 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold text-white mb-2">{jobData.title || "Judul Pekerjaan"}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="text-blue-400">Perusahaan Anda</span>
                  {jobData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {jobData.location}
                    </div>
                  )}
                  {jobData.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {jobData.duration}
                    </div>
                  )}
                </div>
                {jobData.budget && (
                  <div className="flex items-center gap-1 text-green-400 font-semibold mb-3">
                    <DollarSign className="h-4 w-4" />
                    {jobData.budget}
                  </div>
                )}
                {jobData.description && <p className="text-gray-300 mb-3">{jobData.description}</p>}
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-gray-600 text-gray-300">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                >
                  Simpan Draft
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                  Posting Pekerjaan
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
