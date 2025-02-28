import axios from '@/config/axios';
import { APIResponse, Document } from '@/utils/interface';

export const getAllDocumentService = async (): Promise<APIResponse<Document[]>> => {
    return (await axios.get('/api/documents/public')) as APIResponse<Document[]>;
};
