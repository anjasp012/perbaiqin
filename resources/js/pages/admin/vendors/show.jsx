import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { AdminLayout } from '@/layouts/admin-layout';
import Select from 'react-select';
import { Button } from '@/components/ui/button';

export default function VendorShow() {
    const { vendor } = usePage().props;
    return (
        <>
            <Head title={`Vendor: ${vendor.name}`} />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold">Vendor Details</h1>
                    </div>
                    <div className="overflow-hidden">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Profile Information</h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{vendor.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{vendor.email}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{vendor.phone}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Address</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{vendor.address}</dd>
                                </div>
                                {vendor.image && (
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Profile Picture</dt>
                                        <dd className="mt-1 flex items-center">
                                            <img src={vendor.image} alt={vendor.name} className="h-12 w-12 rounded-full object-cover" />
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

VendorShow.layout = (page) => <AdminLayout children={page} />;
