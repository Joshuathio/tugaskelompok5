import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"

const blogPosts = [
  {
    title: "Masa Depan Kerja Digital di Indonesia: Tren dan Peluang 2024",
    excerpt:
      "Analisis mendalam tentang perkembangan ekonomi digital dan bagaimana pekerja mikro dapat memanfaatkan peluang yang ada.",
    author: "Tim Kerjoo!",
    date: "15 Januari 2024",
    category: "Industry Insights",
    readTime: "5 min read",
    image: "/blog-future-work.jpg",
  },
  {
    title: "Tips Membangun Portfolio yang Menarik untuk Freelancer",
    excerpt:
      "Panduan lengkap untuk membuat portfolio yang dapat menarik perhatian klien dan meningkatkan peluang mendapatkan proyek.",
    author: "Sarah Wijaya",
    date: "12 Januari 2024",
    category: "Career Tips",
    readTime: "7 min read",
    image: "/blog-portfolio-tips.jpg",
  },
  {
    title: "Bagaimana AI Mengubah Cara Kita Menilai Skill dan Talenta",
    excerpt: "Eksplorasi teknologi AI dalam skill assessment dan dampaknya terhadap proses rekrutmen modern.",
    author: "Dr. Ahmad Rizki",
    date: "10 Januari 2024",
    category: "Technology",
    readTime: "6 min read",
    image: "/blog-ai-skills.jpg",
  },
  {
    title: "Strategi Pricing untuk Freelancer: Menentukan Rate yang Tepat",
    excerpt:
      "Panduan praktis untuk menentukan harga jasa yang kompetitif namun tetap menguntungkan sebagai freelancer.",
    author: "Maya Sari",
    date: "8 Januari 2024",
    category: "Business Tips",
    readTime: "8 min read",
    image: "/blog-pricing-strategy.jpg",
  },
  {
    title: "Remote Work Best Practices: Produktivitas Maksimal dari Rumah",
    excerpt:
      "Tips dan trik untuk memaksimalkan produktivitas saat bekerja remote, termasuk setup workspace dan time management.",
    author: "Budi Santoso",
    date: "5 Januari 2024",
    category: "Productivity",
    readTime: "6 min read",
    image: "/blog-remote-work.jpg",
  },
  {
    title: "Membangun Personal Brand sebagai Digital Worker",
    excerpt:
      "Strategi membangun personal brand yang kuat di era digital untuk meningkatkan kredibilitas dan peluang karir.",
    author: "Lisa Chen",
    date: "3 Januari 2024",
    category: "Personal Development",
    readTime: "9 min read",
    image: "/blog-personal-brand.jpg",
  },
]

const categories = [
  "All",
  "Industry Insights",
  "Career Tips",
  "Technology",
  "Business Tips",
  "Productivity",
  "Personal Development",
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Blog & Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Insights & <span className="text-primary">Tips Karir</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Artikel, tips, dan insights terbaru tentang dunia kerja digital, freelancing, dan pengembangan karir
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="aspect-video lg:aspect-auto bg-muted">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <div className="text-4xl mb-2">📊</div>
                    <div>Featured Image</div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <Badge className="mb-4">{blogPosts[0].category}</Badge>
                <h2 className="text-2xl lg:text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{blogPosts[0].excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <div className="text-2xl mb-1">
                        {post.category === "Career Tips"
                          ? "💼"
                          : post.category === "Technology"
                            ? "🤖"
                            : post.category === "Business Tips"
                              ? "💰"
                              : post.category === "Productivity"
                                ? "⚡"
                                : "🚀"}
                      </div>
                      <div className="text-sm">Blog Image</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {post.category}
                  </Badge>
                  <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                  >
                    Baca Artikel
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-16">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Dapatkan Update Terbaru</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Subscribe newsletter kami untuk mendapatkan artikel terbaru, tips karir, dan insights industri langsung
                di inbox Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Masukkan email Anda"
                  className="flex-1 px-4 py-2 border border-input rounded-md bg-background"
                />
                <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                  Subscribe
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
