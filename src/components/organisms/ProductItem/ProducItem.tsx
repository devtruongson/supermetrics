'use client';

import FadeInUpBox from '@/components/atoms/Animations/FadeInUp/FadeInUp';
import { useColorMode } from '@/components/ui/color-mode';
import { useAppStore } from '@/stores/appStore';
import { Document } from '@/utils/interface';
import { Badge, Box, Button, Flex, HStack, Icon, Image, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { IoLogoYoutube } from 'react-icons/io'; // Icon YouTube

interface ProductItemProps {
    label?: string;
    name: string;
    oldPrice?: number;
    newPrice?: number;
    imageUrl: string;
    desc: string;
    id: number;
    document: Document;
}

export function ProductItem({ label, name, oldPrice, newPrice, imageUrl, desc, id, document }: ProductItemProps) {
    const { colorMode } = useColorMode();
    const history = useRouter();
    const { handleAddToCart, handleToggleOpenCart } = useAppStore();

    return (
        <FadeInUpBox duration={0.3} ease={'easeOut'}>
            <Box
                cursor={'pointer'}
                borderWidth="1px"
                borderRadius="md"
                overflow="hidden"
                position="relative"
                bg={colorMode === 'dark' ? '#444' : '#fff'}
                _hover={{ boxShadow: 'md' }}
                mb={4}
                mx={2}
            >
                <Box position="relative">
                    {label && (
                        <Badge
                            position="absolute"
                            top="8px"
                            left="8px"
                            colorScheme={label === 'NEW' ? 'green' : 'red'}
                            textTransform="uppercase"
                            fontSize="0.7em"
                        >
                            {label}
                        </Badge>
                    )}
                    <Image
                        onClick={() => {
                            history.push(`/product/${id}`);
                        }}
                        minH={'250px'}
                        maxH={'250px'}
                        src={imageUrl}
                        alt={name}
                        w="100%"
                        h="auto"
                        objectFit="cover"
                    />
                    <Box position="absolute" bottom="8px" right="8px">
                        <Icon as={IoLogoYoutube} w={5} h={5} color="red.500" />
                    </Box>
                </Box>
                <Box p={4}>
                    <Text
                        lineClamp={1}
                        fontWeight="semibold"
                        mb={2}
                        onClick={() => {
                            history.push(`/product/${id}`);
                        }}
                    >
                        {name}
                    </Text>
                    <Text lineClamp={1} fontWeight="400" fontSize={'sm'} color={'#666'} mb={2}>
                        {desc}
                    </Text>
                    <Flex align="center" mt={2} gap={2}>
                        {oldPrice && (
                            <Text as="span" fontSize="sm" color="gray.500" textDecoration="line-through">
                                {oldPrice.toLocaleString()} đ
                            </Text>
                        )}
                        {newPrice && (
                            <Text as="span" fontWeight="bold" color="red.500">
                                {newPrice.toLocaleString()} đ
                            </Text>
                        )}
                    </Flex>
                    <HStack>
                        <Button
                            mt={4}
                            py={5}
                            w={'100%'}
                            colorScheme="blue"
                            size="sm"
                            onClick={() => {
                                handleAddToCart(document);
                                handleToggleOpenCart();
                            }}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    </HStack>
                </Box>
            </Box>
        </FadeInUpBox>
    );
}
