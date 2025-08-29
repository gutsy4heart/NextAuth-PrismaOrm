"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from "react"

interface LoginCredentials {
  email: string
  password: string
}

interface RegisterCredentials {
  name: string
  fullName: string
  email: string
  password: string
}

export function useAuth() {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Неверный email или пароль")
        return false
      }

      return true
    } catch (error) {
      setError("Произошла ошибка при входе")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (credentials: RegisterCredentials) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Ошибка при регистрации")
        return false
      }

      // Автоматически входим после успешной регистрации
      await login({
        email: credentials.email,
        password: credentials.password,
      })

      return true
    } catch (error) {
      setError("Произошла ошибка при регистрации")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" })
  }

  return {
    session,
    status,
    isLoading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!session,
    user: session?.user,
  }
}
