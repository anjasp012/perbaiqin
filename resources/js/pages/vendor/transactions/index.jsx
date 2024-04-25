import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { AppLayout } from '@/layouts/app-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { VendorLayout } from '@/layouts/vendor/vendor-layout';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';

export default function TransactionIndex() {
    const { auth, transactions } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Transaction" />
            <Container>
                <>
                    <Header title={'Transactions'} subtitle={`Manage transactions`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Transactions</h2>
                            <Search URL={route('vendor.transactions.index')} />
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No.</TableHead>
                                            <TableHead>Transaction Idx</TableHead>
                                            <TableHead>Buyer Name</TableHead>
                                            <TableHead>Buyer Phone</TableHead>
                                            <TableHead>Total Price</TableHead>
                                            <TableHead>Payment Method</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Transaction Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transactions.data.map((transaction, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{++index + (transactions.current_page - 1) * transactions.per_page}</TableCell>
                                                <TableCell>{transaction.no_transaction}</TableCell>
                                                <TableCell>{transaction.buyer_name}</TableCell>
                                                <TableCell>{transaction.buyer_phone}</TableCell>
                                                <TableCell>{formatRupiah(transaction.total_price)}</TableCell>
                                                <TableCell>{transaction.payment_method}</TableCell>
                                                <TableCell>{transaction.transaction_status}</TableCell>
                                                <TableCell>{transaction.created_at}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('vendor.transactions.show', transaction.no_transaction)}
                                                            className={buttonVariants({ size: 'sm', variant: 'default' })}
                                                        >
                                                            Details
                                                        </Link>

                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                ask({
                                                                    url: route('vendor.transactions.destroy', [transaction.id]),
                                                                    method: 'delete',
                                                                    icon: 'warning',
                                                                    message: 'Are you sure you want to delete this Transaction?',
                                                                })
                                                            }
                                                        >
                                                            <span>Delete</span>
                                                        </Button>
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

TransactionIndex.layout = (page) => <VendorLayout children={page} />;
