"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CompanySidebar } from "@/components/company-sidebar"
import { Sparkles, Star, TrendingUp, Users, Zap, Brain } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const aiRecommendations = [
  {
    id: 1,
    type: "talent",
    title: "Perfect Match for Mobile App Project",
    description: "Based on your project requirements, we found 3 developers with 95% skill match",
    confidence: 95,
    action: "View Candidates",
    priority: "high",
    candidates: [
      { name: "Ahmad Rizki", avatar: "/professional-indonesian-man.jpg", match: 98 },
      { name: "Sari Dewi", avatar: "/professional-indonesian-woman.jpg", match: 94 },
      { name: "Budi Santoso", avatar: "/professional-indonesian-man-developer.jpg", match: 92 },
    ],
  },
  {
    id: 2,
    type: "project",
    title: "Optimize Project Timeline",
    description: "AI suggests breaking down your e-commerce project into 3 phases to improve delivery time by 25%",
    confidence: 88,
    action: "View Optimization",
    priority: "medium",
    savings: "25% faster delivery",
  },
  {
    id: 3,
    type: "budget",
    title: "Budget Optimization Opportunity",
    description: "Similar projects completed 15% under budget by adjusting scope and timeline",
    confidence: 82,
    action: "View Analysis",
    priority: "low",
    savings: "Rp 7,500,000 potential savings",
  },
  {
    id: 4,
    type: "skill",
    title: "Trending Skills Alert",
    description: "React Native and Flutter developers are in high demand. Consider upskilling your team",
    confidence: 90,
    action: "View Training",
    priority: "medium",
    trend: "📈 +35% demand",
  },
]

const insights = [
  {
    title: "Project Success Rate",
    value: "94%",
    change: "+8%",
    description: "Projects completed on time with AI recommendations",
  },
  {
    title: "Cost Savings",
    value: "Rp 45M",
    change: "+12%",
    description: "Total savings from AI optimizations this year",
  },
  {
    title: "Talent Match Rate",
    value: "89%",
    change: "+15%",
    description: "Average skill match for recommended candidates",
  },
  {
    title: "Time Efficiency",
    value: "32%",
    change: "+5%",
    description: "Faster project completion with AI insights",
  },
]

export default function CompanyRecommendations() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("kerjoo_user")
    const authStatus = localStorage.getItem("kerjoo_auth")

    if (!userData || !authStatus || authStatus !== "true") {
      router.push("/login")
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } catch (error) {
      console.error("Error parsing user data:", error)
      router.push("/login")
    }
  }, [router])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "talent":
        return <Users className="w-5 h-5" />
      case "project":
        return <TrendingUp className="w-5 h-5" />
      case "budget":
        return <Zap className="w-5 h-5" />
      case "skill":
        return <Brain className="w-5 h-5" />
      default:
        return <Sparkles className="w-5 h-5" />
    }
  }

  const handleViewCandidates = (recommendationId: number) => {
    router.push(`/dashboard/company/talent?recommendation=${recommendationId}`)
  }

  const handleViewOptimization = (recommendationId: number) => {
    router.push(`/dashboard/company/projects?optimization=${recommendationId}`)
  }

  const handleViewAnalysis = (recommendationId: number) => {
    router.push(`/dashboard/company/analytics?analysis=${recommendationId}`)
  }

  const handleViewTraining = (recommendationId: number) => {
    router.push(`/dashboard/company/training?skill=${recommendationId}`)
  }

  const handleGenerateInsights = async () => {
    setIsGenerating(true)
    toast({
      title: "Generating AI Insights",
      description: "Analyzing your project data...",
    })

    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "New Insights Generated",
        description: "AI has analyzed your data and generated new recommendations.",
      })
      // Refresh the page to show new recommendations
      router.refresh()
    }, 3000)
  }

  const getActionHandler = (action: string, id: number) => {
    switch (action) {
      case "View Candidates":
        return () => handleViewCandidates(id)
      case "View Optimization":
        return () => handleViewOptimization(id)
      case "View Analysis":
        return () => handleViewAnalysis(id)
      case "View Training":
        return () => handleViewTraining(id)
      default:
        return () => {}
    }
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary" />
                AI Recommendations
              </h1>
              <p className="text-muted-foreground">Insights dan rekomendasi cerdas untuk mengoptimalkan proyek Anda</p>
            </div>
            <Button onClick={handleGenerateInsights} disabled={isGenerating}>
              <Brain className="w-4 h-4 mr-2" />
              {isGenerating ? "Generating..." : "Generate New Insights"}
            </Button>
          </div>

          {/* AI Insights Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {insights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{insight.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{insight.change}</span> {insight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* AI Recommendations */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Rekomendasi Terbaru</h2>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiRecommendations.map((recommendation) => (
                <Card key={recommendation.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">{getTypeIcon(recommendation.type)}</div>
                        <div>
                          <CardTitle className="text-lg">{recommendation.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getPriorityColor(recommendation.priority)}>
                              {recommendation.priority}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span>{recommendation.confidence}% confidence</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{recommendation.description}</p>

                    {/* Special content based on type */}
                    {recommendation.type === "talent" && recommendation.candidates && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Top Candidates:</h4>
                        <div className="flex gap-2">
                          {recommendation.candidates.map((candidate, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={candidate.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-xs font-medium">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground">{candidate.match}% match</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {recommendation.savings && (
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm font-medium text-green-800">💰 {recommendation.savings}</p>
                      </div>
                    )}

                    {recommendation.trend && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-800">{recommendation.trend}</p>
                      </div>
                    )}

                    <Button className="w-full" onClick={getActionHandler(recommendation.action, recommendation.id)}>
                      {recommendation.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* AI Learning Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Learning Progress
              </CardTitle>
              <CardDescription>
                AI terus belajar dari data proyek Anda untuk memberikan rekomendasi yang lebih akurat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <p className="text-sm text-muted-foreground">Data Points Analyzed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">89%</div>
                  <p className="text-sm text-muted-foreground">Prediction Accuracy</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">156</div>
                  <p className="text-sm text-muted-foreground">Successful Recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
