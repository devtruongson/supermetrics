import ProductDetail from '@/components/pages/ProductDetail/ProductDetail';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductDetailPage({ params }: { params: any }) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BE}/api/documents/public/${id}`, {
        cache: 'no-cache',
    });
    const data = await res.json();

    return (
        <>
            <ProductDetail data={data.data} />
        </>
    );
}
