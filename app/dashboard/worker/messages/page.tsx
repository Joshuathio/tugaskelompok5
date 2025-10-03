"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { WorkerSidebar } from "@/components/worker-sidebar"
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from "lucide-react"

const initialConversations = [
  {
    id: 1,
    name: "PT Digital Nusantara",
    avatar: "/placeholder.svg?key=company1",
    lastMessage: "Terima kasih untuk progress update. Mockup sudah terlihat bagus!",
    timestamp: "5 menit lalu",
    unread: 1,
    online: true,
    project: "E-commerce Platform",
  },
  {
    id: 2,
    name: "CV Maju Bersama",
    avatar: "/placeholder.svg?key=company2",
    lastMessage: "Bisa kita schedule meeting untuk discuss next milestone?",
    timestamp: "1 jam lalu",
    unread: 0,
    online: true,
    project: "Mobile Banking App",
  },
  {
    id: 3,
    name: "Startup TechCorp",
    avatar: "/placeholder.svg?key=company3",
    lastMessage: "Payment untuk milestone pertama sudah diproses.",
    timestamp: "2 jam lalu",
    unread: 2,
    online: false,
    project: "Data Analytics Dashboard",
  },
  {
    id: 4,
    name: "CV Digital Solutions",
    avatar: "/placeholder.svg?key=company4",
    lastMessage: "Dokumentasi API sudah saya kirim via email.",
    timestamp: "1 hari lalu",
    unread: 0,
    online: false,
    project: "Corporate Website",
  },
]

const initialMessagesData: { [key: number]: any[] } = {
  1: [
    {
      id: 1,
      sender: "PT Digital Nusantara",
      message: "Halo Ahmad, bagaimana progress untuk mockup halaman utama?",
      timestamp: "14:30",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      message: "Halo! Mockup sudah 90% selesai. Saya sedang finalisasi beberapa detail di section hero.",
      timestamp: "14:32",
      isOwn: true,
    },
    {
      id: 3,
      sender: "You",
      message: "Estimasi akan selesai dalam 2 jam lagi. Bisa saya kirim untuk review?",
      timestamp: "14:32",
      isOwn: true,
    },
    {
      id: 4,
      sender: "PT Digital Nusantara",
      message: "Perfect! Silakan kirim begitu sudah ready. Saya akan review dan berikan feedback.",
      timestamp: "14:35",
      isOwn: false,
    },
    {
      id: 5,
      sender: "PT Digital Nusantara",
      message: "Terima kasih untuk progress update. Mockup sudah terlihat bagus!",
      timestamp: "16:45",
      isOwn: false,
    },
  ],
  2: [
    {
      id: 1,
      sender: "CV Maju Bersama",
      message: "Bisa kita schedule meeting untuk discuss next milestone?",
      timestamp: "10:15",
      isOwn: false,
    },
  ],
  3: [
    {
      id: 1,
      sender: "Startup TechCorp",
      message: "Payment untuk milestone pertama sudah diproses.",
      timestamp: "09:30",
      isOwn: false,
    },
  ],
  4: [
    {
      id: 1,
      sender: "CV Digital Solutions",
      message: "Dokumentasi API sudah saya kirim via email.",
      timestamp: "08:00",
      isOwn: false,
    },
  ],
}

export default function WorkerMessages() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [conversations, setConversations] = useState(initialConversations)
  const [selectedConversation, setSelectedConversation] = useState(initialConversations[0])
  const [messages, setMessages] = useState<{ [key: number]: any[] }>(initialMessagesData)
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, selectedConversation])

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const currentTime = new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })

      const newMsg = {
        id: (messages[selectedConversation.id]?.length || 0) + 1,
        sender: "You",
        message: newMessage.trim(),
        timestamp: currentTime,
        isOwn: true,
      }

      // Update messages for the selected conversation
      setMessages((prev) => ({
        ...prev,
        [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg],
      }))

      // Update last message in conversations list
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation.id
            ? { ...conv, lastMessage: newMessage.trim(), timestamp: "Baru saja" }
            : conv,
        ),
      )

      setNewMessage("")
    }
  }

  const handleSelectConversation = (conversation: any) => {
    setSelectedConversation(conversation)
    // Mark conversation as read
    setConversations((prev) => prev.map((conv) => (conv.id === conversation.id ? { ...conv, unread: 0 } : conv)))
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.project.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const currentMessages = messages[selectedConversation.id] || []

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-background">
      <WorkerSidebar />

      <main className="flex-1 ml-64">
        <div className="flex h-screen">
          {/* Conversations List */}
          <div className="w-80 border-r border-border bg-card">
            <div className="p-4 border-b border-border">
              <h1 className="text-xl font-bold mb-4">Messages</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Cari konversasi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-140px)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b border-border cursor-pointer hover:bg-accent transition-colors ${
                    selectedConversation.id === conversation.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleSelectConversation(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          {conversation.unread > 0 && (
                            <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">{conversation.lastMessage}</p>
                      <Badge variant="outline" className="text-xs mt-2">
                        {conversation.project}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium">{selectedConversation.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.online ? "Online" : "Offline"} • {selectedConversation.project}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {currentMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm">{message.message}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Ketik pesan..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
