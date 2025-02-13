import { Provider } from '@/components/ui/provider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Marketing Intelligence Platform: Supermetrics - Supermetrics',
    description:
        'Supermetrics is the leading Marketing Intelligence Platform for agencies and brands that allows you to connect, manage, analyze, and activate your data. Book demo!',
    icons: '/favicon.ico',
    openGraph: {
        images: ['https://supermetrics.com/images/supermetrics.png'],
        description:
            'Supermetrics is the leading Marketing Intelligence Platform for agencies and brands that allows you to connect, manage, analyze, and activate your data. Book demo!',
    },
    twitter: {
        images: ['https://supermetrics.com/images/supermetrics.png'],
        description:
            'Supermetrics is the leading Marketing Intelligence Platform for agencies and brands that allows you to connect, manage, analyze, and activate your data. Book demo!',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
