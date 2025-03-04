/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from '@/config/axios';
import { APIResponse, OrderData } from '@/utils/interface';

export const createOrder = async (data: OrderData): Promise<APIResponse<any[]>> => {
    return (await axios.post('/api/orders', data)) as APIResponse<any[]>;
};
