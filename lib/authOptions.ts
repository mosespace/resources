import { Resend } from "resend";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import MagicLinkEmail from "@/email/magic-link";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as any,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as any,
    }),
    {
      id: "resend",
      type: "email",
      sendVerificationRequest: async (params: any) => {
        const resend = new Resend(process.env.RESEND_API_KEY as any);

        const { identifier: email, url, name } = params;
        // console.log(`Sending verification request email to: ${name}`);
        try {
          await resend.emails.send({
            from: "Resources Inc <email@mosespace.com>",
            to: [email],
            subject: `Confirm Your Email Address`,
            react: MagicLinkEmail({ url, name }),
          });

          // console.log(`Verification email sent successfully to: ${email}`);
        } catch (error) {
          // console.error(
          //   `Failed to send verification email to ${email}:`,
          //   error
          // );
          // throw new Error("Failed to send verification Email");
        }
      },
    } as any,
  ],

  callbacks: {
    async signIn({ email }) {
      if (email && email.verificationRequest === true) {
      } else {
        // console.log(
        //   "User signed in but email is not available or not verified yet"
        // );
      }
      return true;
    },
    async session({ token, session }) {
      if (token && session) {
        session.user = {
          token: token.accessToken,
          id: token.id,
          name: token.name,
          email: token.email,
          image: token.picture,
          role: token.role,
        } as {
          id: string;
          name?: string | null | undefined;
          email?: string | null | undefined;
          image?: string | null | undefined;
          token?: string | null | undefined;
          role?: string;
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      const email = token?.email || (user?.email ?? null);

      const dbUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user?.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
      };
    },
  },

  pages: {
    signIn: "/login",
  },

  adapter: PrismaAdapter(prisma) as any,

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXT_AUTH_SECRET as any,
};

export default authOptions;
