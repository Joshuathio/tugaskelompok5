import { Card, CardContent } from "@/components/ui/card"
import { Brain, Users, TrendingUp, Target, BookOpen, Wallet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Fitur Lengkap Kerjoo!</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Teknologi AI dan sistem terintegrasi untuk menghubungkan talenta terbaik dengan peluang yang tepat
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Skill Assessment</h3>
              <p className="text-muted-foreground mb-4">
                Penilaian kemampuan otomatis dengan teknologi AI untuk menentukan level skill yang akurat dan objektif
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Multi-kategori assessment</li>
                <li>• Real-time evaluation</li>
                <li>• Personalized recommendations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Profile & Portfolio</h3>
              <p className="text-muted-foreground mb-4">
                Tampilkan 3 proyek terbaik dengan feedback perusahaan untuk membangun reputasi profesional
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Project showcase</li>
                <li>• Client testimonials</li>
                <li>• Skill endorsements</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Skill Growth Tracker</h3>
              <p className="text-muted-foreground mb-4">
                Visualisasi perkembangan skill dengan progres dan badge gamifikasi yang memotivasi
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Progress visualization</li>
                <li>• Achievement badges</li>
                <li>• Skill roadmaps</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">AI Recommendation</h3>
              <p className="text-muted-foreground mb-4">
                Rekomendasi talenta terbaik untuk perusahaan berdasarkan kebutuhan proyek yang spesifik
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Smart matching algorithm</li>
                <li>• Project compatibility</li>
                <li>• Performance prediction</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Learning Modules</h3>
              <p className="text-muted-foreground mb-4">
                Kursus singkat terintegrasi untuk meningkatkan kemampuan sesuai kebutuhan proyek terkini
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Interactive courses</li>
                <li>• Practical exercises</li>
                <li>• Completion certificates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="p-8 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Payment Integration</h3>
              <p className="text-muted-foreground mb-4">
                Sistem pembayaran aman dengan Midtrans dan manajemen budget yang fleksibel
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Secure transactions</li>
                <li>• Multiple payment methods</li>
                <li>• Budget management</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
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
