import type { Metadata } from "next"
import { Poppins, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import NavBar from "@/components/NavBar"
import Script from "next/script"

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
      <head>
        <Script id="clarity-script" strategy="beforeInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
      </head>
      <body className={`font-poppins max-h-screen antialiased`}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}
