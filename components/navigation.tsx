"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap, User, LogOut } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()

  const isDashboardPage = pathname?.startsWith("/dashboard/")

  useEffect(() => {
    const userData = sessionStorage.getItem("kerjoo_user") || localStorage.getItem("kerjoo_user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()
    setUser(null)
    setIsOpen(false)
    window.location.href = "/"
  }

  if (isDashboardPage) {
    return null
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Kerjoo!</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link
                  href={user.role === "company" ? "/dashboard/company" : "/dashboard/worker"}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href={user.role === "company" ? "/dashboard/company/talent" : "/dashboard/worker/jobs"}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {user.role === "company" ? "Talent Pool" : "Cari Kerja"}
                </Link>
                {user.role === "worker" && (
                  <Link
                    href="/dashboard/worker/earnings"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wallet
                  </Link>
                )}
              </>
            ) : (
              <>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fitur
                </Link>
                <Link href="/for-workers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Untuk Pekerja
                </Link>
                <Link href="/for-companies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Untuk Perusahaan
                </Link>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tentang
                </Link>
              </>
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.name || user.email}</span>
                </div>
                <Button variant="ghost" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Keluar
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Daftar Sekarang</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card border border-border rounded-lg mt-2">
              {user ? (
                <>
                  <Link
                    href={user.role === "company" ? "/dashboard/company" : "/dashboard/worker"}
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href={user.role === "company" ? "/dashboard/company/talent" : "/dashboard/worker/jobs"}
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {user.role === "company" ? "Talent Pool" : "Cari Kerja"}
                  </Link>
                  {user.role === "worker" && (
                    <Link
                      href="/dashboard/worker/earnings"
                      className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                      onClick={() => setIsOpen(false)}
                    >
                      Wallet
                    </Link>
                  )}
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <div className="px-3 py-2 text-sm text-muted-foreground">{user.name || user.email}</div>
                    <Button variant="ghost" onClick={handleLogout} className="justify-start">
                      <LogOut className="w-4 h-4 mr-2" />
                      Keluar
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/features"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Fitur
                  </Link>
                  <Link
                    href="/for-workers"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Untuk Pekerja
                  </Link>
                  <Link
                    href="/for-companies"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Untuk Perusahaan
                  </Link>
                  <Link
                    href="/about"
                    className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    Tentang
                  </Link>
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Button variant="ghost" asChild>
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        Masuk
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link href="/register" onClick={() => setIsOpen(false)}>
                        Daftar Sekarang
                      </Link>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
