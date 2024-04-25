// components/pages/AskTechnicianIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import { PaginationComponent } from '@/components/pagination';
import TechnicianCard from '@/components/technicians/TechnicianCard';
import { Header } from '@/components/header';

export default function AskTechnicianIndex() {
    const { auth, technicians, specialists } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('landing.ask-technician.index', { search: searchQuery }));
    };

    return (
        <>
            <Head title="Ask Technician" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Ask Technician', url: '/ask-technician' },
                        ]}
                    />
                    <Header title={'Ask Technician'} subtitle={'Find technicians to solve your gadget issues.'} />
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-4">
                                <div>
                                    {specialists.map((specialist) => (
                                        <Link key={specialist.id} href={route('landing.technician.specialist.show', specialist.slug)} >
                                            <div className="my-4 rounded-md border p-4">
                                                <h3 className="text-lg font-semibold">{specialist.name}</h3>
                                                <p className="text-gray-600">{specialist.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href={route('landing.specialists.index')} className={buttonVariants({ variant: 'default', size: 'sm' })}>
                                    See more specializations
                                </Link>
                            </div>
                            <div className="md:col-span-8">
                                <form onSubmit={handleSearchSubmit} className="w-full">
                                    <div className="relative">
                                        <Input
                                            type="text"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            placeholder="Search technician or specialization..."
                                        />
                                        <button type="submit" className="absolute right-0 top-0 mr-4 mt-2">
                                            <Search />
                                        </button>
                                    </div>
                                </form>
                                <div className="mt-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {technicians.data.length > 0 ? (
                                            technicians.data.map((technician) => (
                                                <TechnicianCard key={technician.id} technician={technician} /> // Gunakan TechnicianCard di sini
                                            ))
                                        ) : (
                                            <p>No technicians found.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <PaginationComponent links={technicians.links} meta={technicians.meta} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

AskTechnicianIndex.layout = (page) => <AppLayout children={page} />;
