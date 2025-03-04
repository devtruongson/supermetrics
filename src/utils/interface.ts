export interface IAppState {
    auth: {
        IsLoginIn: boolean;
        token: string | null;
        user: IUser | null;
    };
    cart: ICart[];
    productPayNow: {
        document: Document;
        quantity: number;
    } | null;
    cart_open: boolean;
    handleAddToCart: (product: Document) => void;
    handleRemoveProduct: (documentId: number) => void;
    handleIncrement: (documentId: number) => void;
    handleDecrement: (documentId: number) => void;
    handleToggleOpenCart: (status?: boolean) => void;
}

export interface IUser {
    id: number;
    email: string;
    name: string;
    role: string;
    permissions: string[];
}

export interface ICart {
    document: Document;
    quantity: number;
}

export interface Document {
    id: number;
    code: string;
    title: string;
    description: string;
    price: number;
    category_id: number;
    category_name?: string;
    google_sheet_demo?: string;
    status: 'draft' | 'published';
    images: DocumentImage[];
    created_at: string;
    updated_at: string;
    template_links?: TemplateLink[];
    available_links_count?: number;
}

export interface Category {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export interface TemplateLink {
    id: number;
    document_id: number;
    category_id: number;
    category_name: string;
    link: string;
    is_used: boolean;
    created_at: string;
    updated_at: string;
}

export interface DocumentImage {
    id: number;
    document_id: number;
    image_url: string;
    image_key: string;
    is_primary: boolean;
    created_at: string;
    updated_at: string;
}

export interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address: string;
    total: number;
    status: string;
    payment_method: string;
    delivery_method: string;
    delivery_time?: string;
    items: OrderItem[];
    created_at: string;
    updated_at?: string;
}

export interface OrderData {
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    address?: string;
    payment_method: string;
    delivery_method: string;
    total_amount: number;
    status: string;
    items: Array<{
        document_id: number;
        quantity: number;
        price: number;
    }>;
}

export interface OrderItem {
    id: number;
    document_id: number;
    quantity: number;
    price: number;
    product_link?: string;
    template_link_id?: number;
    zalo_qr_id?: string;
    document: Document;
}

export interface OrderWithDetails extends Order {
    items: OrderItem[];
}

export type OrderResponse = APIResponse<{
    order: Order;
}>;

export interface APIResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
