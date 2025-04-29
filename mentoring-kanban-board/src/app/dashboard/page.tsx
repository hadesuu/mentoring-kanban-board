// app/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    }

    checkSession()
  }, [router])

  if (loading) return <div>Loading...</div>

  return <div>Welcome to your dashboard!</div>
}
