// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import Pagination from '@/shared/pagination';
import Search from '@/shared/search';
import { Header } from '@/components/header';

export default function SpecialistIndex() {
    const { auth, specialists } = usePage().props;

    return (
        <>
            <Head title="Specialists" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Specialists', url: '/specialists' },
                        ]}
                    />
                    <Header title={'Specialists'} subtitle={`Specializations of technicians PerbaiQin`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="relative">
                                    <Search URL={route('landing.specialists.index')} />
                                </div>
                                <div className="mt-8">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {specialists.data.length > 0 ? (
                                            specialists.data.map((specialist) => (
                                                <Link key={specialist.id} href={route('landing.technician.specialist.show', specialist.slug)} >
                                                    <div className="my-4 rounded-md border  p-4">
                                                        <h3 className="text-lg font-semibold">{specialist.name}</h3>
                                                        <p className="text-gray-600">{specialist.description}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p>No specialists found.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Pagination links={specialists.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

SpecialistIndex.layout = (page) => <AppLayout children={page} />;
