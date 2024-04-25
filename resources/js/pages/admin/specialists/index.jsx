import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin-layout';
import SpecialityTable from './table';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import Pagination from '@/shared/pagination';

export default function SpecialistIndex() {
    const { specialists } = usePage().props;
    return (
        <>
            <Head title="Specialists" />
            <Container>
                <Header title={'Specialists'} subtitle={'Manage Specializations'}></Header>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                       
                       <Search URL={route('admin.specialists.index')}/>
                        <Link href={route('admin.specialists.create')} className={buttonVariants({ variant: 'default' })}>
                            Create Specialist
                        </Link>
                    </div>
                    <div className='w-full'>
                    <SpecialityTable specialists={specialists}  />
                    <Pagination links={specialists.links}/>
                    </div>

                </div>
            </Container>
        </>
    );
}

SpecialistIndex.layout = (page) => <AdminLayout children={page} />;
