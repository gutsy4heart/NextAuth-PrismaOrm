"use client"

import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Mail, Calendar } from "lucide-react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { user, logout, isAuthenticated, status } = useAuth()

  useEffect(() => {
    if (status === "loading") return
    if (!isAuthenticated) {
      redirect("/signin")
    }
  }, [isAuthenticated, status])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-lg">Загрузка...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Профиль пользователя</h1>
          <p className="mt-2 text-gray-600">Управление вашим аккаунтом</p>
        </div>

        <Card className="mb-6">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.image || ""} alt={user?.name || ""} />
                <AvatarFallback className="text-2xl">
                  {user?.fullName ? getInitials(user.fullName) : user?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-2xl">{user?.fullName || user?.name}</CardTitle>
            <CardDescription>Информация о пользователе</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Имя пользователя</p>
                <p className="text-sm text-gray-600">{user?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Дата регистрации</p>
                <p className="text-sm text-gray-600">
                  Информация недоступна
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={logout} 
            variant="outline" 
            className="flex items-center space-x-2 mx-auto"
          >
            <LogOut className="h-4 w-4" />
            <span>Выйти из системы</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
