'use client';

import FadeInUpBox from '@/components/atoms/Animations/FadeInUp/FadeInUp';
import { useColorMode } from '@/components/ui/color-mode';
import { Box, Button, Container, Heading, HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

const stats = [
    { value: '25%', label: 'Increase in marketing efficiency' },
    { value: '30%', label: 'Increase in conversion' },
    { value: '-20%', label: 'Cost per click' },
    { value: '200k+', label: 'Companies fueled' },
];

export default function DataSource() {
    const { colorMode } = useColorMode();

    return (
        <Box py={20}>
            <Container>
                <FadeInUpBox duration={0.25} ease={'backInOut'}>
                    <HStack gap={'50px'}>
                        <Box width={'40%'}>
                            <Heading size={'md'} color={colorMode === 'dark' ? '#fff' : '#62615F'}>
                                Connect
                            </Heading>
                            <Heading size={'5xl'}>
                                Get data from <br /> anywhere, instantly
                            </Heading>
                            <Heading
                                py={5}
                                fontWeight={'inherit'}
                                size={'lg'}
                                color={colorMode === 'dark' ? '#fff' : '#62615F'}
                            >
                                Connect all your marketing data in one place, no matter the source. Import data to where
                                you need it using Supermetrics prebuilt data pipelines. Create your own custom data
                                pipelines from online and offline data to ensure you have full coverage to make better
                                marketing decisions.
                            </Heading>
                            <HStack>
                                <Heading fontWeight={'600'} size={'md'} textDecor={'underline'}>
                                    Learn more
                                </Heading>
                                <Button borderRadius={'50%'} w={'60px'} height={'60px'}>
                                    <Icon fontSize={20}>
                                        <FaArrowRight />
                                    </Icon>
                                </Button>
                                <Button
                                    border={'1px solid'}
                                    borderColor={colorMode === 'dark' ? '#fff' : '#000'}
                                    background={'transparent'}
                                    color={colorMode === 'dark' ? '#fff' : '#000'}
                                    fontSize={'14px'}
                                    borderRadius={'999999px'}
                                    padding={'10px 20px'}
                                >
                                    Find your data source
                                    <Icon fontSize={20} fontWeight={'400'}>
                                        <FaArrowRight fontWeight={'400'} />
                                    </Icon>
                                </Button>
                            </HStack>
                        </Box>
                        <Image
                            style={{
                                flex: 1,
                                objectFit: 'contain',
                                borderRadius: 10,
                            }}
                            src="/marketing/4c2f7cd954fb41bba063749600a7f505bc0a09b9-1620x1080.webp"
                            alt=""
                            width={600}
                            height={600}
                        />
                    </HStack>
                </FadeInUpBox>
                <FadeInUpBox duration={0.25} ease={'backInOut'}>
                    <HStack mt={'100px'} gap={'50px'}>
                        <Image
                            style={{
                                flex: 1,
                                objectFit: 'contain',
                                borderRadius: 10,
                            }}
                            src="/marketing/37e897ac7f87f575068dc2742d0d6b29050f483e-1620x1080.webp"
                            alt=""
                            width={600}
                            height={600}
                        />
                        <Box width={'40%'}>
                            <Heading size={'md'} color={colorMode === 'dark' ? '#fff' : '#62615F'}>
                                Manage
                            </Heading>
                            <Heading size={'5xl'}>Your data, your way</Heading>
                            <Heading
                                py={5}
                                fontWeight={'inherit'}
                                size={'lg'}
                                color={colorMode === 'dark' ? '#fff' : '#62615F'}
                            >
                                Supermetrics&apos; no-code data management apps are easy to use. They let you edit,
                                manage, blend, enrich and store your marketing data. Customize everything to fit your
                                unique needs, all in one platform.
                            </Heading>
                            <HStack>
                                <Heading fontWeight={'600'} size={'md'} textDecor={'underline'}>
                                    Learn more
                                </Heading>
                                <Button borderRadius={'50%'} w={'60px'} height={'60px'}>
                                    <Icon fontSize={20}>
                                        <FaArrowRight />
                                    </Icon>
                                </Button>
                            </HStack>
                        </Box>
                    </HStack>
                </FadeInUpBox>
                <FadeInUpBox duration={0.25} ease={'backInOut'}>
                    <HStack mt={'100px'} gap={'50px'}>
                        <Box width={'40%'}>
                            <Heading size={'md'} color={colorMode === 'dark' ? '#fff' : '#62615F'}>
                                Analyze
                            </Heading>
                            <Heading size={'5xl'}>Analyze, visualize, and report in your favorite apps</Heading>
                            <Heading
                                py={5}
                                fontWeight={'inherit'}
                                size={'lg'}
                                color={colorMode === 'dark' ? '#fff' : '#62615F'}
                            >
                                Supermetrics gives you the freedom to use the reporting tools that suit you: Looker
                                Studio, Power BI, Google Sheets, Excel, and more. You can bring your data in to any app
                                you like — the choice is yours.
                            </Heading>
                            <HStack>
                                <Heading fontWeight={'600'} size={'md'} textDecor={'underline'}>
                                    Learn more
                                </Heading>
                                <Button borderRadius={'50%'} w={'60px'} height={'60px'}>
                                    <Icon fontSize={20}>
                                        <FaArrowRight />
                                    </Icon>
                                </Button>
                                <Button
                                    border={'1px solid'}
                                    borderColor={colorMode === 'dark' ? '#fff' : '#000'}
                                    background={'transparent'}
                                    color={colorMode === 'dark' ? '#fff' : '#000'}
                                    fontSize={'14px'}
                                    borderRadius={'999999px'}
                                    padding={'10px 20px'}
                                >
                                    Find your destination
                                    <Icon fontSize={20} fontWeight={'400'}>
                                        <FaArrowRight fontWeight={'400'} />
                                    </Icon>
                                </Button>
                            </HStack>
                        </Box>
                        <Image
                            style={{
                                flex: 1,
                                objectFit: 'contain',
                                borderRadius: 10,
                            }}
                            src="/marketing/e7be519858691a9e635f127957d18bf6d78c65c6-1620x1080.webp"
                            alt=""
                            width={600}
                            height={600}
                        />
                    </HStack>
                </FadeInUpBox>
                <FadeInUpBox duration={0.25} ease={'backInOut'}>
                    <HStack mt={'100px'} gap={'50px'}>
                        <Image
                            style={{
                                flex: 1,
                                objectFit: 'contain',
                                borderRadius: 10,
                            }}
                            src="/marketing/bbb5c824ab2a27ad3da2344dd03797fde60fd657-1620x1080.webp"
                            alt=""
                            width={600}
                            height={600}
                        />
                        <Box width={'40%'}>
                            <Heading size={'md'} color={colorMode === 'dark' ? '#fff' : '#62615F'}>
                                Activate
                            </Heading>
                            <Heading size={'5xl'}>Optimize your marketing, on your terms</Heading>
                            <Heading
                                py={5}
                                fontWeight={'inherit'}
                                size={'lg'}
                                color={colorMode === 'dark' ? '#fff' : '#62615F'}
                            >
                                Turn your marketing intelligence into action. Use your data to optimize campaigns,
                                personalize customer experiences, and drive business growth.
                            </Heading>
                            <HStack>
                                <Heading fontWeight={'600'} size={'md'} textDecor={'underline'}>
                                    Learn more
                                </Heading>
                                <Button borderRadius={'50%'} w={'60px'} height={'60px'}>
                                    <Icon fontSize={20}>
                                        <FaArrowRight />
                                    </Icon>
                                </Button>
                            </HStack>
                        </Box>
                    </HStack>
                </FadeInUpBox>
                <FadeInUpBox duration={0.25} ease={'backInOut'}>
                    <Box py={30}>
                        <Heading size={'4xl'} textAlign={'center'} py="30px">
                            Data intelligence that gives you the edge
                        </Heading>
                        <SimpleGrid columns={{ base: 1, md: 4 }} gap={8} textAlign="center">
                            {stats.map((stat, index) => (
                                <Box key={index}>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {stat.value}
                                    </Text>
                                    <Text fontSize="sm" color="gray.500">
                                        {stat.label}
                                    </Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </FadeInUpBox>
            </Container>
        </Box>
    );
}
