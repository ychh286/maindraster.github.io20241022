/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import scrollbar from "tailwind-scrollbar";

// Generated color palettes
const accent = { 200: '#feb3a6', 600: '#c90e00', 900: '#640300', 950: '#460b05' };
const gray = { 100: '#f9f5f5', 200: '#f3ecea', 300: '#c8c0be', 400: '#978784', 500: '#635451', 700: '#423432', 800: '#302321', 900: '#1d1715' };

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,css}'
	],
	theme: {
		extend: {
			colors: { accent, gray },
			fontFamily: {
				// 你喜欢的文本字体。Starlight 默认使用系统字体堆栈。

				"roboto-condensed": ['"Roboto Condensed"', "sans-serif"],
			},
		},
	},
	plugins: [
      daisyui, scrollbar
	],
};