'use client';

import { getAllCateService, getAllPoductCateService } from '@/services/cate';
import { Document } from '@/utils/interface';
import { Box, Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Cate from '../Cate/Cate';

export default function Product() {
    const [productList, setProductList] = useState<
        | {
              title: string;
              data: Document[];
          }[]
    >([]);

    useEffect(() => {
        const _fetch = async () => {
            try {
                const dataCate = await getAllCateService();
                dataCate?.data?.map(async (cate) => {
                    const res = await getAllPoductCateService(parseInt(cate.id));
                    if (res.success && res.data.length > 0) {
                        const dataBuilder = {
                            title: res?.data[0]?.category_name ? res?.data[0].category_name : 'Đang cập nhật',
                            data: res.data,
                        };
                        setProductList((prev) => [...prev, dataBuilder]);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };

        _fetch();
    }, []);

    return (
        <Box pt={'120px'} pb={5}>
            <Container>
                {productList &&
                    productList.length > 0 &&
                    productList.map((item, index) => (
                        <Cate padding="30px" isShowEmpty={true} data={item.data} key={index} />
                    ))}
            </Container>
        </Box>
    );
}
