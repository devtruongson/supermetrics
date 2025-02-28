'use client';

import { Box, Container, Heading } from '@chakra-ui/react';

import { useColorMode } from '@/components/ui/color-mode';
import { getAllDocumentService } from '@/services/document';
import { Document } from '@/utils/interface';
import { SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ProductItem } from '../ProductItem/ProducItem';

const bagde = ['Mới', 'Giảm giá'];

export default function ProductList() {
    const [productList, setProductList] = useState<Document[]>([]);
    const { colorMode } = useColorMode();

    useEffect(() => {
        const _fetch = async () => {
            try {
                const res = await getAllDocumentService();
                setProductList(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);

    const handleAddToCart = (productId: number) => {
        console.log('Thêm sản phẩm ID:', productId);
    };

    return (
        <Box py={'50px'}>
            <Container>
                <Heading as="h2" size="3xl" mb={4}>
                    Danh sách sản phẩm
                </Heading>
                <SimpleGrid
                    columns={[1, 2, 3]}
                    py={[2, 4]}
                    bg={colorMode === 'dark' ? '#222' : 'gray.50'}
                    borderRadius={4}
                >
                    {productList.map((product) => (
                        <ProductItem
                            id={product.id}
                            key={product.id}
                            desc={product.description}
                            label={bagde[Math.round(Math.random() * bagde.length)]}
                            name={product.title}
                            oldPrice={product.price / 0.8}
                            newPrice={product.price}
                            imageUrl={product.images[0].image_url.replace(
                                'http://127.0.0.1:9002',
                                process.env.NEXT_PUBLIC_URL_BE as string,
                            )}
                            onAddToCart={() => handleAddToCart(product.id)}
                        />
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
