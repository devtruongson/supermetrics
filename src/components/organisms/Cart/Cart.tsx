'use client';

import { CartIcon, CloseIcon } from '@/components/atoms/Icons/Icons';
import { useColorMode } from '@/components/ui/color-mode';
import { Box, Button, Flex, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

export default function Cart() {
    const [open, setOpen] = useState<boolean>(false);
    const { colorMode } = useColorMode();

    return (
        <Box>
            <Box
                position="fixed"
                zIndex={open ? 999 : -2}
                opacity={open ? 1 : 0}
                w="100vw"
                h="100vh"
                top={0}
                transform={open ? 'translateX(0)' : 'translateX(100%)'}
                left={0}
            >
                <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    display={open ? 'block' : 'none'}
                    bg="rgba(0,0,0,0.4)"
                    onClick={() => setOpen(false)}
                />
                <Box
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    w={['80%', '40%', '30%']}
                    bg={colorMode === 'dark' ? '#666' : '#fff'}
                    zIndex={10}
                    transform={open ? 'translateX(0)' : 'translateX(100%)'}
                    transition="transform 0.3s ease-in-out"
                >
                    <Box
                        position="absolute"
                        top="10px"
                        right="10px"
                        cursor="pointer"
                        onClick={() => setOpen(false)}
                    ></Box>
                    <Box
                        py={'20px'}
                        px={'30px'}
                        position={'relative'}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                        height={'100%'}
                    >
                        <Heading as="h2" size="xl" mb={4}>
                            Giỏ hàng
                        </Heading>
                        <Button
                            bg={'transparent'}
                            position={'absolute'}
                            right={'10px'}
                            top={'10px'}
                            onClick={() => setOpen(false)}
                        >
                            <Icon fontSize="20px" width={10}>
                                <CloseIcon />
                            </Icon>
                        </Button>
                        <VStack flex={1} align="stretch" overflow={'auto'}>
                            <CartItem />
                        </VStack>
                        <Box>
                            <Box py={'10px'}>
                                <hr />
                            </Box>
                            <Flex justify="space-between" align="center">
                                <Text fontWeight="medium">Tổng số phụ:</Text>
                                <Text fontWeight="bold" fontSize="lg">
                                    65.000 đ
                                </Text>
                            </Flex>
                            <Button colorScheme="blue" w="full" mt={4}>
                                Thanh toán
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box onClick={() => setOpen(true)} cursor="pointer">
                <Icon fontSize="20px" width={10}>
                    <CartIcon />
                </Icon>
            </Box>
        </Box>
    );
}

const CartItem = () => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleDecrease = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleRemove = () => {
        // Xử lý xóa sản phẩm khỏi giỏ hàng tại đây
        console.log('Xóa sản phẩm khỏi giỏ hàng');
    };

    return (
        <Flex gap={4} my={1} align="center">
            <Image
                src="https://optimatevn.com/wp-content/uploads/2024/12/SP.png"
                alt="Học từ vựng & mọi thứ"
                width="80px"
                height="80px"
                objectFit="cover"
                borderRadius="md"
            />
            <Box flex="1">
                <Text fontWeight="semibold" mb={1}>
                    Học từ vựng & mọi thứ với Spaced Repetition - Google Sheets Template
                </Text>
                <Flex align="baseline" gap={2}>
                    <Text fontSize="sm" textDecoration="line-through" color="gray.500">
                        200.000 đ
                    </Text>
                    <Text fontWeight="bold" color="red.500">
                        65.000 đ
                    </Text>
                </Flex>
                <Flex mt={2} align="center" justify="space-between">
                    <HStack>
                        <Button onClick={handleDecrease}>Giảm</Button>
                        <Text>{quantity}</Text>
                        <Button onClick={handleIncrease}>Tăng</Button>
                    </HStack>
                    <Button onClick={handleRemove}>Xóa</Button>
                </Flex>
            </Box>
        </Flex>
    );
};
