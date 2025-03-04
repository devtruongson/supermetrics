'use client';

import useDebounce from '@/components/atoms/hooks/useDebounce';
import { useColorMode } from '@/components/ui/color-mode';
import { Tooltip } from '@/components/ui/tooltip';
import { searchDocumentService } from '@/services/document';
import { Document } from '@/utils/interface';
import { Box, Flex, Image, Input, Spinner, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function Search() {
    const [open, setOpen] = useState(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [documentList, setDocumentList] = useState<Document[]>([]);

    const ref = useRef<HTMLDivElement>(null);
    const textDebounce = useDebounce({ text: textSearch, delay: 500 });

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setOpen(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        if (!textDebounce.trim()) {
            setDocumentList([]);
            setOpen(false);
            return;
        }

        const fetchDocuments = async () => {
            setIsLoading(true);
            try {
                const res = await searchDocumentService(textDebounce);
                if (res.success) {
                    setDocumentList(res.data);
                    setOpen(true);
                }
            } catch (error) {
                console.error('Error fetching documents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, [textDebounce]);

    return (
        <Box>
            <Tooltip
                ref={ref}
                open={open}
                interactive
                content={<DocumentSearch close={() => setOpen(false)} data={documentList} isLoading={isLoading} />}
            >
                <Input
                    onFocus={() => {
                        if (documentList.length) {
                            setOpen(true);
                        }
                    }}
                    value={textSearch}
                    onChange={(e) => setTextSearch(e.target.value)}
                    placeholder="Nhập từ khóa để tìm kiếm ...."
                />
            </Tooltip>
        </Box>
    );
}

function DocumentSearch({ data, isLoading, close }: { data: Document[]; isLoading: boolean; close: () => void }) {
    const { colorMode } = useColorMode();
    const history = useRouter();

    return (
        <Box maxH="300px" overflowY="auto" bg={colorMode === 'dark' ? '#000' : '#fff'} px={4}>
            {isLoading ? (
                <Flex justify="center" py={4}>
                    <Spinner size="md" />
                </Flex>
            ) : data.length > 0 ? (
                data.map((item, index) => (
                    <Flex
                        onClick={() => {
                            history.push(`/product/${item.id}`);
                            close();
                        }}
                        color={colorMode === 'dark' ? '#fff' : '#000'}
                        key={index}
                        py={3}
                        w="100%"
                        align="center"
                        cursor="pointer"
                        _hover={{ color: '#ee4d2d' }}
                        transition="background 0.2s ease-in-out"
                        alignItems={'center'}
                    >
                        <Image
                            objectFit="cover"
                            src={item.images[0].image_url.replace(
                                'http://127.0.0.1:9002',
                                process.env.NEXT_PUBLIC_URL_BE as string,
                            )}
                            alt={item.title}
                            mr={3}
                            border={'1px solid #ccc'}
                            borderRadius={4}
                            w={'60px'}
                            height={'60px'}
                            flexShrink={0}
                        />
                        <Box>
                            <Text fontSize={'16px'} as={'h2'} lineClamp={1} fontWeight={600}>
                                {item.title}
                            </Text>
                            <Text fontSize={'xs'} lineClamp={1} as={'p'} fontWeight={400}>
                                {item.description}
                            </Text>
                        </Box>
                    </Flex>
                ))
            ) : (
                <Flex justify="center" py={4} color="gray.500">
                    Không tìm thấy kết quả
                </Flex>
            )}
        </Box>
    );
}
