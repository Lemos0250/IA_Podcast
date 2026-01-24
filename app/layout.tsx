import './styles.css'
import { Crimson_Pro, Inter } from 'next/font/google'
import Footer from "./components/Footer"
import Header from "./components/Header"
import { AudioTranscriptionProvider } from './context/AudioTranscriptionContext'

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-crimson-pro',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
})

export const metadata = {
  title: "Além da Justiça",
  description: "Entrevistas que a Liga não aprova",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={`${crimsonPro.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-stone-50 font-serif text-stone-900 min-h-screen flex flex-col">
        <AudioTranscriptionProvider>
          <Header />
          <main className="flex-grow max-w-full mx-auto px-6 w-full py-8">
            {children}
          </main>
          <Footer />
        </AudioTranscriptionProvider>
      </body>
    </html>
  )
}