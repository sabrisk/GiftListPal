"use client";
export default function VerifyRequestPage() {
	return (
		<div className="flex flex-col items-center justify-center py-20">
			<h1 className="text-3xl font-bold mb-6">Check your email</h1>

			<p className="text-lg text-center max-w-md">
				We just sent you a magic sign-in link. Open your inbox and click
				the link to continue.
			</p>
			<br />
			<p className="text-lg text-center max-w-md">
				Feel free to close this tab
			</p>
		</div>
	);
}
