'use client';

import { useColorMode } from '@/components/ui/color-mode';
import { Document } from '@/utils/interface';
import { SimpleGrid } from '@chakra-ui/react';
import { ProductItem } from '../ProductItem/ProducItem';

const bagde = ['Mới', 'Giảm giá'];

export default function ProductList({ productList }: { productList: Document[] }) {
    const { colorMode } = useColorMode();

    return (
        <SimpleGrid columns={[1, 2, 3]} py={[2, 4]} bg={colorMode === 'dark' ? '#222' : 'gray.50'} borderRadius={4}>
            {productList.map((product) => (
                <ProductItem
                    id={product.id}
                    key={product.id}
                    desc={product.description}
                    label={
                        product.category_name ? product.category_name : bagde[Math.round(Math.random() * bagde.length)]
                    }
                    name={product.title}
                    oldPrice={product.price / 0.8}
                    newPrice={product.price}
                    imageUrl={product.images[0].image_url.replace(
                        'http://127.0.0.1:9002',
                        process.env.NEXT_PUBLIC_URL_BE as string,
                    )}
                    document={product}
                />
            ))}
        </SimpleGrid>
    );
}
