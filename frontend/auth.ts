import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	// providers: [Resend],
	providers: [
		Resend({
			apiKey: process.env.AUTH_RESEND_KEY!,
			from: "noreply@mail.giftlistpal.com", // OR your sandbox domain, see note below
		}),
	],
	// Optional settings
	session: { strategy: "database" },
	callbacks: {
		async session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
			}
			return session;
		},
	},
	// pages: {
	// 	signIn: "/auth/signin",
	// },
});
