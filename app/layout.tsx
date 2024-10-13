import type { Metadata } from 'next';
import './ui/globals.css';
import { roboto } from './ui/fonts';

export const metadata: Metadata = {
  title: 'Neversitup TODO App',
  description: 'Neversitup candidate test',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="cupcake" lang="en">
      <body className={`${roboto.className} antialiased`}>{children}</body>
    </html>
  );
}
