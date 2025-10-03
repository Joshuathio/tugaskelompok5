"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, HelpCircle, Book, Users, Wallet } from "lucide-react"

const faqs = [
  {
    category: "Umum",
    icon: HelpCircle,
    questions: [
      {
        question: "Apa itu Kerjoo!?",
        answer:
          "Kerjoo! adalah platform digital yang menghubungkan pekerja mikro dengan perusahaan melalui AI skill assessment, work chaining, dan ekosistem pengembangan berkelanjutan.",
      },
      {
        question: "Bagaimana cara mendaftar di Kerjoo!?",
        answer:
          "Anda dapat mendaftar dengan mengklik tombol 'Daftar Sekarang' di halaman utama, kemudian mengisi formulir pendaftaran dan melakukan verifikasi email.",
      },
      {
        question: "Apakah Kerjoo! gratis?",
        answer:
          "Ya, Kerjoo! menyediakan paket gratis untuk pemula. Kami juga memiliki paket berbayar dengan fitur lebih lengkap untuk pengguna profesional.",
      },
    ],
  },
  {
    category: "Skill Assessment",
    icon: Book,
    questions: [
      {
        question: "Bagaimana cara kerja AI Skill Assessment?",
        answer:
          "AI Skill Assessment menganalisis kemampuan teknis dan soft skill Anda melalui serangkaian tes interaktif, kemudian memberikan skor dan rekomendasi pengembangan.",
      },
      {
        question: "Berapa lama waktu yang dibutuhkan untuk assessment?",
        answer: "Assessment biasanya memakan waktu 30-45 menit tergantung pada kategori skill yang dipilih.",
      },
      {
        question: "Bisakah saya mengulang assessment?",
        answer: "Ya, Anda dapat mengulang assessment setelah 30 hari untuk melihat perkembangan skill Anda.",
      },
    ],
  },
  {
    category: "Pekerjaan",
    icon: Users,
    questions: [
      {
        question: "Bagaimana cara mencari pekerjaan di Kerjoo!?",
        answer:
          "Gunakan fitur pencarian di halaman Jobs, filter berdasarkan kategori, lokasi, dan budget. AI kami akan merekomendasikan pekerjaan yang sesuai dengan skill Anda.",
      },
      {
        question: "Bagaimana cara melamar pekerjaan?",
        answer:
          "Klik tombol 'Lamar Sekarang' pada pekerjaan yang diminati, lengkapi proposal Anda, dan kirimkan aplikasi.",
      },
      {
        question: "Berapa banyak pekerjaan yang bisa saya lamar?",
        answer: "Pengguna gratis dapat melamar 5 pekerjaan per bulan, sedangkan pengguna Pro mendapat akses unlimited.",
      },
    ],
  },
  {
    category: "Pembayaran",
    icon: Wallet,
    questions: [
      {
        question: "Bagaimana sistem pembayaran di Kerjoo!?",
        answer:
          "Kami menggunakan sistem escrow yang aman. Pembayaran ditahan hingga pekerjaan selesai dan disetujui oleh klien.",
      },
      {
        question: "Kapan saya bisa menarik penghasilan?",
        answer: "Anda dapat menarik penghasilan setelah pekerjaan selesai dan melewati periode review 3-7 hari kerja.",
      },
      {
        question: "Apa saja metode pembayaran yang tersedia?",
        answer:
          "Kami mendukung transfer bank lokal, e-wallet (GoPay, OVO, DANA), dan berbagai metode pembayaran digital lainnya.",
      },
    ],
  },
]

export default function HelpPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Pusat Bantuan
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Bagaimana Kami Bisa <span className="text-primary">Membantu?</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan yang sering diajukan tentang Kerjoo!
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Cari bantuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFaqs.map((category) => (
              <Card key={category.category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-primary" />
                    </div>
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq, index) => {
                      const itemId = `${category.category}-${index}`
                      return (
                        <Collapsible key={itemId}>
                          <CollapsibleTrigger
                            onClick={() => toggleItem(itemId)}
                            className="flex items-center justify-between w-full p-4 text-left bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                          >
                            <span className="font-medium">{faq.question}</span>
                            <ChevronDown
                              className={`w-5 h-5 transition-transform ${
                                openItems.includes(itemId) ? "rotate-180" : ""
                              }`}
                            />
                          </CollapsibleTrigger>
                          <CollapsibleContent className="px-4 py-3 text-muted-foreground">
                            {faq.answer}
                          </CollapsibleContent>
                        </Collapsible>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Tidak ada hasil yang ditemukan</p>
                <p className="text-sm">Coba gunakan kata kunci yang berbeda</p>
              </div>
            </div>
          )}

          <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Masih butuh bantuan?</h3>
            <p className="text-muted-foreground mb-4">Tim support kami siap membantu Anda 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@kerjoo.com"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Email Support
              </a>
              <a
                href="tel:+6221123456789"
                className="inline-flex items-center justify-center px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
