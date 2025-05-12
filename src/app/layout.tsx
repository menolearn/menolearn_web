import type { Metadata } from "next"
import { Poppins, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
})

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans3",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Menolearn",
  description: "The place for menopause health education",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${sourceSans3.variable}`}>
      <body className={`font-poppins min-h-screen antialiased`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
