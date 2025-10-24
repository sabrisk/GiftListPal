import React from "react";

function BackButton() {
	return (
		<button
			className="fixed top-0 left-0 w-12 h-12 pb-1 bg-gray-600 text-white text-4xl border border-slate-600 flex items-center justify-center  hover:bg-gray-500 transition-colors"
			aria-label="Back"
		>
			&lsaquo;
		</button>
	);
}

export default BackButton;
