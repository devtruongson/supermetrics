'use client';

import FadeInUpBox from '@/components/atoms/Animations/FadeInUp/FadeInUp';
import { useColorMode } from '@/components/ui/color-mode';
import { Box, Button, Container, Heading, Image } from '@chakra-ui/react';

import { Badge, Flex, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Banner() {
    const { colorMode } = useColorMode();
    const history = useRouter();

    return (
        <Box pt={'94px'}>
            <Button
                bg={colorMode === 'dark' ? '#222' : '#111'}
                color={'#fff'}
                borderRadius={0}
                width={'100%'}
                py={'30px'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                maxW={'100%'}
                overflowX={'auto'}
                overflowY={'hidden'}
            >
                Giảm ngay 10% khi đơn hàng có giá trị hơn 160k | Chỉ đến ngày 31/03/2025
            </Button>
            <FadeInUpBox duration={0.25} ease={'easeOut'}>
                <Box bg={colorMode === 'dark' ? '#333' : '#EAF9F4'} py={[8, 12]} px={4}>
                    <Container maxW="container.xl">
                        <Flex direction={['column', 'column', 'row']} align="center" justify="space-between">
                            <Box flex="1" pr={[0, 0, 8]} mb={[8, 8, 0]}>
                                <Badge colorScheme="teal" fontSize="0.8em" mb={2}>
                                    YOUR TEMPLATE
                                </Badge>
                                <Heading as="h1" size="6xl" mb={4} className="text-3xl-res">
                                    Tối ưu hóa cuộc sống của bạn với template thông minh
                                </Heading>
                                <Text fontSize="md" mb={1}>
                                    Giảm ngay 100k đơn hàng có giá trị trên 100k
                                </Text>
                                <Text fontSize="md" mb={4}>
                                    Chiến dịch 31/03/2025 - Code: <strong>OPTIMATE</strong>
                                </Text>
                                <Button colorScheme="teal" size="lg" onClick={() => history.push('/product')}>
                                    Mua ngay
                                </Button>
                            </Box>
                            <Box flex="1">
                                <Wrap justify="center">
                                    <WrapItem>
                                        <Image
                                            src="https://optimatevn.com/wp-content/themes/optimate/img/home/banner.png"
                                            alt="Template 1"
                                            borderRadius="md"
                                            boxShadow="md"
                                        />
                                    </WrapItem>
                                </Wrap>
                            </Box>
                        </Flex>
                    </Container>
                </Box>
            </FadeInUpBox>
        </Box>
    );
}
