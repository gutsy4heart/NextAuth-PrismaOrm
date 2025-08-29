import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      fullName?: string | null
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    fullName?: string | null
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    fullName?: string | null
  }
}

declare module "next-auth/react" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      fullName?: string | null
    }
  }
}
