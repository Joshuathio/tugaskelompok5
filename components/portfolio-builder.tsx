"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Plus, Edit, Trash2, Eye, Award, MessageSquare, ThumbsUp, ExternalLink } from "lucide-react"

interface Project {
  id: string
  title: string
  description: string
  category: string
  client: string
  rating: number
  feedback: string
  skills: string[]
  imageUrl: string
  completedDate: string
  budget: string
  status: "featured" | "active" | "archived"
}

interface Endorsement {
  id: string
  skill: string
  endorser: string
  company: string
  message: string
  date: string
}

export function PortfolioBuilder() {
  const [activeTab, setActiveTab] = useState("portfolio")
  const [isEditing, setIsEditing] = useState(false)

  const [projects] = useState<Project[]>([
    {
      id: "1",
      title: "E-commerce Website Redesign",
      description:
        "Complete redesign of an online fashion store with modern UI/UX principles, mobile-first approach, and improved conversion rates.",
      category: "Web Development",
      client: "Fashion Forward Co.",
      rating: 5,
      feedback:
        "Exceptional work! The new design increased our conversion rate by 35%. Highly professional and delivered on time.",
      skills: ["React", "Next.js", "Tailwind CSS", "UI/UX Design"],
      imageUrl: "/modern-ecommerce-website.png",
      completedDate: "2024-01-15",
      budget: "Rp 15,000,000",
      status: "featured",
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      description:
        "Designed a complete mobile application interface for a food delivery service with intuitive navigation and engaging visuals.",
      category: "UI/UX Design",
      client: "FoodieGo Indonesia",
      rating: 5,
      feedback:
        "Amazing design work! The app interface is intuitive and our users love the new look. Great attention to detail.",
      skills: ["Figma", "Mobile Design", "Prototyping", "User Research"],
      imageUrl: "/mobile-food-delivery-app.png",
      completedDate: "2024-02-20",
      budget: "Rp 8,500,000",
      status: "featured",
    },
    {
      id: "3",
      title: "Content Marketing Campaign",
      description:
        "Developed and executed a 3-month content marketing strategy for a tech startup, including blog posts, social media, and email campaigns.",
      category: "Digital Marketing",
      client: "TechStart Solutions",
      rating: 4,
      feedback:
        "Great content strategy that helped us increase our online presence. Professional approach and good results.",
      skills: ["Content Strategy", "SEO", "Social Media", "Email Marketing"],
      imageUrl: "/digital-marketing-campaign-graphics.jpg",
      completedDate: "2024-03-10",
      budget: "Rp 12,000,000",
      status: "active",
    },
  ])

  const [endorsements] = useState<Endorsement[]>([
    {
      id: "1",
      skill: "React Development",
      endorser: "Sarah Johnson",
      company: "Tech Innovations Ltd.",
      message: "Andi has excellent React skills and delivered high-quality components for our project.",
      date: "2024-01-20",
    },
    {
      id: "2",
      skill: "UI/UX Design",
      endorser: "Michael Chen",
      company: "Design Studio Pro",
      message: "Outstanding design sense and user experience expertise. Highly recommended!",
      date: "2024-02-15",
    },
    {
      id: "3",
      skill: "Project Management",
      endorser: "Lisa Rodriguez",
      company: "Global Solutions Inc.",
      message: "Excellent project management skills and always delivers on time.",
      date: "2024-03-05",
    },
  ])

  const featuredProjects = projects.filter((p) => p.status === "featured")
  const averageRating = projects.reduce((acc, p) => acc + p.rating, 0) / projects.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Portfolio & Feedback</h1>
              <p className="text-muted-foreground mt-2">Showcase your best work and manage client feedback</p>
            </div>
            <Button onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Save Changes" : "Edit Portfolio"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="endorsements">Endorsements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-2xl font-bold">{projects.length}</p>
                      <p className="text-sm text-muted-foreground">Total Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                      <p className="text-sm text-muted-foreground">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <ThumbsUp className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold">{featuredProjects.length}</p>
                      <p className="text-sm text-muted-foreground">Featured Projects</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold">{endorsements.length}</p>
                      <p className="text-sm text-muted-foreground">Endorsements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">Featured Projects</h2>
                {isEditing && (
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={project.imageUrl || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      {isEditing && (
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <Button size="sm" variant="secondary">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                      <Badge className="absolute top-2 left-2" variant="secondary">
                        {project.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium">{project.client}</span>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < project.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">{project.budget}</span>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* All Projects */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">All Projects</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <Badge variant={project.status === "featured" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{project.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span>Client: {project.client}</span>
                            <span>•</span>
                            <span>Completed: {new Date(project.completedDate).toLocaleDateString()}</span>
                            <span>•</span>
                            <span className="font-semibold text-primary">{project.budget}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < project.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          {isEditing && (
                            <div className="flex space-x-1">
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < project.rating ? "text-yellow-500 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardDescription>by {project.client}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground italic">"{project.feedback}"</blockquote>
                    <div className="flex flex-wrap gap-1 mt-4">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Endorsements Tab */}
          <TabsContent value="endorsements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {endorsements.map((endorsement) => (
                <Card key={endorsement.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{endorsement.skill}</CardTitle>
                      <Badge variant="outline">{endorsement.company}</Badge>
                    </div>
                    <CardDescription>
                      Endorsed by {endorsement.endorser} • {new Date(endorsement.date).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <blockquote className="text-muted-foreground italic">"{endorsement.message}"</blockquote>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <p className="text-sm text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Project Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">23</div>
                  <p className="text-sm text-muted-foreground">+5 new this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Response Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">94%</div>
                  <p className="text-sm text-muted-foreground">Above average</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Skills Performance</CardTitle>
                <CardDescription>How your skills are performing in the market</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["React", "UI/UX Design", "Next.js", "Content Strategy", "Figma"].map((skill, index) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="font-medium">{skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${85 - index * 10}%` }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{85 - index * 10}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
