import React from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import { Image } from '@/components/image';
import swal from 'sweetalert';
import Breadcrumb from '@/components/breadcrumb';
import { formatRupiah } from '@/lib/utils';

export default function TechnicianShow({ technician }) {
    const { post } = useForm();

    const handleConsultation = () => {
        swal({
            title: 'Are you sure?',
            text: `You are about to start consultation with ${technician.name}`,
            icon: 'info',
            buttons: ['Cancel', 'Confirm'],
            dangerMode: false,
        }).then((willConsult) => {
            if (willConsult) {
                post(`/user/create-consultation/${technician.slug}`);
            }
        });
    };

    return (
        <>
            <Head title={`Ask with : ${technician.name}`} />
            <Container>
                <Breadcrumb
                    links={[
                        { label: 'Home', url: '/' },
                        { label: 'Ask Technician', url: '/ask-technician' },
                        { label: technician.name, url: '#' },
                    ]}
                />
                <div className="mb-4 mt-4 rounded-xl lg:mb-16">
                    <div className="grid p-10 lg:grid-cols-6 lg:gap-24">
                        <div className="lg:col-span-3  lg:block">
                            <Image
                                className="mb-3 h-auto w-full rounded-2xl border-4 bg-white object-cover object-center dark:bg-gray-700 lg:h-[26rem]"
                                src={technician.image}
                                alt={technician.name}
                            />
                        </div>
                        <div className="mt-4 flex h-full flex-col pl-4 pr-4 lg:col-span-3">
                            <div className="flex-1">
                                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{technician.name}</h2>
                                <div className="mt-2">
                                    <h6 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">Specializations</h6>
                                    {technician.specialists.map((specialist) => (
                                        <span key={specialist.id} className="mb-2 mr-2 inline-block rounded-md bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700">
                                            {specialist.name}
                                        </span>
                                    ))}
                                </div>
                                <p className="mb-3 mt-6 text-lg leading-8 text-muted-foreground">{formatRupiah(technician.price)}</p>
                                <Button onClick={handleConsultation} className={buttonVariants({ variant: 'default' })}>
                                    Consultation Now!
                                </Button>
                            </div>
                            <div className="rounded-lg bg-gray-200 px-2 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                                <h6 className="mb-3 border-b pb-2 text-sm font-bold ">Contact Information</h6>
                                <div className="grid grid-cols-12 text-sm">
                                    <div className="col-span-3">City</div>
                                    <div className="col-span-1">:</div>
                                    <div className="col-span-8">{technician.city}</div>
                                </div>
                                <div className="grid grid-cols-12 text-sm">
                                    <div className="col-span-3">Country</div>
                                    <div className="col-span-1">:</div>
                                    <div className="col-span-8">{technician.country}</div>
                                </div>
                                <div className="grid grid-cols-12 text-sm">
                                    <div className="col-span-3">Address</div>
                                    <div className="col-span-1">:</div>
                                    <div className="col-span-8">{technician.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

TechnicianShow.layout = (page) => <AppLayout children={page} />;
