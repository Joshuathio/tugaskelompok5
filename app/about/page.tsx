import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Target, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kerjoo!</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Platform digital yang menghubungkan pekerja mikro dengan perusahaan melalui teknologi AI, menciptakan
            ekosistem kerja yang adil dan berkelanjutan
          </p>
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 text-center">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Misi Kami</h3>
              <p className="text-muted-foreground">
                Memberdayakan pekerja mikro Indonesia dengan teknologi AI untuk menciptakan peluang kerja yang lebih
                baik
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 text-center">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Visi Kami</h3>
              <p className="text-muted-foreground">
                Menjadi platform terdepan yang menghubungkan talenta dengan peluang melalui teknologi yang humanis
              </p>
            </CardContent>
          </Card>

          <Card className="p-8 text-center">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Nilai Kami</h3>
              <p className="text-muted-foreground">
                Transparansi, keadilan, dan pemberdayaan dalam setiap interaksi antara pekerja dan perusahaan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Story */}
        <div className="bg-muted/30 rounded-2xl p-12 mb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Cerita Kami</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Kerjoo! lahir dari keprihatinan terhadap kesenjangan antara talenta pekerja mikro Indonesia dengan peluang
              kerja yang tersedia. Kami percaya bahwa dengan teknologi AI yang tepat, setiap pekerja dapat menemukan
              proyek yang sesuai dengan kemampuannya.
            </p>
            <p className="text-lg text-muted-foreground">
              Didirikan pada 2024, kami telah membantu ribuan pekerja mikro menemukan peluang terbaik dan membantu
              ratusan perusahaan menemukan talenta yang tepat untuk proyek mereka.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Tim Kami</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-2">Ahmad Rizki</h3>
              <p className="text-muted-foreground">CEO & Founder</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-2">Sari Dewi</h3>
              <p className="text-muted-foreground">CTO</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-semibold mb-2">Budi Santoso</h3>
              <p className="text-muted-foreground">Head of Product</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Bergabunglah dengan Revolusi Kerja Digital</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Mari bersama-sama membangun masa depan kerja yang lebih baik
          </p>
          <Button size="lg" asChild>
            <Link href="/register">
              Mulai Perjalanan Anda
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
