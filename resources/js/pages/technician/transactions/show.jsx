import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';
import { Image } from '@/components/image';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';

export default function TransactionIndex() {
    const { auth, transaction, transaction_details } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Transaction" />
            <Container>
                <>
                    <Header title={transaction.no_transaction} subtitle={`Transaction Details`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Purchased products</h2>
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No.</TableHead>
                                            <TableHead>Product Image</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead className="text-center">Quantity</TableHead>
                                            <TableHead className="text-end">Total Price</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transaction_details.map((details, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{++index}</TableCell>
                                                <TableCell>
                                                    <Image
                                                        width={100}
                                                        className="aspect-[16/9] w-full rounded-2xl border object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                                        src={details.product.image}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <div>{details.product.name}</div>
                                                    <small className="text-red-600">{details.product.vendor.name}</small>
                                                </TableCell>
                                                <TableCell>{formatRupiah(details.product.price)}</TableCell>
                                                <TableCell className="text-center">{details.quantity}</TableCell>
                                                <TableCell className="text-end">{formatRupiah(details.product.price * details.quantity)}</TableCell>
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

TransactionIndex.layout = (page) => <TechnicianLayout children={page} />;
