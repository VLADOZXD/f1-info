import Menu from "@/components/Menu"
import "./globals.css"
import { Inter } from "next/font/google"
import Footer from "@/components/Footer"
import ReactQueryProvider from "@/providers/ReactQueryProvider"

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
      <body className={`${inter.className} min-h-svh flex flex-col`}>
        <ReactQueryProvider>
          <div className="container mx-auto lg:my-6 my-3 flex-grow font-oxanium">
            <Menu />
            {children}
          </div>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
