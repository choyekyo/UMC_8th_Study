import { create } from "zustand";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems; 
    amount: number;
    total: number;

    actions: CartActions;
}

// immer는 불변성을 유지할 때 사용 
export const useCartStore = create<CartState>()(immer((set, _) => ({
    cartItems: cartItems,
    amount: 0, 
    total: 0,
    actions: {
        // 불변성을 유지하기 위한 코드 없이 깔끔하게 코드 구현 
        increase: (id:string) => {
            set((state) => {
                const cartItem = state.cartItems.find((item) => item.id === id);
                if (cartItem) {
                    cartItem.amount += 1; 
                }
            }); 
        }, 
        decrease: (id:string) => {
            set((state) => {
                const cartItem = state.cartItems.find((item) => item.id === id); 
                if (cartItem) {
                    cartItem.amount -= 1;
                }
            });
        },
        removeItem: (id:string) => {
            set((state) => {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
            }); 
        },
        clearCart: () => {
            set((state) => {
                state.cartItems = []; 
            }); 
        },
        calculateTotals: () => {
            set((state) => {
                let amount = 0; 
                let total = 0; 

                state.cartItems.forEach((item) => {
                    amount += item.amount;
                    total += item.amount * item.price;
                }); 

                state.amount = amount;
                state.total = total; 
            })
        },
    }, 
})));

export const useCartInfo = () => useCartStore(useShallow((state) => ({
    cartItems: state.cartItems,
    amount: state.amount,
    total: state.total,
}))); 

export const useCartActions = () => useCartStore((state) => state.actions);