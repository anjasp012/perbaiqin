import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import Pagination from '@/shared/pagination';
import ProductTable from './table';
export default function ProductIndex() {
    const { auth, products } = usePage().props;

    return (
        <>
            <Head title="Products" />
            <Container>
                <Header title={'Products'} subtitle={'Manage products'} />
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-end">
                        <Search URL={route('admin.products.index')} />
                        {/* <Link href={route('admin.products.create')} className={buttonVariants({ variant: 'default' })}>
                            Create Product
                        </Link> */}
                    </div>
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Products</h2>
                        <ProductTable products={products} />
                        <div className="mt-4">
                            <Pagination links={products.links} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

ProductIndex.layout = (page) => <AdminLayout children={page} />;
