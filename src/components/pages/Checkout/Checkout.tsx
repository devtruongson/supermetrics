'use client';

import getTotalPrice from '@/helpers/totalPrice';
import { createOrder } from '@/services/order';
import { useAppStore } from '@/stores/appStore';
import { OrderData } from '@/utils/interface';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import {
    Box,
    Button,
    Container,
    createListCollection,
    EmptyState,
    Flex,
    Heading,
    Image,
    Input,
    List,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectRoot,
    SelectTrigger,
    SelectValueText,
    Separator,
    Stack,
    Text,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { LuCircleCheck, LuShoppingCart } from 'react-icons/lu';
import Swal from 'sweetalert2';

const typeCheckOut = createListCollection({
    items: [
        { label: 'Chuyển khoản', value: 'BANKING' },
        { label: 'Thanh toán COD', value: 'COD' },
    ],
});

const timeReceive = createListCollection({
    items: [
        { label: 'Buổi sáng', value: 'morning' },
        { label: 'Buổi trưa', value: 'noon' },
        { label: 'Buổi chiều', value: 'affternoon' },
        { label: 'Buổi tối', value: 'night' },
    ],
});

export default function CheckoutPage() {
    const [qr, setQr] = useState<string>('');
    const [typeCheckoutSelect, setTypeCheckOutSelect] = useState('BANKING');
    const { cart, handleClearCart } = useAppStore();
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        address: '',
        deliveryTime: '',
        deliveryMethod: 'EMAIL',
    });

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
                    amount: getTotalPrice(cart),
                    addInfo: 'Thanh toán template',
                    template: 'compact',
                }),
            });
            const content = await rawResponse.json();
            setQr(content.data.qrDataURL);
        })();
    }, [cart]);

    const handleCreateOrder = async () => {
        if (!formData.deliveryTime && typeCheckoutSelect === 'COD') {
            Swal.fire({
                text: 'Bạn vui lòng chọn thời gian nhận hàng',
                icon: 'info',
            });
            return;
        }

        if (!formData.address && typeCheckoutSelect === 'COD') {
            Swal.fire({
                text: 'Bạn vui lòng nhập địa chỉ nhận hàng',
                icon: 'info',
            });
            return;
        }

        if (!formData.customerEmail) {
            Swal.fire({
                text: 'Vui lòng nhập email',
                icon: 'info',
            });
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.customerEmail)) {
            Swal.fire({
                text: 'Vui lòng nhập email hợp lệ',
                icon: 'info',
            });
            return;
        }

        if (!formData.customerPhone) {
            Swal.fire({
                text: 'Vui lòng nhập số điện thoại',
                icon: 'info',
            });
            return;
        }

        const phonePattern = /^0\d{9}$/;
        if (!phonePattern.test(formData.customerPhone)) {
            Swal.fire({
                text: 'Vui lòng nhập số điện thoại hợp lệ',
                icon: 'info',
            });
            return;
        }

        if (!formData.customerName) {
            Swal.fire({
                text: 'Vui lòng nhập đầy đủ họ tên',
                icon: 'info',
            });
            return;
        }

        const orderItems = cart.map((item) => {
            return {
                document_id: item.document.id,
                quantity: item.quantity,
                price: item.document.price,
            };
        });

        const orderData: OrderData = {
            items: orderItems,
            customer_name: formData.customerName.trim(),
            customer_email: formData.customerEmail.trim(),
            customer_phone: formData.customerPhone.trim(),
            ...(formData.deliveryMethod === 'COD' && {
                address: formData.address.trim(),
                delivery_time: formData.deliveryTime,
            }),
            delivery_method: formData.deliveryMethod,
            payment_method: formData.deliveryMethod === 'EMAIL' ? 'BANKING' : 'COD',
            total_amount: getTotalPrice(cart),
            status: 'pending',
        };
        try {
            const response = await createOrder(orderData);
            console.log(response);

            if (response.success) {
                Swal.fire({
                    text: 'Chúc mừng bạn đã đặt hàng thành công!',
                    icon: 'success',
                });
                handleClearCart();
                window.location.href = `/order/${formData.customerPhone}`;
            } else {
                Swal.fire({
                    text: 'Có lỗi khi tạo đơn hàng',
                    icon: 'error',
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                text: 'Có lỗi khi tạo đơn hàng',
                icon: 'error',
            });
        }
    };

    return (
        <Container pt={'120px'} pb={'20px'}>
            <Heading size="lg" mb={6}>
                Trở lại cửa hàng
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8} justify="space-between">
                <Box
                    maxH={'400px'}
                    flex="1"
                    borderWidth="1px"
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-between'}
                    borderRadius="md"
                    p={6}
                    mb={{ base: 4, md: 0 }}
                >
                    <Heading size="md" mb={4}>
                        Tổng đơn
                    </Heading>
                    <Box flex={1} overflow={'auto'}>
                        {cart.length > 0 ? (
                            cart.map((item, index) => {
                                return (
                                    <Flex key={index} flex={1} justify="space-between" mb={3}>
                                        <Text>{item.document.title}</Text>
                                        <Text fontWeight="bold">
                                            {(item.quantity * item.document.price).toLocaleString()} đ
                                        </Text>
                                    </Flex>
                                );
                            })
                        ) : (
                            <EmptyState.Root>
                                <EmptyState.Content>
                                    <EmptyState.Indicator>
                                        <LuShoppingCart />
                                    </EmptyState.Indicator>
                                    <VStack textAlign="center">
                                        <EmptyState.Title>Giỏ hàng của bạn trống</EmptyState.Title>
                                        <EmptyState.Description>
                                            Hãy mua thêm sản phẩm tại trang chủ
                                        </EmptyState.Description>
                                    </VStack>
                                </EmptyState.Content>
                            </EmptyState.Root>
                        )}
                    </Box>
                    <Separator my={4} />
                    <Flex justify="space-between">
                        <Text fontSize="lg" fontWeight="semibold">
                            Tổng cộng
                        </Text>
                        <Text fontSize="lg" fontWeight="bold">
                            {getTotalPrice(cart).toLocaleString()} đ
                        </Text>
                    </Flex>
                </Box>
                <Box flex="1" borderWidth="1px" borderRadius="md" p={6}>
                    <Heading size="md" mb={4}>
                        Thông tin thanh toán
                    </Heading>

                    <VStack align="stretch">
                        <FormControl isRequired>
                            <FormLabel>Tên đầy đủ</FormLabel>
                            <Input
                                value={formData.customerName}
                                onChange={(e) => {
                                    setFormData((prev) => {
                                        return {
                                            ...prev,
                                            customerName: e.target.value,
                                        };
                                    });
                                }}
                                placeholder="Nhập tên đầy đủ của bạn"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Số điện thoại</FormLabel>
                            <Input
                                value={formData.customerPhone}
                                onChange={(e) => {
                                    setFormData((prev) => {
                                        return {
                                            ...prev,
                                            customerPhone: e.target.value,
                                        };
                                    });
                                }}
                                placeholder="Nhập số điện thoại của bạn"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Địa chỉ email</FormLabel>
                            <Input
                                value={formData.customerEmail}
                                onChange={(e) => {
                                    setFormData((prev) => {
                                        return {
                                            ...prev,
                                            customerEmail: e.target.value,
                                        };
                                    });
                                }}
                                placeholder="Nhập địa chỉ email"
                            />
                        </FormControl>

                        <SelectRoot
                            mt={'6px'}
                            collection={typeCheckOut}
                            size="sm"
                            width="100%"
                            value={[typeCheckoutSelect]}
                            onValueChange={(e) => {
                                setTypeCheckOutSelect(e.value[0]);
                            }}
                        >
                            <SelectLabel>Chọn hình thức thanh toán</SelectLabel>
                            <SelectTrigger>
                                <SelectValueText placeholder="Chọn hình thức thanh toán" />
                            </SelectTrigger>
                            <SelectContent>
                                {typeCheckOut.items.map((checkout) => (
                                    <SelectItem item={checkout} key={checkout.value}>
                                        {checkout.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </SelectRoot>
                        {qr && typeCheckoutSelect === 'BANKING' && cart.length > 0 && (
                            <Stack direction={['column', 'row']} py={'6px'}>
                                <Image
                                    className="full-sm"
                                    src={qr}
                                    alt="Hình ảnh chuyển khoản"
                                    w={'200px'}
                                    height={'200px'}
                                    objectFit={'contain'}
                                />
                                <Box py={'10px'}>
                                    <Text fontWeight={600}>Thông tin chuyển khoản</Text>
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
                                            {getTotalPrice(cart).toLocaleString()} đ
                                        </List.Item>
                                        <List.Item>
                                            <List.Indicator asChild color="green.500">
                                                <LuCircleCheck />
                                            </List.Indicator>
                                            Nội dung: Thanh toán tiền mua template 2TData
                                        </List.Item>
                                        <List.Item>
                                            <List.Indicator asChild color="green.500">
                                                <LuCircleCheck />
                                            </List.Indicator>
                                            Hệ thống sẽ gửi mã kích hoạt & hướng dẫn tải tài liệu qua email bạn đã đăng
                                            ký sau 5-10 phút sau khi hoàn tất thanh toán (Chuyển khoản hoặc Momo)
                                        </List.Item>
                                    </List.Root>
                                </Box>
                            </Stack>
                        )}
                        {typeCheckoutSelect === 'COD' && cart.length > 0 && (
                            <>
                                <SelectRoot
                                    mt={'6px'}
                                    collection={timeReceive}
                                    size="sm"
                                    width="100%"
                                    onValueChange={(e) => {
                                        setFormData((prev) => {
                                            return {
                                                ...prev,
                                                deliveryTime: e.value[0],
                                            };
                                        });
                                    }}
                                >
                                    <SelectLabel>Thời gian khách muốn nhận hàng</SelectLabel>
                                    <SelectTrigger>
                                        <SelectValueText placeholder="Thời gian khách muốn nhận hàng" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeReceive.items.map((checkout) => (
                                            <SelectItem item={checkout} key={checkout.value}>
                                                {checkout.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                                <Box py={'6px'} gap={2}>
                                    <FormControl isRequired w={'100%'}>
                                        <FormLabel>Địa chỉ nhận hàng</FormLabel>
                                        <Textarea placeholder="Nhập địa chỉ nhận hàng" minHeight={'150px'} />
                                    </FormControl>
                                    <List.Root gap="1" variant="plain" align="center">
                                        <List.Item>
                                            <List.Indicator asChild color="green.500">
                                                <LuCircleCheck />
                                            </List.Indicator>
                                            Ghi lại địa chỉ chính xác của bạn để nhận thư cung cấp mã kích hoạt tải tài
                                            liệu & video hướng dẫn từ HCW qua chuyển phát nhanh.
                                        </List.Item>
                                    </List.Root>
                                </Box>
                                <Box py={'6px'} gap={2} pb={'10px'}>
                                    <Image
                                        w={'100%'}
                                        objectFit={'contain'}
                                        src="https://w.ladicdn.com/s1050x650/60fe7a0343b2d300125b631f/white-red-simple-business-envelope-1-20230918053633-6iywq.png"
                                        alt="Hình ảnh"
                                    />
                                    <List.Root gap="1" variant="plain" align="center" pt={2}>
                                        <List.Item>
                                            <List.Indicator asChild color="green.500">
                                                <LuCircleCheck />
                                            </List.Indicator>
                                            <Text>
                                                Chờ nhận thư chứa mã kích hoạt từ HCW sau 2-3 ngày và thanh toán khi
                                                nhận hàng (
                                                <strong
                                                    style={{
                                                        color: '#ee4d2d',
                                                    }}
                                                >
                                                    {getTotalPrice(cart).toLocaleString()} vnđ
                                                </strong>
                                                ) + 20k ship. Sau đó thực hiện kích hoạt khóa học theo như hướng dẫn
                                                trên thư.
                                            </Text>
                                        </List.Item>
                                    </List.Root>
                                </Box>
                            </>
                        )}
                        <Button
                            colorScheme="blue"
                            size="lg"
                            disabled={cart.length === 0}
                            onClick={() => {
                                if (cart.length > 0) {
                                    handleCreateOrder();
                                }
                            }}
                        >
                            Mua ngay
                        </Button>
                    </VStack>

                    <Text fontSize="sm" color="gray.500" mt={4}>
                        Lưu ý: Hãy nhập chính xác địa chỉ email và/hoặc số điện thoại để chúng tôi có thể liên hệ và gửi
                        hoá đơn mua hàng. Nếu cần hỗ trợ, hãy liên hệ số điện thoại{' '}
                        <strong>HOTLINE/ZALO: 0899.657.688 | 024.7303.2838</strong>.
                    </Text>
                </Box>
            </Flex>
        </Container>
    );
}
