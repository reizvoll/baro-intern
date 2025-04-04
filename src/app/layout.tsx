import TQProviders from "@/providers/TQProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "TO-DO 리스트",
  description: "인텔리픽 바로인턴-10기 Web(React) 과제입니다.",
  icons: {
    icon: '/images/favicon.svg',
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        <TQProviders>{children}</TQProviders>
      </body>
    </html>
  );
}
