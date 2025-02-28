import { IAppState } from '@/utils/interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create<IAppState>()(
    persist(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (set) => ({
            auth: {
                IsLoginIn: false,
                token: null,
                user: null,
            },
            cart: [],
            productPayNow: null,
        }),
        {
            name: 'app_data',
        },
    ),
);
