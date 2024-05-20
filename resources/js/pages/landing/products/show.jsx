// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import { formatRupiah } from '@/lib/utils';
import ProductCard from './product-card';
import { Image } from '@/components/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

export default function ProductShow() {
    const { auth, products, product, reviews, vendor } = usePage().props;

    console.log(product);

    const addToCartHandler = (e) => {
        e.preventDefault();
        {
            auth.technician != null ? router.post(`/technician/cart/${product.id}`) : '';
        }
        {
            auth.user != null ? router.post(`/user/cart/${product.id}`) : '';
        }
    };

    return (
        <>
            <Head title="Products Details" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Products', url: '/products' },
                            { label: 'Products Details', url: '' },
                        ]}
                    />
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="grid gap-y-2 py-0 lg:grid-cols-2 lg:gap-16 lg:py-10">
                                    <div className="-mx-4 -mt-4 md:mx-0 lg:mt-0">
                                        <Image
                                            skeletonHeight="1024"
                                            width="1024"
                                            height="1024"
                                            // className="size-full rounded-none object-cover object-center md:rounded-lg lg:rounded-2xl"
                                            className="aspect-[1/1] size-full w-full rounded-2xl border  object-cover sm:aspect-[1/1] lg:aspect-[1/1]"
                                            src={`${product.image}`}
                                        ></Image>
                                    </div>
                                    <div className="mt-6 flex h-full w-full flex-col justify-between md:mt-0">
                                        <div>
                                            <h1 className="mt-2 text-3xl font-semibold leading-none tracking-tight lg:text-4xl">{product.name}</h1>
                                            <p className="my-3 text-sm text-red-600">{product.vendor.name}</p>
                                            <p className="text-2xl font-semibold lg:text-3xl">{formatRupiah(product.price)}</p>
                                            <div className="mt-4 text-sm leading-relaxed tracking-tighter text-muted-foreground lg:text-base">
                                                {product.description}
                                            </div>
                                            <div className="mt-6 grid grid-cols-2 gap-2">
                                                <form onSubmit={addToCartHandler} className="w-full">
                                                    <Button type="submit">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            className="mr-2"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                stroke:inejoin="round"
                                                                strokeWidth="1.5"
                                                                d="M15.25 7.75V6a3.25 3.25 0 0 0-6.5 0v1.75m3.5 13.5H5.409a1 1 0 0 1-.99-1.146l1.705-11.5a1 1 0 0 1 .989-.854h9.774a1 1 0 0 1 .99.853l.65 4.397m-.277 3.25v3m0 0v3m0-3h-3m3 0h3"
                                                            ></path>
                                                        </svg>
                                                        Add to Cart
                                                    </Button>
                                                    {/* <Button type="submit">Search</Button> */}
                                                </form>
                                            </div>
                                        </div>
                                        <div className="rounded-lg bg-gray-200 px-2 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                                            <h6 className="mb-3 border-b pb-2 text-sm font-bold">Vendor Information</h6>
                                            <div className="grid grid-cols-12 text-sm">
                                                <div className="col-span-3">Phone</div>
                                                <div className="col-span-1">:</div>
                                                <div className="col-span-8">{vendor.phone}</div>
                                            </div>
                                            <div className="grid grid-cols-12 text-sm">
                                                <div className="col-span-3">City</div>
                                                <div className="col-span-1">:</div>
                                                <div className="col-span-8">{vendor.city}</div>
                                            </div>
                                            <div className="grid grid-cols-12 text-sm">
                                                <div className="col-span-3">Country</div>
                                                <div className="col-span-1">:</div>
                                                <div className="col-span-8">{vendor.city}</div>
                                            </div>
                                            <div className="grid grid-cols-12 text-sm">
                                                <div className="col-span-3">Address</div>
                                                <div className="col-span-1">:</div>
                                                <div className="col-span-8">{vendor.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="mb-6 text-xl font-semibold leading-none tracking-tight">Reviews</h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {reviews.map((review, index) => (
                                    <Card key={index}>
                                        <CardHeader>
                                            {Array.from({ length: review.rate }, (_, starIndex) => (
                                                <span className="contents" key={starIndex}>
                                                    ⭐
                                                </span>
                                            ))}
                                        </CardHeader>
                                        <CardContent>{review.review}</CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                        <div className="mt-10">
                            <h3 className="mb-6 text-xl font-semibold leading-none tracking-tight">You May Also Like</h3>
                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                {products.length > 0 ? (
                                    products.map((product) => (
                                        <ProductCard key={product.id} product={product} /> // Gunakan TechnicianCard di sini
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

ProductShow.layout = (page) => <AppLayout children={page} />;
