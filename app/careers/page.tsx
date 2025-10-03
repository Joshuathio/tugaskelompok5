import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Users, Briefcase } from "lucide-react"

const jobs = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Jakarta / Remote",
    type: "Full-time",
    description:
      "Join our engineering team to build the next generation of our platform using React, TypeScript, and modern web technologies.",
    requirements: [
      "5+ years React experience",
      "TypeScript proficiency",
      "Experience with Next.js",
      "Strong problem-solving skills",
    ],
  },
  {
    title: "Product Manager",
    department: "Product",
    location: "Jakarta",
    type: "Full-time",
    description:
      "Lead product strategy and roadmap for our AI-powered matching system and user experience improvements.",
    requirements: [
      "3+ years product management",
      "Experience with AI/ML products",
      "Strong analytical skills",
      "User-centric mindset",
    ],
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Jakarta / Remote",
    type: "Full-time",
    description: "Design intuitive and beautiful user experiences for both workers and companies on our platform.",
    requirements: [
      "4+ years UI/UX design",
      "Figma expertise",
      "Design system experience",
      "Portfolio of web applications",
    ],
  },
  {
    title: "Data Scientist",
    department: "AI/ML",
    location: "Jakarta",
    type: "Full-time",
    description:
      "Develop and improve our AI algorithms for skill assessment, job matching, and recommendation systems.",
    requirements: [
      "PhD/Masters in relevant field",
      "Python/R proficiency",
      "Machine learning expertise",
      "Experience with NLP",
    ],
  },
  {
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Jakarta",
    type: "Full-time",
    description:
      "Ensure our enterprise clients achieve success with our platform and drive customer satisfaction and retention.",
    requirements: [
      "3+ years customer success",
      "B2B SaaS experience",
      "Excellent communication",
      "Problem-solving skills",
    ],
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    location: "Jakarta / Remote",
    type: "Full-time",
    description:
      "Build and maintain our cloud infrastructure, CI/CD pipelines, and ensure platform reliability and scalability.",
    requirements: ["AWS/GCP experience", "Kubernetes knowledge", "CI/CD expertise", "Infrastructure as Code"],
  },
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Bergabung dengan Tim
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Karir di <span className="text-primary">Kerjoo!</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bergabunglah dengan tim yang passionate dalam membangun masa depan kerja digital di Indonesia
            </p>
          </div>

          {/* Company Culture */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tim yang Solid</h3>
                <p className="text-muted-foreground">
                  Bekerja dengan tim yang saling mendukung dan berkomitmen pada kesuksesan bersama
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Pertumbuhan Karir</h3>
                <p className="text-muted-foreground">
                  Kesempatan untuk berkembang dengan training, mentoring, dan tantangan yang menarik
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Work-Life Balance</h3>
                <p className="text-muted-foreground">
                  Fleksibilitas kerja dengan remote options dan fokus pada produktivitas, bukan jam kerja
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Open Positions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Posisi Terbuka</h2>
            <div className="space-y-6">
              {jobs.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {job.department}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <Badge variant="secondary">{job.type}</Badge>
                        </div>
                      </div>
                      <Button className="mt-4 lg:mt-0">Apply Now</Button>
                    </div>

                    <p className="text-muted-foreground mb-4">{job.description}</p>

                    <div>
                      <h4 className="font-semibold mb-2">Requirements:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">Kenapa Bergabung dengan Kerjoo!?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">💰</div>
                  <div className="font-semibold mb-1">Kompensasi Kompetitif</div>
                  <div className="text-sm text-muted-foreground">
                    Gaji yang sesuai dengan industri plus equity options
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">🏥</div>
                  <div className="font-semibold mb-1">Asuransi Kesehatan</div>
                  <div className="text-sm text-muted-foreground">Coverage lengkap untuk karyawan dan keluarga</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">🏠</div>
                  <div className="font-semibold mb-1">Remote Friendly</div>
                  <div className="text-sm text-muted-foreground">Fleksibilitas kerja dari mana saja</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">📚</div>
                  <div className="font-semibold mb-1">Learning Budget</div>
                  <div className="text-sm text-muted-foreground">Budget untuk kursus dan konferensi</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Tidak menemukan posisi yang cocok?</h3>
            <p className="text-muted-foreground mb-6">
              Kirim CV Anda dan kami akan menghubungi ketika ada posisi yang sesuai
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:careers@kerjoo.com">Kirim CV Spontan</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
