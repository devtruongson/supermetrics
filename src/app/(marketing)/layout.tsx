'use client';

import Footer from '@/components/organisms/Footer/Footer';
import Header from '@/components/organisms/Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
