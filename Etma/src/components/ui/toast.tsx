"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  type?: "success" | "error" | "info"
  isVisible: boolean
  onClose: () => void
}

export function Toast({ message, type = "success", isVisible, onClose }: ToastProps) {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const toastStyles = {
    success: "bg-green-600 text-white border-green-700",
    error: "bg-red-600 text-white border-red-700",
    info: "bg-blue-600 text-white border-blue-700"
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={cn(
          "px-4 py-3 rounded-lg shadow-lg border transition-all duration-300",
          toastStyles[type]
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-2 text-white/80 hover:text-white transition-colors"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
