'use client';

import MarkDown from '@/components/atoms/MarkDown/MarkDown';
import { useColorMode } from '@/components/ui/color-mode';
import { getAllCateService, getAllPoductCateService } from '@/services/cate';
import { useAppStore } from '@/stores/appStore';
import { Document } from '@/utils/interface';
import { Box, Button, Container, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Cate from '../Cate/Cate';

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
    const [productList, setProductList] = useState<
        | {
              title: string;
              data: Document[];
          }[]
    >([]);

    useEffect(() => {
        if (!data) return;

        const _fetch = async () => {
            try {
                const dataCate = await getAllCateService();
                dataCate?.data?.map(async (cate) => {
                    if (parseInt(cate.id) !== data.category_id) {
                        const res = await getAllPoductCateService(parseInt(cate.id));
                        if (res.success && res.data.length > 0) {
                            const dataBuilder = {
                                title: res?.data[0]?.category_name ? res?.data[0].category_name : 'Đang cập nhật',
                                data: res.data,
                            };
                            setProductList((prev) => [...prev, dataBuilder]);
                        }
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, [data]);

    return (
        <Box px={[4, 8]} bg={colorMode === 'dark' ? '#000' : '#fff'} pt={'120px'}>
            {data && (
                <Container maxW="container.xl">
                    <Stack direction={['column', 'row']} w="100%" gap="40px" alignItems="flex-start">
                        <Box w={['100%', '50%']}>
                            <Slider {...settings}>
                                <Box
                                    borderRadius="10px"
                                    overflow="hidden"
                                    className="h-300"
                                    lg={{
                                        height: '574px',
                                    }}
                                >
                                    <iframe
                                        className="h-300"
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
                                    <Box w="100%" key={index}>
                                        <Image
                                            sm={{
                                                height: '300px',
                                            }}
                                            lg={{
                                                height: '574px',
                                            }}
                                            w="100%"
                                            objectFit="cover"
                                            border="1px solid #ccc"
                                            borderRadius="6px"
                                            alt="Hình ảnh"
                                            src={img?.image_url?.replace(
                                                'http://127.0.0.1:9002',
                                                process.env.NEXT_PUBLIC_URL_BE as string,
                                            )}
                                        />
                                    </Box>
                                ))}
                            </Slider>
                        </Box>
                        <Box w={['100%', '50%']}>
                            <Heading as="h1" fontWeight="500" size="4xl" mb={4} className="text-20">
                                {data.title}
                            </Heading>
                            <Flex align="center" gap={3} mb={4}>
                                <Text as="span" color="gray.500" textDecoration="line-through" fontSize="md">
                                    {(data.price / 0.8).toLocaleString()} đ
                                </Text>
                                <Text as="span" color="red.500" fontWeight="bold" fontSize="xl">
                                    {data.price.toLocaleString()} đ
                                </Text>
                            </Flex>
                            <Button
                                colorScheme="blue"
                                size="2xl"
                                borderRadius="20px"
                                w={'full'}
                                mb="20px"
                                onClick={() => {
                                    handleAddToCart(data);
                                    handleToggleOpenCart();
                                }}
                            >
                                Thêm vào giỏ hàng
                            </Button>

                            <Stack fontSize="sm">
                                <MarkDown text={data.description} />
                            </Stack>
                        </Box>
                    </Stack>
                </Container>
            )}
            {productList &&
                productList.length > 0 &&
                productList.map((item, index) => (
                    <Cate padding="30px" isShowEmpty={true} data={item.data} key={index} />
                ))}
        </Box>
    );
}
