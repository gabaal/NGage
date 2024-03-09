import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export default function Nav() {
  const { userId } = auth();
  return (
    <div className="bg-gray-800">
      <header className="container mx-auto py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">NGage Social</h1>
          <nav className="flex space-x-4 text-white">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/posts" className="hover:text-gray-300">Posts</Link>
            <Link href="/profile/logged-in-profile" className="hover:text-gray-300">Profile</Link>
            {/* <Link href="/profile" className="hover:text-gray-300">Profiles</Link> */}
            {userId ? <UserButton/> : <SignInButton />}
          </nav>
        </div>
      </header>
    </div>
  );
}
