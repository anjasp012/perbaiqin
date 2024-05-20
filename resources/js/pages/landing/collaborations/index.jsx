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
import { Header } from '@/components/header';
import CollaborationCard from './collaboration-card';

export default function CollaborationIndex() {
    const { auth, collaborations } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('landing.collaborations.index', { search: searchQuery }));
    };

    return (
        <>
            <Head title="Collaborations" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Collaborations', url: '/collaborations' },
                        ]}
                    />
                    <Header title={'Collaborations Fix Up'} subtitle={`collaborations fix up`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="flex justify-end">
                                    <Search URL={route('landing.collaborations.index')} />
                                </div>
                                <div className="mt-8">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {collaborations.data.length > 0 ? (
                                            collaborations.data.map((collaboration) => (
                                                <CollaborationCard key={collaboration.id} collaboration={collaboration} /> // Gunakan TechnicianCard di sini
                                            ))
                                        ) : (
                                            <p>No collaborations found.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Pagination links={collaborations.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

CollaborationIndex.layout = (page) => <AppLayout children={page} />;
