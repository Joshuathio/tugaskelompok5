"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { WorkerSidebar } from "@/components/worker-sidebar"
import { DollarSign, TrendingUp, Calendar, Download, Eye, EyeOff, CreditCard } from "lucide-react"

const earningsData = [
  {
    id: 1,
    project: "E-commerce Website Development",
    client: "PT Maju Bersama",
    amount: "Rp 15,000,000",
    status: "paid",
    date: "2024-01-15",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 2,
    project: "Mobile App UI/UX Design",
    client: "Startup TechCorp",
    amount: "Rp 8,500,000",
    status: "pending",
    date: "2024-01-28",
    paymentMethod: "Bank Transfer",
  },
  {
    id: 3,
    project: "Website Maintenance",
    client: "CV Digital Solutions",
    amount: "Rp 3,200,000",
    status: "paid",
    date: "2024-01-10",
    paymentMethod: "E-wallet",
  },
  {
    id: 4,
    project: "Logo Design",
    client: "Toko Online ABC",
    amount: "Rp 1,500,000",
    status: "paid",
    date: "2024-01-05",
    paymentMethod: "Bank Transfer",
  },
]

const monthlyStats = [
  { month: "Jan 2024", earnings: "Rp 28,200,000", projects: 4 },
  { month: "Dec 2023", earnings: "Rp 22,500,000", projects: 3 },
  { month: "Nov 2023", earnings: "Rp 18,700,000", projects: 2 },
  { month: "Oct 2023", earnings: "Rp 25,300,000", projects: 5 },
]

export default function WorkerEarnings() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [showAmounts, setShowAmounts] = useState(true)

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Dibayar</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Menunggu</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Terlambat</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalEarnings = earningsData.reduce((sum, earning) => {
    const amount = Number.parseInt(earning.amount.replace(/[^\d]/g, ""))
    return sum + amount
  }, 0)

  const pendingEarnings = earningsData
    .filter((earning) => earning.status === "pending")
    .reduce((sum, earning) => {
      const amount = Number.parseInt(earning.amount.replace(/[^\d]/g, ""))
      return sum + amount
    }, 0)

  const handleExportReport = () => {
    const csvContent = [
      ["Project", "Client", "Amount", "Status", "Date", "Payment Method"],
      ...earningsData.map((earning) => [
        earning.project,
        earning.client,
        earning.amount,
        earning.status,
        earning.date,
        earning.paymentMethod,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `earnings_report_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const displayAmount = (amount: string) => {
    return showAmounts ? amount : "Rp ••••••"
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Penghasilan</h1>
              <p className="text-muted-foreground">Pantau pendapatan dan riwayat pembayaran Anda</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAmounts(!showAmounts)}>
                {showAmounts ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-2" />
                    Sembunyikan
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4 mr-2" />
                    Tampilkan
                  </>
                )}
              </Button>
              <Button onClick={handleExportReport}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Penghasilan</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {showAmounts ? `Rp ${totalEarnings.toLocaleString("id-ID")}` : "Rp ••••••"}
                </div>
                <p className="text-xs text-muted-foreground">+12% dari bulan lalu</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Menunggu Pembayaran</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {showAmounts ? `Rp ${pendingEarnings.toLocaleString("id-ID")}` : "Rp ••••••"}
                </div>
                <p className="text-xs text-muted-foreground">1 invoice pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Proyek Selesai</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Bulan ini: 4 proyek</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rata-rata per Proyek</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{showAmounts ? "Rp 7,050,000" : "Rp ••••••"}</div>
                <p className="text-xs text-muted-foreground">+5% dari rata-rata</p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terbaru</CardTitle>
              <CardDescription>Riwayat pembayaran dan invoice terbaru</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {earningsData.map((earning) => (
                  <div
                    key={earning.id}
                    className="flex items-center justify-between p-4 border-2 border-[#374151] rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{earning.project}</h4>
                      <p className="text-sm text-muted-foreground">{earning.client}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(earning.date).toLocaleDateString("id-ID")} • {earning.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">{displayAmount(earning.amount)}</div>
                        {getStatusBadge(earning.status)}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Breakdown Bulanan</CardTitle>
              <CardDescription>Penghasilan per bulan dalam 4 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border-2 border-[#374151] rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium">{stat.month}</h4>
                      <p className="text-sm text-muted-foreground">{stat.projects} proyek selesai</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-lg">{displayAmount(stat.earnings)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
