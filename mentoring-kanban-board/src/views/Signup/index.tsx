"use client";

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupView() {
  const router = useRouter();
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
    <AuthForm
      onSubmit={handleSignup}
      loading={loading}
      buttonLabel="Sign Up"
      formTitle="Sign Up"
      formDescription="Please signup with email and password to continue"
      footer={
        <>
          Already have an account? <Link href="/login" className="text-blue-500">Log In</Link>
        </>
      }
    />
  );
}
