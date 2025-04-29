"use client"

import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase/client'

export default function VerifyPage() {
  const [status, setStatus] = useState("Verifying your email...")

  useEffect(() => {
    const verifyEmail = async () => {
      const urlParams = new URLSearchParams(window.location.search)
      const token = urlParams.get('token')

      if (!token) {
        setStatus("Token is missing from the URL.")
        return
      }

      try {
        // You should verify the email using the token
        const { error } = await supabase.auth.api.verifyEmail(token)

        if (error) {
          setStatus("Verification failed!")
          console.error("Verification failed:", error)
        } else {
          setStatus("Email verified successfully!")
        }
      } catch (error) {
        setStatus("An unexpected error occurred.")
        console.error("Error during verification:", error)
      }
    }

    verifyEmail()
  }, [])

  return <p>{status}</p>
}
