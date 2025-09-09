import type { Metadata } from 'next';
import { Bebas_Neue, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/layout/NavBar';
import Footer from '@/components/layout/Footer';

const bebas = Bebas_Neue({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-bebas',
});

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-jetbrains',
});

export const metadata: Metadata = {
	title: 'Reverie of Fear',
	description: 'A modern, cinematic site for the co-op horror deckbuilder.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${bebas.variable} ${inter.variable} ${jetbrains.variable} antialiased grain min-h-screen flex flex-col`}
			>
				<NavBar />
				<div className="flex-1">{children}</div>
				<Footer />
			</body>
		</html>
	);
}
