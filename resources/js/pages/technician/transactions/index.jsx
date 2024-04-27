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
import { TechnicianLayout } from '@/layouts/technician/technician-layout';

export default function TransactionIndex() {
    const { auth, transactions } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Transaction" />
            <Container>
                <>
                    <Header title={'Transactions History'} subtitle={`Manage transactions history`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Transactions History</h2>
                            <Search URL={route('technician.transactions.index')} />
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Transaction Idx</TableHead>
                                            <TableHead>Total Price</TableHead>
                                            <TableHead>Payment Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Transaction Date</TableHead>
                                            <TableHead>Vendor</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.data.map((transaction, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{transaction.no_transaction}</TableCell>
                                                <TableCell>{formatRupiah(transaction.total_price)}</TableCell>
                                                <TableCell>{transaction.payment_method}</TableCell>
                                                <TableCell>{transaction.transaction_status}</TableCell>
                                                <TableCell>{transaction.created_at}</TableCell>
                                                <TableCell>{transaction.vendor.name}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('technician.transactions.show', transaction.no_transaction)}
                                                            className={buttonVariants({ size: 'sm', variant: 'default' })}
                                                        >
                                                            Details
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <Pagination links={transactions.links} />
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

TransactionIndex.layout = (page) => <TechnicianLayout children={page} />;
