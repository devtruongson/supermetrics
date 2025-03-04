import Cate from '@/components/pages/Cate/Cate';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function CatePage({ params }: { params: any }) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BE}/api/documents/public/category/${id}`, {
        cache: 'no-cache',
    });

    const data = await res.json();
    return <Cate data={data.data} />;
}
