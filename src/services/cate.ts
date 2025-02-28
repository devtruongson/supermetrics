import axios from '@/config/axios';
import { APIResponse, Category } from '@/utils/interface';

export const getAllCateService = async (): Promise<APIResponse<Category[]>> => {
    return (await axios.get('/api/categories')) as APIResponse<Category[]>;
};
