import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Users, TrendingUp, Zap, Shield, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ForCompaniesPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            Untuk Perusahaan & HRD
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Temukan Talenta Terbaik dengan <span className="text-primary">AI Technology</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Platform recruitment gratis yang menggunakan AI untuk mencocokkan perusahaan Anda dengan talenta mikro
            terbaik berdasarkan skill dan kebutuhan proyek
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Mulai Hiring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard/company">Lihat Demo Dashboard</Link>
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Talent Matching</h3>
              <p className="text-muted-foreground">
                Algoritma AI yang mencocokkan kebutuhan proyek dengan skill pekerja secara akurat
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Talent Pool Berkualitas</h3>
              <p className="text-muted-foreground">
                Akses ke database pekerja mikro yang telah terverifikasi skill dan pengalamannya
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Performance Analytics</h3>
              <p className="text-muted-foreground">
                Dashboard analytics untuk tracking performa pekerja dan ROI proyek
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Hiring</h3>
              <p className="text-muted-foreground">
                Proses hiring yang cepat dengan pre-screened candidates dan automated matching
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Assurance</h3>
              <p className="text-muted-foreground">
                Sistem rating dan review untuk memastikan kualitas kerja yang konsisten
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Integrated Workflow</h3>
              <p className="text-muted-foreground">Manajemen proyek terintegrasi dari posting job hingga pembayaran</p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Siap Menemukan Talenta Terbaik?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Bergabunglah dengan 500+ perusahaan yang telah mempercayai Kerjoo!
          </p>
          <Button size="lg" asChild>
            <Link href="/register">
              Mulai Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
