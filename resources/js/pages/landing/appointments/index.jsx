// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Search, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import { PaginationComponent } from '@/components/pagination';
import AppointmentTechnicianCard from './technician-card';
import { Header } from '@/components/header';

export default function AppointmentIndex() {
    const { auth, technicians } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('landing.appointments.index', { search: searchQuery }));
    };

    return (
        <>
            <Head title="Appointments" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Appointments', url: '/appointments' },
                        ]}
                    />
                    <Header title={"Appointments"} subtitle={"Make Appointments with Technicians"}>

                    </Header>
                    <div className="mx-auto sm:px-6 lg:px-8 lg:py-14">

                        <div>
                            <form onSubmit={handleSearchSubmit} className="w-full">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search technician or specialization..."
                                    />
                                    <Button size="icon" variant="secondary" type="submit" className="absolute border right-0 top-0">
                                        <Search />
                                    </Button>
                                </div>
                            </form>
                            <div className="mt-8">
                                <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                                    {technicians.data.length > 0 ? (
                                        technicians.data.map((technician) => (
                                            <AppointmentTechnicianCard key={technician.id} technician={technician} /> // Gunakan TechnicianCard di sini
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
                </>
            </Container>
        </>
    );
}

AppointmentIndex.layout = (page) => <AppLayout children={page} />;
