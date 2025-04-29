"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { supabase } from "@/utils/supabase/client"

// Validation schema using zod
const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters")
    .regex(/[A-Z]/, "Password must include at least one capital letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include a special character"),
})

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const { email, password } = data
    
    // Create user with Supabase auth
    const { user, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: 'http://localhost:3000/auth/confirm'
      },
    })
    
    if (authError) {
      // Handle error in sign up
      toast.error("Signup failed: " + authError.message, {
        description: <pre className="mt-2 w-[300px] rounded-md bg-red-500 p-4 text-white"><code>{JSON.stringify(authError, null, 2)}</code></pre>,
      })
      return
    }

    // Success message after signup
    toast.success("Signup submitted successfully! Please check your email to verify your account.", {
      description: <pre className="mt-2 w-[300px] rounded-md bg-slate-950 p-4 text-white"><code>{JSON.stringify(data, null, 2)}</code></pre>,
    })

    window.location.href = 'http://localhost:3000/'
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-6">Sign Up</h1>
      <div className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="********"
                        {...field}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-2 top-2.5 text-gray-500 hover:text-black"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Must be 10+ chars, with special characters and uppercase letter.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full">Sign Up</Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
