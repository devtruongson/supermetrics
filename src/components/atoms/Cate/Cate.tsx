'use client';
import { useColorMode } from '@/components/ui/color-mode';
import { getAllCateService } from '@/services/cate';
import { Category } from '@/utils/interface';
import { Box, Link, MenuContent, MenuItem, MenuRoot, MenuTrigger, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Cate({ is_mobile }: { is_mobile?: boolean }) {
    const [cate, setCate] = useState<Category[]>([]);
    const { colorMode } = useColorMode();

    useEffect(() => {
        const _fetch = async () => {
            try {
                const data = await getAllCateService();
                setCate(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        _fetch();
    }, []);

    return (
        <Box position={'relative'}>
            <MenuRoot open={is_mobile}>
                <MenuTrigger asChild>
                    <Text fontSize="sm" fontWeight="600" cursor={'pointer'}>
                        Danh mục tài liệu
                    </Text>
                </MenuTrigger>
                <MenuContent
                    shadow={is_mobile ? 'none' : 'md'}
                    bg={colorMode === 'dark' ? '#111' : '#fff'}
                    position={is_mobile ? 'static' : 'absolute'}
                >
                    {cate.map((cate, index) => (
                        <MenuItem
                            _hover={{
                                bg: colorMode === 'dark' ? '#333' : '#fff',
                                color: '#ee4d2d',
                            }}
                            bg={colorMode === 'dark' ? '#111' : '#fff'}
                            value="new-txt-a"
                            display={'block'}
                            outline={'none'}
                            py={'10px'}
                            px={'6px'}
                            key={index}
                        >
                            <Link
                                color={'currentcolor'}
                                display={'block'}
                                whiteSpace={'nowrap'}
                                outline={'none'}
                                href={`/cate/${cate.id}`}
                                fontWeight={600}
                            >
                                {cate.name}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuContent>
            </MenuRoot>
        </Box>
    );
}
