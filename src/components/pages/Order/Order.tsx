'use client';

import { Order } from '@/utils/interface';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
    Badge,
    Box,
    Button,
    Container,
    EmptyState,
    Heading,
    Image,
    Input,
    List,
    Separator,
    Stack,
    Table,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiColorSwatch } from 'react-icons/hi';
import { LuCircleCheck } from 'react-icons/lu';

export default function OrderPage({ data, phone }: { data: Order[]; phone: string }) {
    const [phoneQuery, setPhoneQuery] = useState<string>('');
    const history = useRouter();

    useEffect(() => {
        if (phone !== 'enter_your_phone_unix') {
            setPhoneQuery(phone);
        }
    }, [phone]);
    return (
        <>
            <Box py={'120px'} minH={'80vh'}>
                <Container>
                    <Box>
                        <FormControl isRequired>
                            <FormLabel>Vui lòng nhập chính sác số điện thoại</FormLabel>
                            <Input
                                placeholder="Nhập số điện thoại của bạn"
                                value={phoneQuery}
                                onChange={(e) => setPhoneQuery(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            colorScheme="blue"
                            width={'100%'}
                            mt={6}
                            mb={4}
                            size="lg"
                            disabled={phoneQuery.length === 0}
                            onClick={() => {
                                if (phoneQuery) {
                                    history.push(`/order/${phoneQuery.trim()}`);
                                }
                            }}
                        >
                            Tìm kiếm đơn hàng
                        </Button>
                    </Box>
                </Container>
                {data && data.length > 0 ? (
                    <Container>
                        <Heading as="h1" size="lg" mb={6}>
                            Danh sách đơn hàng
                        </Heading>
                        <Stack>
                            {data.map((order) => (
                                <OrderItem order={order} key={order.id} />
                            ))}
                        </Stack>
                    </Container>
                ) : (
                    phoneQuery && (
                        <Box height={'60vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                            <EmptyState.Root>
                                <EmptyState.Content>
                                    <EmptyState.Indicator>
                                        <HiColorSwatch size={'40px'} />
                                    </EmptyState.Indicator>
                                    <VStack textAlign="center">
                                        <EmptyState.Title>Không tìm thấy kế quả phù hợp</EmptyState.Title>
                                    </VStack>
                                </EmptyState.Content>
                            </EmptyState.Root>
                        </Box>
                    )
                )}
            </Box>
        </>
    );
}

function OrderItem({ order }: { order: Order }) {
    const [qr, setQr] = useState<string>('');

    useEffect(() => {
        (async () => {
            const rawResponse = await fetch('https://api.vietqr.io/v2/generate', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accountNo: '8236668888',
                    accountName: 'CONG TY TNHH HCW VIET NAM',
                    acqId: '970416',
                    amount: order.total,
                    template: 'compact',
                }),
            });
            const content = await rawResponse.json();
            setQr(content.data.qrDataURL);
        })();
    }, [order.total]);

    return (
        <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
            <Stack direction={['column', 'row']} w={'100%'}>
                <Box flex={1}>
                    <Heading as="h2" size="md" mb={2}>
                        Mã đơn hàng: {order.id}
                    </Heading>
                    <Text>
                        <b>Khách hàng:</b> {order.customer_name}
                    </Text>
                    <Text>
                        <b>Email:</b> {order.customer_email}
                    </Text>
                    <Text>
                        <b>Điện thoại:</b> {order.customer_phone}
                    </Text>
                    {order.address && (
                        <Text>
                            <b>Địa chỉ:</b> {order.address}
                        </Text>
                    )}
                    <Text>
                        <b>Phương thức giao hàng:</b> {order.delivery_method}
                    </Text>
                    <Text>
                        <b>Phương thức thanh toán:</b> {order.payment_method}
                    </Text>
                    <Text display={'flex'} gap={3}>
                        <b>Tổng tiền:</b>{' '}
                        <span
                            style={{
                                fontWeight: 600,
                                color: '#ee4d2d',
                            }}
                        >
                            {order.total.toLocaleString()} đ
                        </span>
                    </Text>
                    <Text>
                        <b>Trạng thái:</b>{' '}
                        <Badge
                            colorScheme={
                                order.status === 'pending' ? 'yellow' : order.status === 'paid' ? 'green' : 'red'
                            }
                        >
                            {order.status}
                        </Badge>
                    </Text>
                    <Text>
                        <b>Ngày tạo:</b>{' '}
                        {new Date(order.created_at).toLocaleString('vi-VN', {
                            hour12: false,
                        })}
                    </Text>
                </Box>
                {order.payment_method === 'BANKING' && (
                    <Stack
                        direction={['column', 'row']}
                        py={'6px'}
                        sm={{
                            width: '100%',
                        }}
                        md={{
                            width: '50%',
                        }}
                        position={'relative'}
                    >
                        {order.status !== 'pending' && (
                            <Text
                                position={'absolute'}
                                zIndex={10}
                                left={'50%'}
                                top={'50%'}
                                style={{
                                    transform: 'translateX(-50%)',
                                }}
                                filter="none"
                                bg={'#ee4d2d'}
                                px={6}
                                py={3}
                                borderRadius={4}
                                fontWeight={600}
                                color={'#fff'}
                                fontSize={'md'}
                            >
                                Đơn hàng đã thanh toán
                            </Text>
                        )}
                        {qr && (
                            <Image
                                filter={order.status === 'pending' ? 'none' : 'auto'}
                                blur={order.status === 'pending' ? '0' : '5px'}
                                className="full-sm"
                                src={qr}
                                alt="Hình ảnh chuyển khoản"
                                w={'200px'}
                                height={'200px'}
                                objectFit={'contain'}
                            />
                        )}
                        <Box
                            py={'10px'}
                            filter={order.status === 'pending' ? 'none' : 'auto'}
                            blur={order.status === 'pending' ? '0' : '5px'}
                        >
                            <Text fontWeight={600}>Đơn hàng của bạn chưa thanh toán</Text>
                            <List.Root gap="1" variant="plain" mt={'10px'}>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                        <LuCircleCheck />
                                    </List.Indicator>
                                    CONG TY TNHH 2TData VIET NAM
                                </List.Item>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                        <LuCircleCheck />
                                    </List.Indicator>
                                    {order.total.toLocaleString()} đ
                                </List.Item>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                        <LuCircleCheck />
                                    </List.Indicator>
                                    Nội dung: Thanh toán tiền mua template SDT + TEN
                                </List.Item>
                                <List.Item>
                                    <List.Indicator asChild color="green.500">
                                        <LuCircleCheck />
                                    </List.Indicator>
                                    Hệ thống sẽ gửi mã kích hoạt & hướng dẫn tải tài liệu qua email bạn đã đăng ký sau
                                    5-10 phút sau khi hoàn tất thanh toán (Chuyển khoản hoặc Momo)
                                </List.Item>
                            </List.Root>
                        </Box>
                    </Stack>
                )}
            </Stack>

            <Separator my={4} />
            <Heading as="h3" size="sm" mb={2}>
                Danh sách sản phẩm
            </Heading>
            <Box width={'100%'} overflow={'auto'}>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>STT</Table.ColumnHeader>
                            <Table.ColumnHeader>Tên sản phẩm</Table.ColumnHeader>
                            <Table.ColumnHeader>Số lượng</Table.ColumnHeader>
                            <Table.ColumnHeader>Đơn giá</Table.ColumnHeader>
                            <Table.ColumnHeader>Thành tiền</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {order.items.map((item, index) => {
                            const product = item.document;
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{product ? product.title : 'Không có sản phẩm'}</Table.Cell>
                                    <Table.Cell>{item.quantity ?? 0}</Table.Cell>
                                    <Table.Cell>{item.price ? item.price.toLocaleString() + ' đ' : 'N/A'}</Table.Cell>
                                    <Table.Cell>
                                        {item.price && item.quantity
                                            ? (item.price * item.quantity).toLocaleString() + ' đ'
                                            : 'N/A'}
                                    </Table.Cell>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.Cell colSpan={4} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Tổng cộng
                            </Table.Cell>
                            <Table.Cell>{order.total ? order.total.toLocaleString() + ' đ' : 'N/A'}</Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table.Root>
            </Box>
        </Box>
    );
}
