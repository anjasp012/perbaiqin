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
import ProductCard from './technician-card';
import { Header } from '@/components/header';
import TechnicianCard from './technician-card';

export default function TechSpeciality() {
    const { auth, technicians, specialist } = usePage().props;
    console.log(technicians);
    return (
        <>
            <Head title={specialist.name} />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Ask Technician', url: route('landing.ask-technician.index') },
                            { label: specialist.name, url: route('landing.technician.specialist.show', specialist.slug) },
                        ]}
                    />
                    <Header title={specialist.name} subtitle={`Specialist of ${specialist.name}`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="relative">
                                    <Search URL={route('landing.technician.specialist.show', specialist.slug)} />
                                </div>
                                <div className="mt-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {technicians && technicians.data && technicians.data.length > 0 ? (
                                            technicians.data.map((technician) => (
                                                <TechnicianCard key={technician.id} technician={technician} /> // Gunakan TechnicianCard di sini
                                            ))
                                        ) : (
                                            <p>No technicians found.</p>
                                        )}

                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Pagination links={technicians.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

TechSpeciality.layout = (page) => <AppLayout children={page} />;
