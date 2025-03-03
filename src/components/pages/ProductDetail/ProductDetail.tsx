'use client';

import ProductList from '@/components/organisms/ProductList/ProductList';
import { useColorMode } from '@/components/ui/color-mode';
import { useAppStore } from '@/stores/appStore';
import { Document } from '@/utils/interface';
import { Box, Button, Container, Flex, Heading, HStack, Image, Stack, Text } from '@chakra-ui/react';
import Slider from 'react-slick';

export default function ProductDetail({ data }: { data: Document }) {
    const settings = {
        customPaging: function (i: number) {
            if (i == 0) {
                return (
                    <a>
                        <Image
                            width={'100px'}
                            display={'block'}
                            height={'100px'}
                            alt="Hinh anh"
                            src={`https://i.ytimg.com/vi/${data.google_sheet_demo}/maxresdefault.jpg`}
                        />
                    </a>
                );
            } else {
                return (
                    <a>
                        <Image
                            width={'100px'}
                            display={'block'}
                            height={'100px'}
                            alt="Hinh anh"
                            src={data?.images[i - 1]?.image_url?.replace(
                                'http://127.0.0.1:9002',
                                process.env.NEXT_PUBLIC_URL_BE as string,
                            )}
                        />
                    </a>
                );
            }
            return <></>;
        },
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        dotsClass: 'slick-dots slick-thumb',
        slidesToScroll: 1,
    };

    const { colorMode } = useColorMode();
    const { handleAddToCart, handleToggleOpenCart } = useAppStore();

    return (
        <Box px={[4, 8]} bg={colorMode === 'dark' ? '#000' : '#fff'} pt={'120px'}>
            {data && (
                <Container maxW="container.xl">
                    <HStack w={'100%'} gap={'40px'} alignItems={'self-start'}>
                        <Box w={'50%'}>
                            <Slider {...settings}>
                                <Box borderRadius={'10px'} overflow={'hidden'}>
                                    <iframe
                                        width="100%"
                                        height="574px"
                                        src={`https://www.youtube.com/embed/${data.google_sheet_demo}`}
                                        title="How to build a portfolio website using Next.js, Chakra UI, Framer Motion, and Three.js"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    ></iframe>
                                </Box>
                                {data.images.map((img, index) => (
                                    <Box w={'100%'} key={index}>
                                        <Image
                                            w={'100%'}
                                            height={'574px'}
                                            objectFit={'cover'}
                                            border={'1px solid #ccc'}
                                            borderRadius={'6px'}
                                            alt="Hinh anh"
                                            src={img?.image_url?.replace(
                                                'http://127.0.0.1:9002',
                                                process.env.NEXT_PUBLIC_URL_BE as string,
                                            )}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                        <Box>
                            <Heading as="h1" fontWeight={'500'} size="4xl" mb={4}>
                                HỌC TỪ VỰNG & MỌI THỨ PHƯƠNG PHÁP HỌC LẶP LẠI NGẮT QUÃNG (SPACED REPETITION):
                            </Heading>
                            <Flex align="center" gap={3} mb={4}>
                                <Text as="span" color="gray.500" textDecoration="line-through" fontSize="md">
                                    200.000 đ
                                </Text>
                                <Text as="span" color="red.500" fontWeight="bold" fontSize="xl">
                                    65.000 đ
                                </Text>
                            </Flex>
                            <Button
                                colorScheme="blue"
                                size="2xl"
                                borderRadius={'20px'}
                                mb={'20px'}
                                onClick={() => {
                                    handleAddToCart(data);
                                    handleToggleOpenCart();
                                }}
                            >
                                Thêm vào giỏ hàng
                            </Button>

                            <Stack fontSize="sm">
                                <Text whiteSpace={'pre-line'}>{data.description}</Text>
                            </Stack>
                        </Box>
                    </HStack>
                </Container>
            )}
            <ProductList />
        </Box>
    );
}
