import type { Metadata } from "next"
import { Poppins, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans-3",
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
    <html lang="en">
      <body
        className={`${poppins.variable} ${sourceSans3.variable} font-poppins antialiased`}
      >
        <NavBar />
        {children}
      </body>
    </html>
  )
}
