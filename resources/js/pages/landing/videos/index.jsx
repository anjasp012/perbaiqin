// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Search as SearchIcon, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import Pagination from '@/shared/pagination';
import Search from '@/shared/search';
import VideoCard from './video-card';
import { Header } from '@/components/header';

export default function VideoIndex() {
    const { auth, videos } = usePage().props;

    return (
        <>
            <Head title="QuickLearn Videos" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'QuickLearn Videos', url: '/videos' },
                        ]}
                    />
                    <Header title={'QuickLearn Videos'} subtitle={`All QuickLearn Videos`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="flex justify-end">
                                    <Search URL={route('landing.videos.index')} />
                                </div>
                                <div className="mt-8">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {videos.data.length > 0 ? (
                                            videos.data.map((video) => (
                                                <VideoCard key={video.id} video={video} /> // Gunakan TechnicianCard di sini
                                            ))
                                        ) : (
                                            <p>No videos found.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Pagination links={videos.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

VideoIndex.layout = (page) => <AppLayout children={page} />;
