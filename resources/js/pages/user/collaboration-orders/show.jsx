import React, { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, formatRupiah } from '@/lib/utils';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';
import { UserLayout } from '@/layouts/user/user-layout';
import { Image } from '@/components/image';
import Breadcrumb from '@/components/breadcrumb';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronUp } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function TransactionIndex() {
    const { auth, transaction, transaction_details, totalPrice } = usePage().props;

    const { ask } = useSwal();

    const { data, setData, post, processing, errors } = useForm({
        rate: '',
        review: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, name === 'image' ? files[0] : value);
    };

    const handleSubmitRateReview = (id, slug) => (e) => {
        console.log(slug);
        e.preventDefault();
        post(route('user.collaborationreview.store', [id, slug]));
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
                                                {detail.reviewed == false && (
                                                    <TableCell className="text-center">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'tracking-tighter')}>
                                                                Rate & Review
                                                                <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-full">
                                                                <form onSubmit={handleSubmitRateReview(detail.id, detail.collaboration.slug)}>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="rate">Rate</Label>
                                                                        <Input name="rate" onChange={handleChange} id="rate" type="number" min="1" max="5" />
                                                                    </div>
                                                                    <div className="mb-3">
                                                                        <Label htmlFor="review">Review</Label>
                                                                        <Textarea name="review" onChange={handleChange} id="review" />
                                                                    </div>
                                                                    <div className="mb-0">
                                                                        <Button className="w-full">Save </Button>
                                                                    </div>
                                                                </form>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                )}
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
