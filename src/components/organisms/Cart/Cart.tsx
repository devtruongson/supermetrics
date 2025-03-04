'use client';

import { CartIcon, CloseIcon, DesIcon, IncreIcon } from '@/components/atoms/Icons/Icons';
import { useColorMode } from '@/components/ui/color-mode';
import getTotalPrice from '@/helpers/totalPrice';
import { useAppStore } from '@/stores/appStore';
import { ICart } from '@/utils/interface';
import {
    Badge,
    Box,
    Button,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    EmptyState,
    Flex,
    HStack,
    Icon,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { LuShoppingCart } from 'react-icons/lu';
import Swal from 'sweetalert2';

export default function Cart() {
    const { cart_open, cart, handleToggleOpenCart } = useAppStore();
    const history = useRouter();

    const handleCheckOut = () => {
        if (cart.length === 0) {
            Swal.fire({
                text: 'Giỏ hàng của bạn đang trống!',
                icon: 'info',
                draggable: true,
            });
        } else {
            history.push('/checkout');
            handleToggleOpenCart();
        }
    };

    return (
        <Box>
            <Box
                onClick={() => {
                    handleToggleOpenCart(true);
                }}
                cursor="pointer"
                position={'relative'}
            >
                <Icon cursor="pointer" fontSize="20px" width={10}>
                    <CartIcon />
                </Icon>
                {cart.length > 0 && (
                    <Badge
                        cursor="pointer"
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
            <DrawerRoot size={'md'} open={cart_open} onOpenChange={() => handleToggleOpenCart(false)}>
                <DrawerBackdrop />
                <DrawerContent width={'60vw'} position="fixed" h="100vh" top={0} right={0}>
                    <DrawerHeader>
                        <DrawerTitle>
                            Giỏ hàng
                            <Button
                                bg={'transparent'}
                                position={'absolute'}
                                right={'10px'}
                                top={'10px'}
                                onClick={() => {
                                    handleToggleOpenCart();
                                }}
                            >
                                <Icon fontSize="20px" width={10}>
                                    <CloseIcon />
                                </Icon>
                            </Button>
                        </DrawerTitle>
                    </DrawerHeader>
                    <DrawerBody>
                        <Box
                            py={'20px'}
                            px={'30px'}
                            position={'relative'}
                            display={'flex'}
                            flexDirection={'column'}
                            justifyContent={'space-between'}
                            height={'100%'}
                        >
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
                                <Button colorScheme="blue" w="full" mt={4} onClick={handleCheckOut}>
                                    Thanh toán
                                </Button>
                            </Box>
                        </Box>
                    </DrawerBody>
                    <DrawerCloseTrigger />
                </DrawerContent>
            </DrawerRoot>
        </Box>
    );
}

const CartItem = ({ itemCart }: { itemCart: ICart }) => {
    const { handleDecrement, handleIncrement, handleRemoveProduct } = useAppStore();
    const { colorMode } = useColorMode();

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
                        <Button
                            onClick={() => handleDecrement(itemCart.document.id)}
                            border={'1px solid #ccc'}
                            bg={colorMode === 'dark' ? '#fff' : 'transparent'}
                        >
                            <Icon fontSize="16px" width={10}>
                                <DesIcon />
                            </Icon>
                        </Button>
                        <Text>{itemCart.quantity}</Text>
                        <Button
                            border={'1px solid #ccc'}
                            bg={colorMode === 'dark' ? '#fff' : 'transparent'}
                            onClick={() => handleIncrement(itemCart.document.id)}
                        >
                            <Icon fontSize="16px" width={5}>
                                <IncreIcon />
                            </Icon>
                        </Button>
                    </HStack>
                    <Button onClick={() => handleRemoveProduct(itemCart.document.id)}>Xóa</Button>
                </Flex>
            </Box>
        </Flex>
    );
};
