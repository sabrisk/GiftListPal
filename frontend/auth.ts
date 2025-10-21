import NextAuth from "next-auth";
import Sendgrid from "next-auth/providers/sendgrid";

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Sendgrid],
});
