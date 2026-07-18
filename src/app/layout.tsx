import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Naskh_Arabic, Noto_Nastaliq_Urdu } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-urdu",
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "The Kasimid Sultanate | Official Sovereign Portal",
  description: "Official web portal of The Kasimid Sultanate (سلطنتِ القاسميه), a sovereign micronation in Central New Jersey. Providing national information, demographics, history, and official announcements.",
  keywords: ["Kasimid Sultanate", "Sultanate", "Ismailabad", "Yusuf I", "Central New Jersey Micronation", "Sovereign Micronation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${notoNaskhArabic.variable} ${notoNastaliqUrdu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory-100 text-stone-900 selection:bg-brass-gold-200 selection:text-ottoman-red-900">
        {children}
      </body>
    </html>
  );
}
