import React, { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
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

export default function TransactionIndex() {
    const { auth, transaction, transaction_details, totalPrice } = usePage().props;

    const { ask } = useSwal();

    const { data, setData, post, processing, errors } = useForm({
        transaction_collaboration_status: transaction.transaction_collaboration_status,
        _method: 'PATCH',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, name === 'image' ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.collaborationOrders.update', transaction.id));
    };
    return (
        <>
            <Head title="Collaboration Order" />
            <Container>
                <>
                    <Header title={transaction.no_transaction_collaboration} subtitle={`Collaboration Order Details`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Collaboration Order Information</h2>
                        </div>
                        <Card className="mb-20 border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                    <div className="space-y-1 sm:col-span-3">
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Buyer Name
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.buyer_name}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Buyer Phone
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.buyer_phone}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Address
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.address}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Province
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.province}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    City
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.city}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Postal Code
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.postal_code}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Total Price
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{formatRupiah(totalPrice)}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Payment Method
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <div className="font-bold">{transaction.payment_method}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1 sm:col-span-3">
                                        <div className="mb-3 grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                            <div className="space-y-1 sm:col-span-2">
                                                <label
                                                    className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    htmlFor="company"
                                                >
                                                    Order Status
                                                </label>
                                            </div>
                                            <div className="space-y-1 sm:col-span-1">:</div>
                                            <div className="space-y-1 sm:col-span-4">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="flex gap-2">
                                                        <select
                                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-foreground/70 focus-visible:outline-none focus-visible:ring-[0.20rem] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                            id="transaction_collaboration_status"
                                                            name="transaction_collaboration_status"
                                                            onChange={handleChange}
                                                            value={data.transaction_collaboration_status}
                                                        >
                                                            <option value="PROCES">PROCESS</option>
                                                            <option value="SUCCESS">SUCCESS</option>
                                                        </select>
                                                        <Button type="submit">Update</Button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Purchased Collaborations</h2>
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No.</TableHead>
                                            <TableHead>Collaboration Image</TableHead>
                                            <TableHead>Collaboration</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="text-end">Total Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transaction_details.map((detail, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{++index}</TableCell>
                                                <TableCell>
                                                    <Image
                                                        width={100}
                                                        className="aspect-[16/9] w-full rounded-2xl border object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                                        src={'/storage/' + detail.collaboration.image}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div>{detail.collaboration.name}</div>
                                                    <small className="text-red-600">{detail.collaboration.technician.name}</small>
                                                </TableCell>
                                                <TableCell>{formatRupiah(detail.collaboration.price)}</TableCell>
                                                <TableCell className="text-end">{formatRupiah(detail.collaboration.price)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

TransactionIndex.layout = (page) => <UserLayout children={page} />;
