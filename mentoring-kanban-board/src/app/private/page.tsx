import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function PrivatePage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <main className="max-w-6xl mx-auto">
      <h1>Hello, {data.user.email}</h1>
    </main>
  );
}
