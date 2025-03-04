import Order from '@/components/pages/Order/Order';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function OrderPage({ params }: { params: any }) {
    const { phone } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BE}/api/orders/my-orders?phone=${phone}`, {
        cache: 'no-cache',
    });
    const data = await res.json();

    return (
        <>
            <Order data={data.data} phone={phone} />
        </>
    );
}
