import NextAuth, { type DefaultSession, type User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db as prisma } from "@/server/db";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new Error("Email and password must be provided");
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, role: true, password: true },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id, name: user.email, email: user.email, role: user.role } as NextAuthUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
