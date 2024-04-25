// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { VendorLayout } from '@/layouts/vendor/vendor-layout';


export default function DashboardVendorIndex() {
    const { auth } = usePage().props;
    return (
        <>
            <Head title="Dashboard" />
            <Container>
                <>
                    <Header title={'Vendor Dashboard'} subtitle={`You are logged in as vendor, ${auth.vendor.name}`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="mt-2">
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

DashboardVendorIndex.layout = (page) => <VendorLayout children={page} />;
