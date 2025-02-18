import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "MANAGER" | "KASIR";
  }

  interface Session {
    user: User;
  }
}
