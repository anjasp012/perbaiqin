import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin-layout';
import Swal from 'sweetalert2';
import TechnicianTable from './table';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import Pagination from '@/shared/pagination';
export default function TechnicianIndex() {
    const { auth, technicians } = usePage().props;
    const { delete: handleDelete } = useForm();

    const handleTechnicianDelete = (slug) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(route('admin.technicians.destroy', slug));
            }
        });
    };

    return (
        <>
            <Head title="Technicians" />
            <Container>
                <Header title={'Techinians'} subtitle={'Manage Technicians'} />
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-end">
                        <Search URL={route('admin.technicians.index')} />
                        {/* <Link href={route('admin.technicians.create')} className={buttonVariants({ variant: 'default' })}>
                            Create Technician
                        </Link> */}
                    </div>
                    <div>
                        <h2 className="mb-4 text-lg font-semibold">Technicians</h2>
                        <TechnicianTable technicians={technicians} handleTechnicianDelete={handleTechnicianDelete} />

                        <div className="mt-4">
                            <Pagination links={technicians.links} />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

TechnicianIndex.layout = (page) => <AdminLayout children={page} />;
