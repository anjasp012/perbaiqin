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
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';

export default function CollaborationOrderIndex() {
    const { auth, collaborationOrders } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Collaboration Orders" />
            <Container>
                <>
                    <Header title={'Collaboration Orders'} subtitle={`Manage Collaboration Orders`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Collaboration Orders</h2>
                            <Search URL={route('technician.collaboration-orders.index')} />
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
                                        {collaborationOrders.data.map((collaborationOrder, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{++index + (collaborationOrders.current_page - 1) * collaborationOrders.per_page}</TableCell>
                                                <TableCell>{collaborationOrder.no_transaction_collaboration}</TableCell>
                                                <TableCell>{collaborationOrder.buyer_name}</TableCell>
                                                <TableCell>{collaborationOrder.buyer_phone}</TableCell>
                                                <TableCell>{formatRupiah(collaborationOrder.total_price)}</TableCell>
                                                <TableCell>{collaborationOrder.payment_method}</TableCell>
                                                <TableCell>{collaborationOrder.transaction_collaborationn_status}</TableCell>
                                                <TableCell>{collaborationOrder.created_at}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route(
                                                                'technician.collaboration-orders.show',
                                                                collaborationOrder.no_transaction_collaboration,
                                                            )}
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

                                <Pagination links={collaborationOrders.links} />
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

CollaborationOrderIndex.layout = (page) => <TechnicianLayout children={page} />;
