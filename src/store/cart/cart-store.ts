import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartProduct } from '@/interfaces';

interface State {
    cart: CartProduct[];
    subTotal: number;
    tax: number;
    total: number;
    totalItems: number;
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => {
            const calculateSummary = (cart: CartProduct[]) => {
                const subTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const tax = subTotal * 0.13;
                const total = subTotal + tax;
                const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

                return { subTotal, tax, total, totalItems };
            };

            return {
                cart: [],
                subTotal: 0,
                tax: 0,
                total: 0,
                totalItems: 0,

                addProductToCart: (product: CartProduct) => {
                    const { cart } = get();

                    const productInCart = cart.some(
                        item => item.id === product.id && item.size === product.size
                    );

                    let updatedCart = [];

                    if (!productInCart) {
                        updatedCart = [...cart, product];
                    } else {
                        updatedCart = cart.map(item =>
                            item.id === product.id && item.size === product.size
                                ? { ...item, quantity: item.quantity + product.quantity }
                                : item
                        );
                    }

                    const summary = calculateSummary(updatedCart);
                    set({ cart: updatedCart, ...summary });
                },

                updateProductQuantity: (product: CartProduct, quantity: number) => {
                    const { cart } = get();

                    const updatedCart = cart.map(item =>
                        item.id === product.id && item.size === product.size
                            ? { ...item, quantity }
                            : item
                    );

                    const summary = calculateSummary(updatedCart);
                    set({ cart: updatedCart, ...summary });
                },

                removeProduct: (product: CartProduct) => {
                    const { cart } = get();

                    const updatedCart = cart.filter(
                        item => !(item.id === product.id && item.size === product.size)
                    );

                    const summary = calculateSummary(updatedCart);
                    set({ cart: updatedCart, ...summary });
                },
                clearCart: () => {
                    set({
                        cart: [],
                        subTotal: 0,
                        tax: 0,
                        total: 0,
                        totalItems: 0,
                    });
                },
            };
        },
        {
            name: 'shopping-cart',
        }
    )
);