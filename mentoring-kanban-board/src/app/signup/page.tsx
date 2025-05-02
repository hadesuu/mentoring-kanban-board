import { supabase } from "@/utils/supabase/client";
import SignupView from "@/views/Signup";
import { redirect } from "next/navigation";

export default async function SignupPage() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/private");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 max-w-6xl mx-auto">
      <SignupView />
    </main>
  );
}
