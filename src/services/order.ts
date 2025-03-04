/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/config/axios';
import { APIResponse, Order, OrderData } from '@/utils/interface';

export const createOrder = async (data: OrderData): Promise<APIResponse<any[]>> => {
    return (await axios.post('/api/orders', data)) as APIResponse<any[]>;
};

export const getMyOrder = async (phone: string): Promise<APIResponse<Order[]>> => {
    return (await axios.get(`/api/orders/my-orders?phone=${phone}`)) as APIResponse<Order[]>;
};
