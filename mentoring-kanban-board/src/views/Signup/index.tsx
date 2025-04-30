"use client";

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";

export default function SignupView() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data: { email: string; password: string }) => {
    setLoading(true);
    const { email, password } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:3000/auth/confirm",
      },
    });

    if (error) {
      toast.error("Signup failed: " + error.message);
    } else {
      toast.success("Check your email to confirm your signup.");
      router.push("/login");
    }

    setLoading(false);
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <AuthForm onSubmit={handleSignup} loading={loading} buttonLabel="Sign Up" />
    </>
  );
}
