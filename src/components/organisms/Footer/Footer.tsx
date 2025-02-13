'use client';

import { useColorMode } from '@/components/ui/color-mode';
import { Box, Container, Flex, Heading, Image, Link, SimpleGrid, Text } from '@chakra-ui/react';

export default function Footer() {
    const { colorMode } = useColorMode();

    return (
        <Box as="footer" bg={colorMode === 'dark' ? '#000' : 'gray.100'} py={8}>
            <Container mx="auto" px={4}>
                <Flex align="center" mb={8}>
                    <Image
                        background={colorMode === 'dark' ? '#fff' : 'transparent'}
                        borderRadius={'10px'}
                        src="/marketing/4184f226-7258-4ece-8537-233fa182fe55.png"
                        alt="Supermetrics Logo"
                        mr={2}
                        objectFit={'contain'}
                    />
                </Flex>

                <SimpleGrid columns={[2, 3, 6]}>
                    <Box>
                        <Heading as="h6" size="sm" mb={4}>
                            Marketing Intelligence Platform
                        </Heading>
                        <Link display="block" mb={2} href="#">
                            Connect data
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Manage data
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Analyze & visualize
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Activate data
                        </Link>
                    </Box>

                    <Box>
                        <Heading as="h6" size="sm" mb={4}>
                            Data sources
                        </Heading>
                        <Link display="block" mb={2} href="#">
                            Facebook Ads
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Google Ads
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Google Analytics 4
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Microsoft Advertising
                        </Link>
                        <Link display="block" mb={2} href="#">
                            LinkedIn Ads
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Instagram Insights
                        </Link>
                        <Link display="block" mb={2} href="#">
                            TikTok Ads
                        </Link>
                        <Link display="block" mb={2} href="#">
                            All data sources
                        </Link>
                    </Box>

                    <Box>
                        <Heading as="h6" size="sm" mb={4}>
                            Destinations
                        </Heading>
                        <Link display="block" mb={2} href="#">
                            Looker Studio
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Google Sheets
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Excel
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Power BI
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Supermetrics API
                        </Link>
                        <Link display="block" mb={2} href="#">
                            BigQuery
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Google Cloud Storage
                        </Link>
                        <Link display="block" mb={2} href="#">
                            All destinations
                        </Link>
                    </Box>

                    <Box>
                        <Heading as="h6" size="sm" mb={4}>
                            Pricing
                        </Heading>
                        <Link display="block" mb={2} href="#">
                            Looker Studio
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Google Sheets
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Excel
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Power BI
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Supermetrics API
                        </Link>
                        <Link display="block" mb={2} href="#">
                            BigQuery
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Google Cloud Storage
                        </Link>
                        <Link display="block" mb={2} href="#">
                            All pricing
                        </Link>
                    </Box>

                    <Box>
                        <Heading as="h6" size="sm" mb={4}>
                            Use Supermetrics
                        </Heading>
                        <Link display="block" mb={2} href="#">
                            Template gallery
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Blog
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Book demo
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Log in
                        </Link>
                    </Box>

                    <Box>
                        <Heading as="h6" size="sm" mb={4}>
                            Company
                        </Heading>
                        <Link display="block" mb={2} href="#">
                            About us
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Careers
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Partners
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Support
                        </Link>
                        <Link display="block" mb={2} href="#">
                            Documentation
                        </Link>
                    </Box>
                </SimpleGrid>
                <Box mt={8} borderTop="1px" borderColor="gray.200" pt={4}>
                    <Flex direction={['column', 'row']} justify="space-between" align="center">
                        <Box mb={[4, 0]}>
                            <Link mr={4} href="#">
                                Security
                            </Link>
                            <Link mr={4} href="#">
                                Terms of Service
                            </Link>
                            <Link mr={4} href="#">
                                Privacy Policy
                            </Link>
                            <Link mr={4} href="#">
                                Cookie Policy
                            </Link>
                            <Link mr={4} href="#">
                                Cookie Settings
                            </Link>
                        </Box>
                        <Text fontSize="sm">&copy; Supermetrics 2025</Text>
                    </Flex>
                </Box>
            </Container>
        </Box>
    );
}
