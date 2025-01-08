import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from './theme-provider';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Nav';
import Footer from './components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Vision Connect',
  description: 'Vision Connect',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-grow">{children}</div>
              <Footer />
            </main>

            <Toaster position="top-right" reverseOrder={false} />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
