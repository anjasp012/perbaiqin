import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart } from 'lucide-react';

import { Head, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function AsideCart({ cartItems }) {
    const { put } = usePage().props;
    const clearCart = () => {
        router.post(route('clear-cart'));
    };
    const removeFromCart = (cartId) => {
        router.delete(route('remove-from-cart', cartId));
    };
    return (
        <aside className="fixed inset-y-0 right-0 hidden w-[22rem] overflow-y-auto border-l border-zinc-200 bg-white px-4 py-5 dark:border-zinc-900 dark:bg-black/10 sm:px-6 lg:px-8 xl:block">
            <div className="mb-2 flex justify-between">
                <span className="block text-left text-lg font-semibold"> Cart</span>
                <ShoppingCart />
            </div>
            <ScrollArea className="h-80 rounded-md ">
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id} className="mb-1 rounded-lg bg-secondary/30 p-4">
                            <h4 className="font-semibold text-zinc-900 dark:text-white">{item.product.name}</h4>
                            <div className="flex justify-between gap-x-6">
                                <div className="flex items-center gap-x-2">
                                    <small>${item.price}</small>
                                </div>
                                <div className="flex items-center gap-x-1">
                                    <small>Qty: {item.qty}</small>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center">
                        <p className="mt-4">No items in cart</p>
                    </div>
                )}
            </ScrollArea>
            <div className="mt-4">
                <Button variant={'destructive'} className="w-full" onClick={clearCart}>
                    Clear Cart
                </Button>
            </div>
        </aside>
    );
}
