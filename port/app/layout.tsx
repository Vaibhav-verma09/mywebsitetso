import type { Metadata } from 'next';
import './globals.css';
import CustomCursor from '@/components/CustomCursor';

export const metadata: Metadata = {
  title: 'Vaibhav Kumar Verma | TSO Groups – Software, AI & Creative Studio',
  description: 'Vaibhav Kumar Verma, B.Tech CSE student at United University, Prayagraj. AI/ML modeling, full-stack web engineering, and creative studio direction through TSO Groups.',
  keywords: ['Vaibhav Kumar Verma', 'TSO Groups', 'Prayagraj', 'Machine Learning', 'Next.js Developer', 'AI/ML Engineer', 'Portfolio'],
  authors: [{ name: 'Vaibhav Kumar Verma', url: 'https://github.com/thesecretone09' }],
  openGraph: {
    title: 'Vaibhav Kumar Verma | TSO Groups',
    description: 'Building digital experiences. Exploring intelligent technology with honest execution.',
    url: 'https://vaibhav-portfolio.vercel.app',
    siteName: 'Vaibhav Kumar Verma Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-bg text-ink antialiased selection:bg-gold selection:text-black">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
