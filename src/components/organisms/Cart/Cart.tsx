'use client';

import { CartIcon, CloseIcon } from '@/components/atoms/Icons/Icons';
import { useColorMode } from '@/components/ui/color-mode';
import getTotalPrice from '@/helpers/totalPrice';
import { useAppStore } from '@/stores/appStore';
import { ICart } from '@/utils/interface';
import { Badge, Box, Button, EmptyState, Flex, Heading, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuShoppingCart } from 'react-icons/lu';

export default function Cart() {
    const [open, setOpen] = useState<boolean>(false);
    const { colorMode } = useColorMode();

    const { cart_open, cart } = useAppStore();

    useEffect(() => {
        if (cart_open) {
            setOpen(cart_open);
        }
    }, [cart_open]);

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
                            {cart.length > 0 ? (
                                cart.map((item, index) => <CartItem itemCart={item} key={index} />)
                            ) : (
                                <EmptyState.Root>
                                    <EmptyState.Content>
                                        <EmptyState.Indicator>
                                            <LuShoppingCart />
                                        </EmptyState.Indicator>
                                        <VStack textAlign="center">
                                            <EmptyState.Title>Giỏ hàng của bạn trống</EmptyState.Title>
                                            <EmptyState.Description>
                                                Hãy mua thêm sản phẩm tại trang chủ
                                            </EmptyState.Description>
                                        </VStack>
                                    </EmptyState.Content>
                                </EmptyState.Root>
                            )}
                        </VStack>
                        <Box>
                            <Box py={'10px'}>
                                <hr />
                            </Box>
                            <Flex justify="space-between" align="center">
                                <Text fontWeight="medium">Tổng số phụ:</Text>
                                <Text fontWeight="bold" fontSize="lg">
                                    {getTotalPrice(cart).toLocaleString()} đ
                                </Text>
                            </Flex>
                            <Button colorScheme="blue" w="full" mt={4}>
                                Thanh toán
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box onClick={() => setOpen(true)} cursor="pointer" position={'relative'}>
                <Icon fontSize="20px" width={10}>
                    <CartIcon />
                </Icon>
                {cart.length > 0 && (
                    <Badge
                        position="absolute"
                        top="-3"
                        right="-4"
                        borderRadius="full"
                        bg="red.500"
                        color="white"
                        fontSize="0.8em"
                        px={2}
                        py={1}
                    >
                        {cart.length}
                    </Badge>
                )}
            </Box>
        </Box>
    );
}

const CartItem = ({ itemCart }: { itemCart: ICart }) => {
    const { handleDecrement, handleIncrement, handleRemoveProduct } = useAppStore();

    return (
        <Flex gap={4} my={1} align="center">
            <Image
                src={itemCart.document?.images[0]?.image_url?.replace(
                    'http://127.0.0.1:9002',
                    process.env.NEXT_PUBLIC_URL_BE as string,
                )}
                alt="Học từ vựng & mọi thứ"
                width="80px"
                height="80px"
                objectFit="cover"
                borderRadius="md"
            />
            <Box flex="1">
                <Text fontWeight="semibold" mb={1}>
                    {itemCart.document.title}
                </Text>
                <Flex align="baseline" gap={2}>
                    <Text fontSize="sm" textDecoration="line-through" fontWeight={600} color="gray.500">
                        {((itemCart.document.price / 0.8) * itemCart.quantity).toLocaleString()} đ
                    </Text>
                    <Text fontWeight="bold" color="red.500">
                        {(itemCart.document.price * itemCart.quantity).toLocaleString()} đ
                    </Text>
                </Flex>
                <Flex mt={2} align="center" justify="space-between">
                    <HStack>
                        <Button onClick={() => handleDecrement(itemCart.document.id)}>Giảm</Button>
                        <Text>{itemCart.quantity}</Text>
                        <Button onClick={() => handleIncrement(itemCart.document.id)}>Tăng</Button>
                    </HStack>
                    <Button onClick={() => handleRemoveProduct(itemCart.document.id)}>Xóa</Button>
                </Flex>
            </Box>
        </Flex>
    );
};
