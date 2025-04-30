// app/providers.tsx
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/utils/supabase/client"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((event/*, session*/) => {
      if (event === "SIGNED_IN") {
        router.push("/dashboard")
      }
      if (event === "SIGNED_OUT") {
        router.push("/login")
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  return <>{children}</>
}
