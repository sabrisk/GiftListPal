import dotenv from "dotenv";
dotenv.config();
import { test, expect } from "@playwright/test";
import MailSlurp from "mailslurp-client";

const mailslurp = new MailSlurp({ apiKey: process.env.MAILSLURP_API_KEY! });

test("has title", async ({ page }) => {
	await page.goto("/");

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/GiftListPal/);
});

test("Log in button", async ({ page }) => {
	await page.goto("/");

	// Click the get started link.
	await page.getByRole("button", { name: "Log In" }).click();

	// Expects page to have a heading with the name of Installation.
	await expect(
		page.getByRole("heading", {
			name: "Sign in to continue to the Event Dashboard",
		})
	).toBeVisible();
});

test("magic link login", async ({ browser }) => {
	// Uncomment this line for the first run to create a new inbox
	// const inbox = await mailslurp.createInbox();

	//Open the newly created inbox in mailslurp and paste the email address and inbox ID below
	const playwrightUserInboxEmail = process.env.MAILSLURP_INBOX_EMAIL!;

	const playwrightUserInboxId = process.env.MAILSLURP_INBOX_ID!;

	const emails = await mailslurp.getEmails(playwrightUserInboxId);

	for (const email of emails) {
		await mailslurp.deleteEmail(email.id);
	}

	const signupPage = await browser.newPage();
	await signupPage.goto("/signup");
	await signupPage.fill('input[name="email"]', playwrightUserInboxEmail);
	await signupPage.getByRole("button", { name: "Continue" }).click();

	// 3. Wait for the magic link email (short timeout is fine in dev)
	const email = await mailslurp.waitForLatestEmail(
		playwrightUserInboxId,
		30000
	);
	console.log("Received email:", email.subject);

	// 4. Extract the magic link
	const match = email.body?.match(/https?:\/\/[^\s"]+/);
	if (!match) throw new Error("Magic link not found in email");
	const magicLink = match[0];
	console.log("Magic link found:", magicLink);

	// 5. Open a new page (new tab) to navigate to the magic link
	const magicLinkPage = await browser.newPage();
	await magicLinkPage.goto(magicLink);

	// 6. Wait for the login to complete and verify
	await expect(
		magicLinkPage.getByRole("button", { name: /Sign Out/i })
	).toBeVisible({ timeout: 15000 });

	// Uncomment below to complete profile setup if this is the first run
	// const profileSetupPage = magicLinkPage;
	// await profileSetupPage.fill('input[name="name"]', "Playwright User");
	// await profileSetupPage.getByRole("button", { name: "Continue" }).click();
	// await profileSetupPage.waitForURL("/events");

	// Change this to profileSetupPage instead of magicLinkPage if first run.
	const eventsPage = magicLinkPage;
	await eventsPage.getByRole("link", { name: "Add Event" }).click();
	await eventsPage.waitForURL("/events/new");

	const newEventPage = eventsPage;
	await newEventPage.fill('input[name="name"]', "Birthday Party");
	await newEventPage.fill('input[name="date"]', "2028-12-31");
	await newEventPage.fill(
		'textarea[name="description"]',
		"End of Year Celebration"
	);
	await newEventPage.getByRole("button", { name: "Add Event" }).click();
	await newEventPage.waitForURL("/events");

	const eventsPageWithFirstUser = newEventPage;
	await expect(
		eventsPageWithFirstUser.getByText("Birthday Party")
	).toBeVisible();

	await eventsPageWithFirstUser.pause();
});
