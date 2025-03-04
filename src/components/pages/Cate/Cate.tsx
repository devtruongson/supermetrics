'use client';

import ProductList from '@/components/organisms/ProductList/ProductList';
import { Document } from '@/utils/interface';
import { Box, Container, EmptyState, Heading, VStack } from '@chakra-ui/react';
import { HiColorSwatch } from 'react-icons/hi';

export default function Cate({ data, isShowEmpty }: { data: Document[]; isShowEmpty?: boolean }) {
    return (
        <Box py={'120px'}>
            <Container>
                {data && data.length > 0 ? (
                    <>
                        <Heading as="h2" size="3xl" mb={4}>
                            Danh sách tài liệu của {data[0]?.category_name}
                        </Heading>
                        <ProductList productList={data} />
                    </>
                ) : (
                    !isShowEmpty && (
                        <Box height={'80vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <EmptyState.Root>
                                <EmptyState.Content>
                                    <EmptyState.Indicator>
                                        <HiColorSwatch size={'40px'} />
                                    </EmptyState.Indicator>
                                    <VStack textAlign="center">
                                        <EmptyState.Title>Không tìm thấy kế quả phù hợp</EmptyState.Title>
                                    </VStack>
                                </EmptyState.Content>
                            </EmptyState.Root>
                        </Box>
                    )
                )}
            </Container>
        </Box>
    );
}
