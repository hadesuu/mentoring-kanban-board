import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href="/login">Go to Login Page</Link>
    </div>
  );
}