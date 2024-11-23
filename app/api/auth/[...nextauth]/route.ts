import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";

try {
  const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt",
    },
    pages: {
      signIn: "/login",
      signUp: "/signup",
    },
    providers: [
      CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid credentials");
          }

          try {
            const user = await prisma.user.findUnique({
              where: {
                email: credentials.email,
              },
            });

            if (!user || !user?.hashedPassword) {
              throw new Error("Invalid credentials");
            }

            const isCorrectPassword = await compare(
              credentials.password,
              user.hashedPassword
            );

            if (!isCorrectPassword) {
              throw new Error("Invalid credentials");
            }

            return {
              id: user.id,
              email: user.email,
              name: user.name,
            };
          } catch (error) {
            console.error("Authorization error:", error);
            throw new Error("An error occurred during authorization");
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          return {
            ...token,
            id: user.id,
          };
        }
        return token;
      },
      async session({ session, token }) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
          },
        };
      },
    },
  });

  export { handler as GET, handler as POST };
} catch (error) {
  console.error("NextAuth configuration error:", error);
  throw error;
}
