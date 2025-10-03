import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, TrendingUp, Wallet, BookOpen, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ForWorkersPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            Untuk Pekerja Mikro
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Kembangkan Karir Anda dengan <span className="text-primary">Kerjoo!</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Platform yang dirancang khusus untuk membantu pekerja mikro menemukan peluang terbaik, mengembangkan skill,
            dan membangun reputasi profesional
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/register">
                Daftar Gratis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/assessment">Coba AI Assessment</Link>
            </Button>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skill Assessment AI</h3>
              <p className="text-muted-foreground">
                Dapatkan penilaian skill yang objektif dan akurat dengan teknologi AI terdepan
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Proyek Berkualitas</h3>
              <p className="text-muted-foreground">
                Akses ke proyek-proyek dari perusahaan terpercaya dengan kompensasi yang fair
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learning Modules</h3>
              <p className="text-muted-foreground">
                Tingkatkan kemampuan dengan kursus singkat yang relevan dengan kebutuhan industri
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Pembayaran Aman</h3>
              <p className="text-muted-foreground">
                Sistem pembayaran terintegrasi dengan berbagai metode pembayaran lokal
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Builder</h3>
              <p className="text-muted-foreground">
                Bangun portfolio profesional dengan feedback dari klien untuk meningkatkan kredibilitas
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
              <p className="text-muted-foreground">
                Tracking perkembangan karir dengan visualisasi yang memotivasi dan target yang jelas
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center bg-muted/30 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Siap Memulai Perjalanan Karir Anda?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Bergabunglah dengan ribuan pekerja mikro yang telah sukses di Kerjoo!
          </p>
          <Button size="lg" asChild>
            <Link href="/register">
              Daftar Sekarang - Gratis!
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
