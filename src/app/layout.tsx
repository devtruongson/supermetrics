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
    title: 'Template - Cung cấp các bộ tài liệu thông minh',
    description:
        '2T Datasolution cung cấp các giải pháp dữ liệu hiện đại, giúp doanh nghiệp tối ưu hiệu suất, nâng cao năng suất và ra quyết định chính xác dựa trên dữ liệu.',
    openGraph: {
        title: 'Template - Cung cấp các bộ tài liệu thông minh',
        description:
            '2T Datasolution cung cấp các giải pháp dữ liệu hiện đại, giúp doanh nghiệp tối ưu hiệu suất, nâng cao năng suất và ra quyết định chính xác dựa trên dữ liệu.',
        url: 'https://template.2tdata.com/',
        siteName: 'Templates - Document Selle',
        images: [
            {
                url: 'https://2tdata.com/wp-content/uploads/2025/02/rounded-in-photoretrica-5.png',
            },
        ],
    },
    icons: {
        icon: 'https://2tdata.com/wp-content/uploads/2025/02/2T_Data-removebg-preview-e1740391586819.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable}`}
                style={{
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
