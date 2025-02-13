'use client';

import { useColorMode } from '@/components/ui/color-mode';
import { Tooltip } from '@/components/ui/tooltip';
import { Box, Button, Container, Flex, Icon, Link, Spacer, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';

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
                    {/* Logo */}
                    <Text fontSize="xl" fontWeight="bold" color="blue.600">
                        Supermetrics
                    </Text>

                    <Spacer />

                    {/* Navigation Links */}
                    <Flex as="nav" align="center" gap={6} display={{ base: 'none', md: 'flex' }}>
                        <Link
                            href="#"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ textDecoration: 'none', color: 'blue.500' }}
                        >
                            Platform
                        </Link>
                        <Link
                            href="#"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ textDecoration: 'none', color: 'blue.500' }}
                        >
                            Solutions
                        </Link>
                        <Link
                            href="#"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ textDecoration: 'none', color: 'blue.500' }}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="#"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ textDecoration: 'none', color: 'blue.500' }}
                        >
                            Resources
                        </Link>
                        <Link
                            href="#"
                            fontSize="sm"
                            fontWeight="medium"
                            _hover={{ textDecoration: 'none', color: 'blue.500' }}
                        >
                            Company
                        </Link>
                    </Flex>

                    <Spacer />

                    {/* Action Buttons */}
                    <Flex align="center" gap={4}>
                        <Button variant="ghost" fontSize="sm" fontWeight="medium">
                            Login
                        </Button>
                        <Button colorScheme="blue" fontSize="sm" fontWeight="medium">
                            Book demo
                        </Button>
                        <Button variant="outline" colorScheme="blue" fontSize="sm" fontWeight="medium">
                            Start free trial
                        </Button>
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
