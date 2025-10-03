import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, Server, CheckCircle, AlertTriangle } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Keamanan & Privasi
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Keamanan <span className="text-primary">Terdepan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen melindungi data dan privasi Anda dengan standar keamanan tingkat enterprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  Enkripsi End-to-End
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Semua data Anda dienkripsi menggunakan standar AES-256 baik saat transit maupun saat disimpan.
                  Komunikasi antara pekerja dan klien dilindungi dengan enkripsi tingkat militer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-blue-600" />
                  </div>
                  Autentikasi Multi-Faktor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lindungi akun Anda dengan 2FA menggunakan SMS, email, atau aplikasi authenticator. Sistem login yang
                  aman dengan deteksi aktivitas mencurigakan.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Eye className="w-5 h-5 text-purple-600" />
                  </div>
                  Kontrol Privasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Anda memiliki kontrol penuh atas data pribadi. Atur visibilitas profil, kelola izin akses, dan hapus
                  data kapan saja sesuai keinginan Anda.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Server className="w-5 h-5 text-orange-600" />
                  </div>
                  Infrastruktur Aman
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Server kami dilindungi dengan firewall tingkat enterprise, monitoring 24/7, dan backup otomatis.
                  Hosting di data center bersertifikat ISO 27001.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Sertifikasi & Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold">ISO 27001</div>
                    <div className="text-sm text-muted-foreground">Information Security Management</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold">SOC 2 Type II</div>
                    <div className="text-sm text-muted-foreground">Security & Availability</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <div className="font-semibold">GDPR Compliant</div>
                    <div className="text-sm text-muted-foreground">Data Protection Regulation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Kebijakan Keamanan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <div className="font-semibold">Pelaporan Kerentanan</div>
                  <div className="text-muted-foreground">
                    Kami memiliki program bug bounty untuk peneliti keamanan yang menemukan kerentanan. Laporkan ke
                    security@kerjoo.com
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <div className="font-semibold">Audit Keamanan Berkala</div>
                  <div className="text-muted-foreground">
                    Sistem kami diaudit oleh pihak ketiga independen setiap 6 bulan untuk memastikan standar keamanan
                    tertinggi.
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <div className="font-semibold">Akses Terbatas</div>
                  <div className="text-muted-foreground">
                    Hanya karyawan yang berwenang yang memiliki akses ke data pengguna, dengan logging dan monitoring
                    semua aktivitas.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Pertanyaan tentang keamanan?</h3>
            <p className="text-muted-foreground mb-6">Tim keamanan kami siap menjawab pertanyaan Anda</p>
            <a
              href="mailto:security@kerjoo.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Hubungi Tim Keamanan
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
