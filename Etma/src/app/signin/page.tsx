"use client"

import { useState } from "react"
import LoginForm from "@/components/auth/login-form"
import RegisterForm from "@/components/auth/register-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignInPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Добро пожаловать</h1>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Войдите в свой аккаунт" : "Создайте новый аккаунт"}
          </p>
        </div>

        {isLogin ? <LoginForm /> : <RegisterForm />}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Нет аккаунта?</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Создайте новый аккаунт для доступа к системе"
                : "У вас уже есть аккаунт? Войдите в систему"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
