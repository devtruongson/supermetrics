import axios from '@/config/axios';
import { APIResponse, Category, Document } from '@/utils/interface';

export const getAllCateService = async (): Promise<APIResponse<Category[]>> => {
    return (await axios.get('/api/categories')) as APIResponse<Category[]>;
};

export const getAllPoductCateService = async (id: number): Promise<APIResponse<Document[]>> => {
    return (await axios.get(`/api/documents/public/category/${id}`)) as APIResponse<Document[]>;
};
