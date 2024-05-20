import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';
import { UserLayout } from '@/layouts/user/user-layout';
import { Image } from '@/components/image';
import Breadcrumb from '@/components/breadcrumb';

export default function CartIndex() {
    const { auth, carts, subTotal } = usePage().props;

    const { ask } = useSwal();

    const checkoutHandler = (e) => {
        e.preventDefault();
        router.get(`/user/checkout`);
    };
    return (
        <>
            <Head title="My Cart" />
            <Container>
                <>
                    <Header title={'Cart'} subtitle={`My Cart`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                {carts.length > 0 ? (
                                    <>
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>No.</TableHead>
                                                    <TableHead>Product Image</TableHead>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead className="text-center">Quantity</TableHead>
                                                    <TableHead className="text-end">Total Price</TableHead>
                                                    <TableHead className="text-end">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {carts.map((cart, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{++index}</TableCell>
                                                        <TableCell>
                                                            <Image
                                                                width={100}
                                                                className="aspect-[16/9] w-full rounded-2xl border object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                                                src={cart.product.image}
                                                            />
                                                        </TableCell>
                                                        <TableCell>
                                                            <div>{cart.product.name}</div>
                                                            <small className="text-red-600">{cart.product.vendor.name}</small>
                                                        </TableCell>
                                                        <TableCell>{formatRupiah(cart.product.price)}</TableCell>
                                                        <TableCell className="text-center">{cart.quantity}</TableCell>
                                                        <TableCell className="text-end">{formatRupiah(cart.product.price * cart.quantity)}</TableCell>
                                                        <TableCell className="text-end">
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() =>
                                                                    ask({
                                                                        url: route('user.cart.destroy', [cart.id]),
                                                                        method: 'delete',
                                                                        icon: 'warning',
                                                                        message: 'Are you sure you want to delete this Product from Cart?',
                                                                    })
                                                                }
                                                            >
                                                                <span>Delete</span>
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell className="text-end">
                                                        <div className="font-bold">Sub Total :</div>
                                                    </TableCell>
                                                    <TableCell className="text-end">
                                                        <div className="font-bold">{formatRupiah(subTotal)}</div>
                                                    </TableCell>
                                                    <TableCell className="text-end"></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                        <div className="mt-2 flex justify-end">
                                            <Button onClick={checkoutHandler} type="submit">
                                                Checkout
                                            </Button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-center">Cart Is Empty.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

CartIndex.layout = (page) => <UserLayout children={page} />;
