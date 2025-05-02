"use client";

import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/utils/supabase/client";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginView() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = async (data: { email: string; password: string }) => {
    setLoading(true);
    const { email, password } = data;

    const { data: ddddd, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log(ddddd);

    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Check your email to confirm your signup.");
      router.push("/private");
    }

    setLoading(false);
  };

  return (
    <AuthForm
      onSubmit={handleSignup}
      loading={loading}
      buttonLabel="Log in"
      formTitle="Log in"
      formDescription="Please login to continue"
      footer={
        <>
          {"Don't"} have an account?{" "}
          <Link href="/signup" className=" text-blue-500">
            Sign Up
          </Link>
        </>
      }
    />
  );
}
