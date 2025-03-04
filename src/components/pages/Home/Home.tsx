'use client';

import Banner from '@/components/organisms/marketing/Home/Banner/Banner';
import ProductList from '@/components/organisms/ProductList/ProductList';
import { getAllDocumentService } from '@/services/document';
import { Document } from '@/utils/interface';
import { Box, Container, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function HomePage() {
    const [productList, setProductList] = useState<Document[]>([]);

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
    return (
        <>
            <Banner />
            <Box py={'50px'}>
                <Container>
                    <Heading as="h2" size="3xl" mb={4}>
                        Danh sách sản phẩm
                    </Heading>
                    <ProductList productList={productList} />
                </Container>
            </Box>
        </>
    );
}
