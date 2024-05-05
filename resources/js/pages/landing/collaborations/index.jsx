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
import ProductCard from './product-card';
import { Header } from '@/components/header';

export default function ProductIndex() {
    const { auth, products } = usePage().props;
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get(route('landing.products.index', { search: searchQuery }));
    };

    return (
        <>
            <Head title="Products" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Products', url: '/products' },
                        ]}
                    />
                    <Header title={'Products'} subtitle={`Products of vendors`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="flex justify-end">
                                    <Search URL={route('landing.products.index')} />
                                </div>
                                <div className="mt-8">
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                        {products.data.length > 0 ? (
                                            products.data.map((product) => (
                                                <ProductCard key={product.id} product={product} /> // Gunakan TechnicianCard di sini
                                            ))
                                        ) : (
                                            <p>No products found.</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Pagination links={products.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

ProductIndex.layout = (page) => <AppLayout children={page} />;
