"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import  Button  from "@/components/ui/button";
import Image from "next/image";

export default function Navbar() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      {/* Navigasi */}
      <div className="flex space-x-4">
        <Link href="/dashboard" className="hover:underline">Dashboard</Link>
        <Link href="/dashboard/menu" className="hover:underline">Menu</Link>
        <Link href="/dashboard/user" className="hover:underline">User</Link>
        <Link href="/dashboard/order" className="hover:underline">Order</Link>
      </div>

      {/* Jika user belum login */}
      {!session ? (
        <Button onClick={() => signOut()} className="bg-red-500 text-white">Logout</Button>
      ) : (
        <div className="flex items-center space-x-4">
          {session.user.image ? (
            <Image src={session.user.image} alt="Profile" width={40} height={40} className="rounded-full" />
          ) : (
            <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-sm">
              {session.user.name?.charAt(0).toUpperCase() || ''}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold">{session.user.name}</p>
            <p className="text-xs text-gray-300">{session.user.email}</p>
            <p className="text-xs text-yellow-400">{session.user.role}</p>
          </div>
          <Button onClick={() => signOut()} className="bg-red-500 text-white">Logout</Button>
        </div>
      )}
    </nav>
  );
}
