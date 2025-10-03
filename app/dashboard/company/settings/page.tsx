"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CompanySidebar } from "@/components/company-sidebar"
import { Save, Building, Bell, Shield, Users, Globe } from "lucide-react"

export default function CompanySettings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    workerApplications: true,
    marketingEmails: false,
    twoFactorAuth: true,
    publicProfile: true,
    autoApproveWorkers: false,
    requireNDA: true,
  })

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

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Pengaturan Perusahaan</h1>
              <p className="text-muted-foreground">Kelola pengaturan dan preferensi perusahaan Anda</p>
            </div>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Simpan Perubahan
            </Button>
          </div>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Informasi Perusahaan
              </CardTitle>
              <CardDescription>Kelola informasi dasar perusahaan Anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Nama Perusahaan</Label>
                  <Input id="company-name" value="PT Digital Nusantara" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="company-email">Email Perusahaan</Label>
                  <Input id="company-email" value="hr@company.com" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-phone">Nomor Telepon</Label>
                  <Input id="company-phone" value="+62 21-1234-5678" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="company-website">Website</Label>
                  <Input id="company-website" value="https://digitalnusantara.com" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="company-address">Alamat</Label>
                <Textarea
                  id="company-address"
                  value="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10110"
                  className="mt-1"
                  rows={2}
                />
              </div>
              <div>
                <Label htmlFor="company-description">Deskripsi Perusahaan</Label>
                <Textarea
                  id="company-description"
                  value="PT Digital Nusantara adalah perusahaan teknologi yang fokus pada pengembangan solusi digital untuk UMKM dan enterprise di Indonesia."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifikasi
              </CardTitle>
              <CardDescription>Atur preferensi notifikasi perusahaan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Terima notifikasi melalui email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="project-updates">Project Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifikasi update proyek dan milestone</p>
                </div>
                <Switch
                  id="project-updates"
                  checked={settings.projectUpdates}
                  onCheckedChange={(checked) => handleSettingChange("projectUpdates", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="worker-applications">Worker Applications</Label>
                  <p className="text-sm text-muted-foreground">Notifikasi aplikasi pekerja baru</p>
                </div>
                <Switch
                  id="worker-applications"
                  checked={settings.workerApplications}
                  onCheckedChange={(checked) => handleSettingChange("workerApplications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Terima email promosi dan tips bisnis</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={settings.marketingEmails}
                  onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Keamanan
              </CardTitle>
              <CardDescription>Kelola pengaturan keamanan akun perusahaan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Tambahkan lapisan keamanan ekstra</p>
                </div>
                <Switch
                  id="two-factor"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange("twoFactorAuth", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Tampilkan profil perusahaan di pencarian publik</p>
                </div>
                <Switch
                  id="public-profile"
                  checked={settings.publicProfile}
                  onCheckedChange={(checked) => handleSettingChange("publicProfile", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Worker Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Manajemen Pekerja
              </CardTitle>
              <CardDescription>Pengaturan terkait manajemen pekerja</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-approve">Auto Approve Workers</Label>
                  <p className="text-sm text-muted-foreground">
                    Otomatis approve aplikasi pekerja yang memenuhi kriteria
                  </p>
                </div>
                <Switch
                  id="auto-approve"
                  checked={settings.autoApproveWorkers}
                  onCheckedChange={(checked) => handleSettingChange("autoApproveWorkers", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="require-nda">Require NDA</Label>
                  <p className="text-sm text-muted-foreground">Wajibkan pekerja menandatangani NDA</p>
                </div>
                <Switch
                  id="require-nda"
                  checked={settings.requireNDA}
                  onCheckedChange={(checked) => handleSettingChange("requireNDA", checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Regional Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Regional
              </CardTitle>
              <CardDescription>Pengaturan bahasa dan zona waktu</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="language">Bahasa</Label>
                  <Input id="language" value="Bahasa Indonesia" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="timezone">Zona Waktu</Label>
                  <Input id="timezone" value="WIB (UTC+7)" className="mt-1" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Mata Uang</Label>
                  <Input id="currency" value="Indonesian Rupiah (IDR)" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="date-format">Format Tanggal</Label>
                  <Input id="date-format" value="DD/MM/YYYY" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
