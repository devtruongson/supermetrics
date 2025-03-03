import { ICart } from '@/utils/interface';

export default function getTotalPrice(cart: ICart[]): number {
    return cart.reduce((total, item) => total + item.document.price * item.quantity, 0);
}
