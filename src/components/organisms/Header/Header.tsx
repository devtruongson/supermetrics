'use client';

import Cate from '@/components/atoms/Cate/Cate';
import { useColorMode } from '@/components/ui/color-mode';
import { Tooltip } from '@/components/ui/tooltip';
import {
    Box,
    Button,
    Container,
    DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
    Flex,
    Icon,
    Image,
    Link,
    List,
    Spacer,
} from '@chakra-ui/react';
import { CiLight } from 'react-icons/ci';
import { MdDarkMode } from 'react-icons/md';
import Cart from '../Cart/Cart';
import Search from '../Search/Search';

const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box
            height={'94px'}
            as="header"
            position={'fixed'}
            top={0}
            left={0}
            right={0}
            zIndex={998}
            py={4}
            px={8}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            boxShadow={'0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);'}
            bg={colorMode === 'dark' ? '#000' : '#fff'}
        >
            <Container className="sm-p-0">
                <Flex align="center" mx="auto" className="space_bettween_sm">
                    <Flex as="nav" align="center" gap={6} display={{ base: 'none', md: 'flex' }} alignItems={'center'}>
                        <Flex
                            gap={2}
                            cursor={'pointer'}
                            onClick={() => (window.location.href = '/')}
                            className="sm-hidden"
                        >
                            <Image height={'60px'} borderRadius={6} src="/marketing/logo.png" alt="Logo website" />
                        </Flex>
                        <Cate />
                        <List.Root display="flex" flexDirection="row" listStyle="none" gap={4} padding={0}>
                            <List.Item fontSize="sm" fontWeight={600}>
                                <Link href="/order/enter_your_phone_unix">Tra cứu đơn hàng</Link>
                            </List.Item>
                            <List.Item fontSize="sm" fontWeight={600}>
                                <Link href="https://khoinghiepkinhdoanh.info/">Khởi nghiệp kinh doanh</Link>
                            </List.Item>
                            <List.Item fontSize="sm" fontWeight={600}>
                                <Link href="https://www.hcwvn.com/">Liên hệ</Link>
                            </List.Item>
                        </List.Root>
                    </Flex>
                    <Box className="pc-hidden">
                        <MenuMobile />
                    </Box>

                    <Spacer className="sm-hidden" />

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

const MenuMobile = () => {
    const { colorMode } = useColorMode();

    return (
        <DrawerRoot size={'xl'}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Button
                    width={'30px'}
                    height={'30px'}
                    variant="outline"
                    size="sm"
                    bg={colorMode === 'dark' ? '#fff' : 'transparent'}
                >
                    <Image src="/hamburger.png" w={'20px'} h={'20px'} alt="Hinh Anh" />
                </Button>
            </DrawerTrigger>
            <DrawerContent position={'fixed'} left={0} top={0} bottom={0} height={'100vh'}>
                <DrawerHeader>
                    <DrawerTitle>
                        <Flex gap={2} cursor={'pointer'} onClick={() => (window.location.href = '/')}>
                            <Image height={'60px'} borderRadius={6} src="/marketing/logo.png" alt="Logo website" />
                        </Flex>
                    </DrawerTitle>
                </DrawerHeader>
                <DrawerBody>
                    <>
                        <Cate is_mobile />
                        <List.Root listStyle="none" gap={4} padding={0}>
                            <List.Item fontSize="sm" fontWeight={600}>
                                <Link href="/order/enter_your_phone_unix">Tra cứu đơn hàng</Link>
                            </List.Item>
                            <List.Item fontSize="sm" fontWeight={600}>
                                <Link href="https://khoinghiepkinhdoanh.info/">Khởi nghiệp kinh doanh</Link>
                            </List.Item>
                            <List.Item fontSize="sm" fontWeight={600}>
                                <Link href="https://www.hcwvn.com/">Liên hệ</Link>
                            </List.Item>
                        </List.Root>
                    </>
                </DrawerBody>
                <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Đóng</Button>
                    </DrawerActionTrigger>
                </DrawerFooter>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    );
};
