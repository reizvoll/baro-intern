import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        tb: { max: "768px" }, // 일반 타블렛 크기
        mb: { max: "480px" }, // 가장 큰 폰 크기
      }
    }
  },
  plugins: []
};
export default config;
