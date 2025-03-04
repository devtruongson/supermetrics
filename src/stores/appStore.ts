import { IAppState } from '@/utils/interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create<IAppState>()(
    persist(
        (set) => ({
            auth: {
                IsLoginIn: false,
                token: null,
                user: null,
            },
            cart_open: false,
            cart: [],
            productPayNow: null,
            handleAddToCart(data) {
                set((state) => {
                    const checkProductExit = state.cart.find((item) => item.document.id === data.id);
                    if (checkProductExit) {
                        checkProductExit.quantity++;
                        return {
                            ...state,
                            cart: state.cart.map((item) => {
                                if (item.document.id === checkProductExit.document.id) {
                                    return checkProductExit;
                                }
                                return item;
                            }),
                        };
                    } else {
                        return {
                            ...state,
                            cart: [
                                ...state.cart,
                                {
                                    document: data,
                                    quantity: 1,
                                },
                            ],
                        };
                    }
                });
            },
            handleRemoveProduct(idDocument) {
                set((state) => {
                    return {
                        ...state,
                        cart: state.cart.filter((cart) => cart.document.id !== idDocument),
                    };
                });
            },
            handleIncrement(idDocument) {
                set((state) => {
                    const checkProductExit = state.cart.find((item) => item.document.id === idDocument);
                    if (checkProductExit) {
                        checkProductExit.quantity++;
                        return {
                            ...state,
                            cart: state.cart.map((item) => {
                                if (item.document.id === checkProductExit.document.id) {
                                    return checkProductExit;
                                }
                                return item;
                            }),
                        };
                    } else {
                        return {
                            ...state,
                        };
                    }
                });
            },
            handleDecrement(idDocument) {
                set((state) => {
                    const checkProductExit = state.cart.find((item) => item.document.id === idDocument);
                    if (checkProductExit && checkProductExit.quantity > 1) {
                        checkProductExit.quantity--;
                        return {
                            ...state,
                            cart: state.cart.map((item) => {
                                if (item.document.id === checkProductExit.document.id) {
                                    return checkProductExit;
                                }
                                return item;
                            }),
                        };
                    }
                    if (checkProductExit && checkProductExit.quantity === 1) {
                        return {
                            ...state,
                            cart: state.cart.filter((cart) => cart.document.id !== idDocument),
                        };
                    } else {
                        return {
                            ...state,
                        };
                    }
                });
            },
            handleToggleOpenCart(status) {
                set((state) => {
                    return {
                        ...state,
                        cart_open: status ? status : !state.cart_open,
                    };
                });
            },
        }),
        {
            name: 'app_data',
            partialize: (state) => ({
                auth: state.auth,
                cart: state.cart,
                productPayNow: state.productPayNow,
            }),
        },
    ),
);
