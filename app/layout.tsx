import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Devansh Sharma — AI Engineer & Full-Stack Developer',
  description:
    'Building production-grade AI systems, autonomous agents, RAG pipelines, and scalable full-stack applications. AI Engineer based in India.',
  keywords: ['AI Engineer', 'LLM', 'RAG', 'AI Agents', 'Full Stack', 'Python', 'Next.js', 'Devansh Sharma'],
  authors: [{ name: 'Devansh Sharma' }],
  openGraph: {
    title: 'Devansh Sharma — AI Engineer',
    description: 'Building production-grade AI systems and intelligent applications.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
