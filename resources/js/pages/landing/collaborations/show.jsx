// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import { formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import CollaborationCard from './collaboration-card';

export default function CollaborationShow() {
    const { auth, collaborations, collaboration, reviews } = usePage().props;

    const addToCartHandler = (e) => {
        e.preventDefault();
        router.post(`/user/checkout-collaboration/${collaboration.id}`);
    };

    return (
        <>
            <Head title="Collaboration Details" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Collaboration', url: '/Collaborations' },
                            { label: 'Collaboration Details', url: '' },
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
                                            src={'/storage/' + collaboration.image}
                                        ></Image>
                                    </div>
                                    <div className="mt-6 flex flex-col md:mt-0">
                                        <h1 className="mt-2 text-3xl font-semibold leading-none tracking-tight lg:text-4xl">{collaboration.name}</h1>
                                        <p className="my-3 text-sm text-red-600">{collaboration.technician.name}</p>
                                        <p className="text-2xl font-semibold lg:text-3xl">{formatRupiah(collaboration.price)}</p>
                                        <div className="mt-4 text-sm leading-relaxed tracking-tighter text-muted-foreground lg:text-base">
                                            {collaboration.description}
                                        </div>
                                        <div className="mt-6 grid grid-cols-2 gap-2">
                                            <form onSubmit={addToCartHandler} className="w-full">
                                                <Button type="submit">Buy Now</Button>
                                                {/* <Button type="submit">Search</Button> */}
                                            </form>
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
                                {collaborations.length > 0 ? (
                                    collaborations.map((collaboration) => (
                                        <CollaborationCard key={collaboration.id} collaboration={collaboration} /> // Gunakan TechnicianCard di sini
                                    ))
                                ) : (
                                    <p>No Collaboration found.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

CollaborationShow.layout = (page) => <AppLayout children={page} />;
