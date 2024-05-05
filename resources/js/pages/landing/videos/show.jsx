// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import { formatRupiah } from '@/lib/utils';
import ProductCard from './video-card';
import { Image } from '@/components/image';
import VideoCard from './video-card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProductShow() {
    const { auth, videos, video } = usePage().props;

    return (
        <>
            <Head title="Play Video" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Videos', url: '/videos' },
                            { label: 'Play Video', url: '' },
                        ]}
                    />
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="grid gap-y-2 py-0 lg:grid-cols-12 lg:gap-16 lg:py-10">
                                    <div className="-mx-4 -mt-4 md:col-span-9 md:mx-0 lg:mt-0">
                                        <video className="mb-4 aspect-video w-full rounded-lg" controls>
                                            <source src={`/storage/${video.file_video}`} type="video/mp4" />
                                        </video>
                                        <h1 className="mb-4 text-3xl font-bold">{video.captions}</h1>
                                        <div className="flex items-center">
                                            <Avatar className="h-4 w-4 border-2 lg:ml-4 lg:mr-4 lg:h-14 lg:w-14">
                                                {video.technician.image ? (
                                                    <>
                                                        <AvatarImage
                                                            src={video.technician.image}
                                                            alt={video.technician.name}
                                                            className="h-14 w-14 rounded-full object-cover lg:h-24 lg:w-24"
                                                        />
                                                        <AvatarFallback>{video.technician.initial}</AvatarFallback>
                                                    </>
                                                ) : (
                                                    <AvatarFallback>{video.technician.initial}</AvatarFallback>
                                                )}
                                            </Avatar>
                                            <div>{video.technician.name}</div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex flex-col md:col-span-3 md:mt-0">
                                        <h3 className="mb-6 text-xl font-semibold leading-none tracking-tight">Other Videos</h3>
                                        {videos.length > 0 ? (
                                            videos.map((video) => (
                                                <div className="mb-3" key={video.id}>
                                                    <VideoCard video={video} />
                                                </div>
                                            ))
                                        ) : (
                                            <p>No videos found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

ProductShow.layout = (page) => <AppLayout children={page} />;
