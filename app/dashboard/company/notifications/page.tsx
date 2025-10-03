"use client"

import { useState } from "react"
import { CompanySidebar } from "@/components/company-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Briefcase, Users, MessageSquare, TrendingUp, Check, Trash2 } from "lucide-react"

export default function CompanyNotifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "application",
      title: "Aplikasi Baru",
      message: "Ahmad Rizki melamar untuk posisi Full Stack Developer",
      time: "5 menit yang lalu",
      read: false,
      icon: Users,
    },
    {
      id: 2,
      type: "message",
      title: "Pesan Baru",
      message: "Sari Dewi mengirim pesan tentang proyek UI/UX",
      time: "1 jam yang lalu",
      read: false,
      icon: MessageSquare,
    },
    {
      id: 3,
      type: "project",
      title: "Proyek Selesai",
      message: "Proyek E-commerce Website telah diselesaikan oleh Budi Santoso",
      time: "2 jam yang lalu",
      read: false,
      icon: Briefcase,
    },
    {
      id: 4,
      type: "milestone",
      title: "Milestone Tercapai",
      message: "Perusahaan Anda telah menyelesaikan 50 proyek!",
      time: "1 hari yang lalu",
      read: true,
      icon: TrendingUp,
    },
    {
      id: 5,
      type: "application",
      title: "Aplikasi Baru",
      message: "Rina Wijaya melamar untuk posisi Mobile Developer",
      time: "2 hari yang lalu",
      read: true,
      icon: Users,
    },
  ])

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen bg-background">
      <CompanySidebar />

      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                Notifikasi
              </h1>
              <p className="text-muted-foreground mt-1">
                {unreadCount > 0
                  ? `Anda memiliki ${unreadCount} notifikasi yang belum dibaca`
                  : "Semua notifikasi telah dibaca"}
              </p>
            </div>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline">
                <Check className="w-4 h-4 mr-2" />
                Tandai Semua Dibaca
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Bell className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Tidak ada notifikasi</p>
                </CardContent>
              </Card>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all duration-200 hover:shadow-md ${
                    !notification.read ? "border-primary/50 bg-primary/5" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          !notification.read ? "bg-primary/20" : "bg-accent"
                        }`}
                      >
                        <notification.icon
                          className={`w-5 h-5 ${!notification.read ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-foreground">{notification.title}</h3>
                              {!notification.read && <Badge variant="default">Baru</Badge>}
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => markAsRead(notification.id)}
                                title="Tandai dibaca"
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteNotification(notification.id)}
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
