import Image from "next/image";
import { Noto_Sans } from "next/font/google";

const notoSans = Noto_Sans({
	subsets: ["latin"],
	weight: ["500"], // choose only what you need
});
const notoSansItalic = Noto_Sans({
	subsets: ["latin"],
	weight: ["500"], // choose only what you need
	style: ["italic"],
});

export default function Home() {
	return (
		<div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen pb-20 sm:pt-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[22px] row-start-2 items-center w-full">
				<h1
					className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-center ${notoSans.className}`}
				>
					Coordinate gifts with
				</h1>
				<h1
					className={`text-[rgb(255,81,0)] text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-20 ${notoSansItalic.className}`}
				>
					family and friends
				</h1>
				<Image
					src="/gift-page-lg.PNG"
					alt="Hero"
					width={1164}
					height={604}
					unoptimized
					className="w-full max-w-[1164px] mb-15 h-auto rounded-2xl border-[var(--surface-border)] border-10 hidden lg:block"
				/>
				<Image
					src="/gift-page.PNG"
					alt="Hero"
					width={453}
					height={612}
					unoptimized
					className="w-full max-w-[453px] mb-15 h-auto rounded-2xl border-[var(--surface-border)] border-10 block lg:hidden"
				/>

				<div className="flex">
					<div className="w-[150px] border-b-1 mb-9"></div>
				</div>

				<section className="flex flex-wrap justify-center gap-12 w-full my-4 text-3xl">
					<div className="flex flex-col items-center gap-6 max-w-[300px]">
						<h2 className="text-center">Track Events</h2>
						<Image
							src="/show-navigation.gif"
							alt="Hero"
							width={298}
							height={348}
							className="w-full border-[var(--surface-border)] border-3 rounded-2xl"
						/>
					</div>

					<div className="flex flex-col items-center gap-6 max-w-[300px] flex-none">
						<h2 className="text-center">Add Gifts</h2>
						<Image
							src="/add-gift.gif"
							alt="Hero"
							width={298}
							height={348}
							className="w-full border-[var(--surface-border)] border-3 rounded-2xl"
						/>
					</div>

					<div className="flex flex-col items-center gap-6 max-w-[300px] flex-none">
						<h2 className="text-center">Reserve Gifts</h2>
						<Image
							src="/reserve-gift.gif"
							alt="Hero"
							width={298}
							height={348}
							className="w-full border-[var(--surface-border)] border-3 flex-none rounded-2xl"
						/>
					</div>
				</section>
			</main>
		</div>
	);
}
