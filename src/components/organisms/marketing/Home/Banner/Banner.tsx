'use client';

import FadeInUpBox from '@/components/atoms/Animations/FadeInUp/FadeInUp';
import { useColorMode } from '@/components/ui/color-mode';
import { AspectRatio, Box, Button, Container, Heading, HStack, Icon, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

export default function Banner() {
    const { colorMode } = useColorMode();

    return (
        <Box bg={colorMode === 'dark' ? '#000' : '#f3efed'} pt={'80px'}>
            <VStack maxWidth={'860px'} margin={'0 auto'}>
                <FadeInUpBox duration={0.25} ease={'easeOut'}>
                    <Heading mt={6} as={'h1'} fontSize={'5.5rem'} size={'7xl'} textAlign={'center'}>
                        Turn marketing data into business growth
                    </Heading>
                    <Heading
                        marginTop={10}
                        marginBottom={6}
                        fontWeight={'400'}
                        textAlign={'center'}
                        size={'2xl'}
                        color={colorMode === 'dark' ? '#fff' : '#62615F'}
                    >
                        Supermetrics is the leading Marketing Intelligence Platform for agencies and brands that allows
                        you to connect, manage, analyze, and activate your data.
                    </Heading>
                </FadeInUpBox>
            </VStack>
            <FadeInUpBox duration={0.25} ease={'backInOut'}>
                <HStack justifyContent={'center'} pb={10} pt={4} gap={'14px'}>
                    <Button fontSize={'14px'}>
                        <Heading as={'span'} fontWeight={'normal'} fontSize={'14px'}>
                            Start 14-day free trial
                        </Heading>
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
                    >
                        Talk to an expert
                    </Button>
                </HStack>
            </FadeInUpBox>
            <Container margin={'0 auto'}>
                <FadeInUpBox duration={0.25} ease={'easeOut'}>
                    <Box w={'100%'} position={'relative'} bg={'#5F2936'} p={'50px'} borderRadius={10}>
                        <Box
                            position={'absolute'}
                            left={0}
                            bgImage={'url(https://supermetrics.com/images/lines/hero-frame-bottom-right.svg)'}
                        ></Box>
                        <AspectRatio w="100%" borderRadius={10} overflow={'hidden'} ratio={16 / 9}>
                            <video
                                src="https://cdn.sanity.io/files/8ly2m84z/production/e9c5fd984f8740690e5a4070db1c9d1a898691c8.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls={false}
                            ></video>
                        </AspectRatio>
                    </Box>
                </FadeInUpBox>
            </Container>
            <FadeInUpBox duration={0.25} ease={'easeOut'}>
                <VStack justifyContent={'center'} pb={10} pt={10} gap={'14px'}>
                    <Heading size={'lg'}>We’re fueling insights for over 200,000 companies in 120 countries</Heading>
                    <Container mt={'20px'}>
                        <HStack justifyContent={'space-between'} flex={1} w={'100%'} px={'50px'}>
                            <Image
                                style={{
                                    padding: colorMode === 'dark' ? '10px' : 0,
                                    borderRadius: 6,
                                    background: colorMode === 'dark' ? '#fff' : 'transparent',
                                }}
                                width={60}
                                height={60}
                                objectFit="contain"
                                src={
                                    'https://cdn.sanity.io/images/8ly2m84z/production/f8b46ee047193ae343fadb5458db7f8affb7b358-88x21.svg'
                                }
                                alt="Hình ảnh"
                            />
                            <Image
                                style={{
                                    padding: colorMode === 'dark' ? '10px' : 0,
                                    borderRadius: 6,
                                    background: colorMode === 'dark' ? '#fff' : 'transparent',
                                }}
                                width={60}
                                height={60}
                                objectFit="contain"
                                src={
                                    'https://cdn.sanity.io/images/8ly2m84z/production/bf9e8b4aa15c5cba850c99edd98574275f51839b-74x77.svg'
                                }
                                alt="Hình ảnh"
                            />
                            <Image
                                style={{
                                    padding: colorMode === 'dark' ? '10px' : 0,
                                    borderRadius: 6,
                                    background: colorMode === 'dark' ? '#fff' : 'transparent',
                                }}
                                width={60}
                                height={60}
                                objectFit="contain"
                                src={
                                    'https://cdn.sanity.io/images/8ly2m84z/production/06b6fc64d733529d419e5cb899b9bdef7646ce1e-80x17.svg'
                                }
                                alt="Hình ảnh"
                            />
                            <Image
                                style={{
                                    padding: colorMode === 'dark' ? '10px' : 0,
                                    borderRadius: 6,
                                    background: colorMode === 'dark' ? '#fff' : 'transparent',
                                }}
                                width={60}
                                height={60}
                                objectFit="contain"
                                src={
                                    'https://cdn.sanity.io/images/8ly2m84z/production/f6fadaa4d184b4e2493706aacbfbe59a00ec62c4-146x34.svg'
                                }
                                alt="Hình ảnh"
                            />
                            <Image
                                style={{
                                    padding: colorMode === 'dark' ? '10px' : 0,
                                    borderRadius: 6,
                                    background: colorMode === 'dark' ? '#fff' : 'transparent',
                                }}
                                width={60}
                                height={60}
                                objectFit="contain"
                                src={
                                    'https://cdn.sanity.io/images/8ly2m84z/production/3f9684951de2644d6fa856f41e630d3cc1426af6-100x27.svg'
                                }
                                alt="Hình ảnh"
                            />
                            <Image
                                style={{
                                    padding: colorMode === 'dark' ? '10px' : 0,
                                    borderRadius: 6,
                                    background: colorMode === 'dark' ? '#fff' : 'transparent',
                                }}
                                width={60}
                                height={60}
                                objectFit="contain"
                                src={
                                    'https://cdn.sanity.io/images/8ly2m84z/production/63706989c50b19428fc10fe2a092c65c4d40e8c8-114x43.svg'
                                }
                                alt="Hình ảnh"
                            />
                        </HStack>
                    </Container>
                </VStack>
            </FadeInUpBox>
        </Box>
    );
}
