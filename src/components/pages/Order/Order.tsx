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
    Input,
    Separator,
    Stack,
    Table,
    Text,
    VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiColorSwatch } from 'react-icons/hi';

export default function OrderPage({ data, phone }: { data: Order[]; phone: string }) {
    const [phoneQuery, setPhoneQuery] = useState<string>('');
    const history = useRouter();

    useEffect(() => {
        setPhoneQuery(phone);
    }, [phone]);

    return (
        <>
            <Box py={'120px'}>
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
                            onClick={() => {
                                history.push(`/order/${phoneQuery.trim()}`);
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
                                <Box key={order.id} p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
                                    {/* Thông tin chung về đơn hàng */}
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
                                    <Text>
                                        <b>Tổng tiền:</b> {order.total.toLocaleString()} đ
                                    </Text>
                                    <Text>
                                        <b>Trạng thái:</b>{' '}
                                        <Badge
                                            colorScheme={
                                                order.status === 'pending'
                                                    ? 'yellow'
                                                    : order.status === 'paid'
                                                    ? 'green'
                                                    : 'red'
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
                                                    console.log(item);
                                                    return (
                                                        <Table.Row key={index}>
                                                            <Table.Cell>{index + 1}</Table.Cell>
                                                            <Table.Cell>
                                                                {product ? product.title : 'Không có sản phẩm'}
                                                            </Table.Cell>
                                                            <Table.Cell>{item.quantity ?? 0}</Table.Cell>
                                                            <Table.Cell>
                                                                {item.price
                                                                    ? item.price.toLocaleString() + ' đ'
                                                                    : 'N/A'}
                                                            </Table.Cell>
                                                            <Table.Cell>
                                                                {item.price && item.quantity
                                                                    ? (item.price * item.quantity).toLocaleString() +
                                                                      ' đ'
                                                                    : 'N/A'}
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    );
                                                })}
                                            </Table.Body>
                                            <Table.Footer>
                                                <Table.Row>
                                                    <Table.Cell
                                                        colSpan={4}
                                                        style={{ textAlign: 'right', fontWeight: 'bold' }}
                                                    >
                                                        Tổng cộng
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {order.total ? order.total.toLocaleString() + ' đ' : 'N/A'}
                                                    </Table.Cell>
                                                </Table.Row>
                                            </Table.Footer>
                                        </Table.Root>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Container>
                ) : (
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
                )}
            </Box>
        </>
    );
}
