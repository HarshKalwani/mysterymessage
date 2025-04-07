'use client'
import { SessionProvider } from "next-auth/react"
import React, { children } from "react"
export default function AuthProviders({
  children,
}:{children : React.ReactNode}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}