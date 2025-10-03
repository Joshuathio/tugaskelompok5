"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Apa itu Kerjoo! dan bagaimana cara kerjanya?",
    answer:
      "Kerjoo! adalah platform digital gratis yang menghubungkan pekerja mikro dengan perusahaan. Platform ini menggunakan AI untuk menilai skill, mencocokkan pekerjaan, dan menyediakan learning modules untuk pengembangan karir berkelanjutan.",
  },
  {
    question: "Bagaimana cara mendaftar sebagai pekerja di Kerjoo!?",
    answer:
      "Klik tombol 'Daftar Sekarang', isi formulir pendaftaran, verifikasi email Anda, kemudian ikuti AI Skill Assessment untuk menentukan level kemampuan dan mendapatkan rekomendasi pekerjaan yang sesuai.",
  },
  {
    question: "Apakah ada biaya untuk menggunakan Kerjoo!?",
    answer:
      "Tidak! Kerjoo! sepenuhnya gratis untuk semua pengguna. Anda dapat mengakses semua fitur termasuk unlimited job applications, AI assessment, dan learning modules tanpa biaya apapun.",
  },
  {
    question: "Bagaimana sistem pembayaran di Kerjoo!?",
    answer:
      "Kami menggunakan sistem escrow yang aman. Pembayaran dari klien ditahan hingga pekerjaan selesai dan disetujui. Setelah itu, dana akan masuk ke wallet Anda dan dapat ditarik ke rekening bank.",
  },
  {
    question: "Berapa lama waktu yang dibutuhkan untuk AI Skill Assessment?",
    answer:
      "AI Skill Assessment biasanya memakan waktu 30-45 menit, tergantung pada kategori skill yang dipilih. Assessment mencakup tes teknis, soft skills, dan praktik langsung.",
  },
  {
    question: "Bisakah saya mengulang skill assessment?",
    answer:
      "Ya, Anda dapat mengulang assessment setelah 30 hari untuk melihat perkembangan skill Anda. Ini membantu meningkatkan peluang mendapatkan pekerjaan yang lebih baik.",
  },
  {
    question: "Bagaimana cara mencari dan melamar pekerjaan?",
    answer:
      "Gunakan fitur pencarian di halaman Jobs, filter berdasarkan kategori, lokasi, dan budget. AI akan merekomendasikan pekerjaan yang sesuai dengan skill Anda. Klik 'Lamar Sekarang' untuk mengirim proposal.",
  },
  {
    question: "Berapa banyak pekerjaan yang bisa saya lamar?",
    answer:
      "Anda dapat melamar pekerjaan tanpa batas! Tidak ada batasan jumlah aplikasi pekerjaan yang dapat Anda kirim.",
  },
  {
    question: "Apa itu Learning Modules dan bagaimana cara mengaksesnya?",
    answer:
      "Learning Modules adalah kursus singkat gratis yang dirancang untuk meningkatkan skill sesuai kebutuhan pasar. Akses melalui dashboard Anda, pilih kategori yang diminati, dan ikuti pembelajaran interaktif.",
  },
  {
    question: "Bagaimana cara membangun portfolio yang menarik?",
    answer:
      "Gunakan fitur Portfolio Builder untuk menampilkan 3 proyek terbaik Anda. Sertakan deskripsi detail, teknologi yang digunakan, dan feedback dari klien untuk meningkatkan kredibilitas.",
  },
  {
    question: "Kapan saya bisa menarik penghasilan dari wallet?",
    answer:
      "Anda dapat menarik penghasilan setelah pekerjaan selesai dan melewati periode review 3-7 hari kerja. Minimum withdrawal adalah Rp 100.000 dengan berbagai metode pembayaran tersedia.",
  },
  {
    question: "Apa saja metode pembayaran yang didukung?",
    answer:
      "Kami mendukung transfer bank lokal (BCA, Mandiri, BRI, BNI), e-wallet (GoPay, OVO, DANA, LinkAja), dan berbagai metode pembayaran digital lainnya melalui integrasi Midtrans.",
  },
  {
    question: "Bagaimana sistem rating dan review bekerja?",
    answer:
      "Setelah menyelesaikan pekerjaan, klien akan memberikan rating 1-5 bintang dan review. Rating tinggi meningkatkan peluang mendapatkan pekerjaan lebih baik dan akses ke proyek premium.",
  },
  {
    question: "Apakah data saya aman di Kerjoo!?",
    answer:
      "Ya, kami menggunakan enkripsi AES-256, autentikasi multi-faktor, dan mematuhi standar keamanan ISO 27001. Data Anda dilindungi dengan standar keamanan tingkat enterprise.",
  },
  {
    question: "Bagaimana cara menghubungi customer support?",
    answer:
      "Anda dapat menghubungi kami melalui email support@kerjoo.com, telepon +62 21 1234 5678, atau live chat di dashboard. Tim support tersedia 24/7 untuk membantu Anda.",
  },
  {
    question: "Bisakah perusahaan mencari talent secara spesifik?",
    answer:
      "Ya, perusahaan dapat menggunakan fitur Talent Pool dengan filter advanced berdasarkan skill, rating, lokasi, dan pengalaman. AI akan merekomendasikan kandidat terbaik untuk setiap proyek.",
  },
  {
    question: "Bagaimana cara melaporkan masalah atau bug?",
    answer:
      "Laporkan masalah melalui fitur 'Report Issue' di dashboard, email ke support@kerjoo.com, atau hubungi customer support. Kami akan merespons dalam 24 jam.",
  },
]

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (index: number) => {
    const itemId = index.toString()
    setOpenItems((prev) => (prev.includes(itemId) ? prev.filter((item) => item !== itemId) : [...prev, itemId]))
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Frequently Asked Questions
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pertanyaan yang <span className="text-primary">Sering Diajukan</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Temukan jawaban untuk pertanyaan umum tentang Kerjoo! dan cara menggunakan platform kami
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-12">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Cari pertanyaan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <Card key={index}>
                <Collapsible>
                  <CollapsibleTrigger
                    onClick={() => toggleItem(index)}
                    className="flex items-center justify-between w-full p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-medium text-lg pr-4">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform flex-shrink-0 ${
                        openItems.includes(index.toString()) ? "rotate-180" : ""
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="pt-0 pb-6">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
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
            <h3 className="text-xl font-semibold mb-2">Tidak menemukan jawaban yang Anda cari?</h3>
            <p className="text-muted-foreground mb-4">Tim support kami siap membantu Anda dengan pertanyaan spesifik</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@kerjoo.com"
                className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Email Support
              </a>
              <a
                href="/contact"
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
