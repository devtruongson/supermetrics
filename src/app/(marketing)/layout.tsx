'use client';

import Header from '@/components/organisms/Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}
