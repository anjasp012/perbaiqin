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

export default function ProductIndex() {
    const { auth, products } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Dashboard" />
            <Container>
                <>
                    <Header title={'Vendor Products'} subtitle={`Manage products`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <Link href={route('vendor.products.create')} className={buttonVariants({ variant: 'default' })}>
                                Create New Product
                            </Link>
                            <Search URL={route('vendor.products.index')} />
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No.</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Vendor</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.data.map((product, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{++index + (products.current_page - 1) * products.per_page}</TableCell>
                                                <TableCell>
                                                    <Image
                                                        width={100}
                                                        className="aspect-[16/9] w-full rounded-2xl border object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                                        src={product.image}
                                                    />
                                                </TableCell>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{formatRupiah(product.price)}</TableCell>
                                                <TableCell>{product.vendor.name}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('vendor.products.edit', product.slug)}
                                                            className={buttonVariants({ size: 'sm', variant: 'default' })}
                                                        >
                                                            Edit
                                                        </Link>

                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                ask({
                                                                    url: route('vendor.products.destroy', [product.slug]),
                                                                    method: 'delete',
                                                                    icon: 'warning',
                                                                    message: 'Are you sure you want to delete this Product?',
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

                                <Pagination links={products.links} />
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

ProductIndex.layout = (page) => <VendorLayout children={page} />;
