import axios from '@/config/axios';
import { APIResponse, Document } from '@/utils/interface';

export const getAllDocumentService = async (): Promise<APIResponse<Document[]>> => {
    return (await axios.get('/api/documents/public')) as APIResponse<Document[]>;
};

export const searchDocumentService = async (q: string): Promise<APIResponse<Document[]>> => {
    return (await axios.get(`api/documents/search?query=${q}`)) as APIResponse<Document[]>;
};
