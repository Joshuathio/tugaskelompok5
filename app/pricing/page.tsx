"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Zap } from "lucide-react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Gratis Selamanya
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Platform <span className="text-primary">Gratis</span> untuk Semua
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nikmati semua fitur Kerjoo! tanpa biaya berlangganan
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {/* Free Plan */}
            <Card className="relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Kerjoo! Platform</CardTitle>
                <div className="text-4xl font-bold mt-4">Gratis</div>
                <p className="text-muted-foreground">Untuk semua pengguna</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Unlimited aplikasi pekerjaan</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>AI skill assessment</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Portfolio builder</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Job matching</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>Learning modules</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span>24/7 support</span>
                  </li>
                </ul>
                <Button className="w-full" asChild>
                  <Link href="/register">Mulai Sekarang</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Ada pertanyaan?</h3>
            <p className="text-muted-foreground mb-6">Tim kami siap membantu Anda</p>
            <Button variant="outline" asChild>
              <Link href="/contact">Hubungi Kami</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
