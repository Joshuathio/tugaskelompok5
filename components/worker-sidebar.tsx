"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  User,
  Briefcase,
  TrendingUp,
  BookOpen,
  Wallet,
  Settings,
  LogOut,
  Zap,
  Bell,
  Search,
  MessageSquare,
  Bookmark,
} from "lucide-react"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard/worker", icon: LayoutDashboard },
  { name: "Cari Kerja", href: "/dashboard/worker/jobs", icon: Search },
  { name: "Pekerjaan Tersimpan", href: "/dashboard/worker/saved-jobs", icon: Bookmark },
  { name: "Profil", href: "/dashboard/worker/profile", icon: User },
  { name: "Proyek", href: "/dashboard/worker/projects", icon: Briefcase },
  { name: "Messages", href: "/dashboard/worker/messages", icon: MessageSquare },
  { name: "Skills", href: "/dashboard/worker/skills", icon: TrendingUp },
  { name: "Belajar", href: "/dashboard/worker/learning", icon: BookOpen },
  { name: "Dompet", href: "/dashboard/worker/wallet", icon: Wallet },
  { name: "Penghasilan", href: "/dashboard/worker/earnings", icon: TrendingUp },
  { name: "Pengaturan", href: "/dashboard/worker/settings", icon: Settings },
]

export function WorkerSidebar() {
  const pathname = usePathname()
  const [notifications] = useState(3)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    window.location.href = "/"
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center gap-2 p-6 border-b border-border">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Kerjoo!</span>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/worker/profile" className="cursor-pointer">
              <Avatar>
                <AvatarImage src="/professional-indonesian-man.jpg" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Ahmad Rizki</p>
              <p className="text-xs text-muted-foreground">Intermediate Level</p>
            </div>
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/dashboard/worker/notifications">
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent",
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground hover:text-foreground"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Keluar
          </Button>
        </div>
      </div>
    </div>
  )
}
