import { Box, Container, Flex, HStack, Icon, Image, Link, Separator, Stack } from '@chakra-ui/react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';

export default function Footer() {
    return (
        <Box>
            <Separator />
            <Container as="footer" py={{ base: '10', md: '12' }}>
                <Stack gap="6">
                    <Stack direction="row" justify="space-between" align="center">
                        <Flex cursor={'pointer'} onClick={() => (window.location.href = '/')}>
                            <Image height={'60px'} borderRadius={6} src="/marketing/logo.png" alt="Logo website" />
                        </Flex>
                        <HStack gap="4">
                            {socialLinks.map(({ href, icon }, index) => (
                                <Link key={index} href={href} colorPalette="gray">
                                    <Icon size="md">{icon}</Icon>
                                </Link>
                            ))}
                        </HStack>
                    </Stack>
                    <Copyright />
                </Stack>
            </Container>
        </Box>
    );
}

const socialLinks = [
    { href: 'https://x.com', icon: <SiX /> },
    { href: 'https://github.com', icon: <SiGithub /> },
    { href: 'https://www.linkedin.com', icon: <SiLinkedin /> },
];

import { Text, type TextProps } from '@chakra-ui/react';

export const Copyright = (props: TextProps) => {
    return (
        <Text fontSize="sm" color="fg.muted" {...props}>
            &copy; {new Date().getFullYear()} 2T Data Solution
        </Text>
    );
};
