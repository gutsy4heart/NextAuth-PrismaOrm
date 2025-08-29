import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  fullName: z.string().min(2, "Полное имя должно содержать минимум 2 символа"),
  email: z.string().email("Неверный формат email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, fullName, email, password } = userSchema.parse(body)

    // Проверяем, существует ли пользователь с таким email
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 400 }
      )
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12)

    // Создаем нового пользователя
    const user = await prisma.user.create({
      data: {
        name,
        fullName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        fullName: true,
        email: true,
        createdAt: true,
      }
    })

    return NextResponse.json(
      { 
        message: "Пользователь успешно создан",
        user 
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ошибка валидации", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Ошибка при создании пользователя:", error)
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    )
  }
}
