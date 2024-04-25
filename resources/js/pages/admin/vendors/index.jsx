import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import Pagination from '@/shared/pagination';
import VendorTable from './table';
export default function VendorIndex() {
    const { auth, vendors } = usePage().props;

    return (
        <>
            <Head title="Vendors" />
            <Container>
                <Header title={'Vendors'} subtitle={'Manage vendors'}/>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <Search URL={route('admin.vendors.index')}/>
                        <Link href={route('admin.vendors.create')} className={buttonVariants({ variant: 'default' })}>
                            Create Vendor
                        </Link>
                    </div>
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Vendors</h2>
                        <VendorTable vendors={vendors} />
                        <div className="mt-4">
                            <Pagination links={vendors.links} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

VendorIndex.layout = (page) => <AdminLayout children={page} />;
