import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "F1 Info",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} + { font-body}`}>
        <div className="container mx-auto lg:my-6 my-3 font-oxanium">
          {children}
        </div>
      </body>
    </html>
  )
}
