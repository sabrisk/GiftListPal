import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),

	providers: [
		Resend({
			apiKey: process.env.AUTH_RESEND_KEY!,
			from: "noreply@mail.giftlistpal.com",

			sendVerificationRequest: async ({ identifier, url, provider }) => {
				const { host } = new URL(url);

				const emailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #0068ff">Sign in to GiftListPal</h2>
            <p>Click the button below to sign in:</p>

            <a href="${url}"
              style="
                display:inline-block;
                padding: 12px 20px;
                background: #0068ff;
                color: white;
                text-decoration: none;
                border-radius: 6px;
                font-weight: bold;
              ">
              Sign in
            </a>

            <p style="margin-top: 20px; color: #666;">
              If you did not request this email, you can safely ignore it.
            </p>
          </div>
        `;

				const emailText = `Sign in to ${host}\n${url}`;

				await fetch("https://api.resend.com/emails", {
					method: "POST",
					headers: {
						Authorization: `Bearer ${provider.apiKey}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						from: provider.from,
						to: identifier,
						subject: `Sign in to ${host}`,
						html: emailHtml,
						text: emailText,
					}),
				});
			},
		}),
	],
	pages: {
		verifyRequest: "/auth/verify",
	},
	session: { strategy: "database" },

	callbacks: {
		async session({ session, user }) {
			if (session.user) {
				session.user.id = user.id;
				session.user.name = user.name;
			}
			return session;
		},
	},
});
