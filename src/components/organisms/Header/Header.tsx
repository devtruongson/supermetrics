'use client';

import Cate from '@/components/atoms/Cate/Cate';
import { useColorMode } from '@/components/ui/color-mode';
import { Tooltip } from '@/components/ui/tooltip';
import { Box, Container, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import Cart from '../Cart/Cart';
import Search from '../Search/Search';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [isTransparent, setIsTransparent] = useState<boolean>(true);

    useEffect(() => {
        if (window.scrollY > 50) {
            setIsTransparent(false);
        } else {
            setIsTransparent(true);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                setIsTransparent(false);
            } else {
                setIsTransparent(true);
            }
        });

        return () => window.removeEventListener('scroll', () => {});
    }, []);

    return (
        <Box
            as="header"
            position={'fixed'}
            top={0}
            left={0}
            right={0}
            zIndex={998}
            py={4}
            px={8}
            boxShadow={isTransparent ? 'inherit' : 'sm'}
            bg={isTransparent ? 'transparent' : colorMode === 'dark' ? '#000' : '#fff'}
        >
            <Container>
                <Flex align="center" mx="auto">
                    <Flex as="nav" align="center" gap={6} display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="blue.600"
                            onClick={() => (window.location.href = '/')}
                            cursor={'pointer'}
                        >
                            Template 2T Data
                        </Text>
                        <Cate />
                    </Flex>

                    <Spacer />

                    {/* Action Buttons */}
                    <Flex align="center" gap={4}>
                        <Search />
                        <Cart />
                        <Icon fontSize={'20px'} width={10}>
                            {colorMode === 'dark' ? (
                                <Tooltip content="Chủ đề sáng" openDelay={0} closeDelay={0}>
                                    <CiLight cursor={'pointer'} onClick={toggleColorMode} />
                                </Tooltip>
                            ) : (
                                <Tooltip content="Chủ đề tối" openDelay={0} closeDelay={0}>
                                    <MdDarkMode cursor={'pointer'} onClick={toggleColorMode} />
                                </Tooltip>
                            )}
                        </Icon>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Header;
