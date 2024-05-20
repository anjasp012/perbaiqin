import React, { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';
import { UserLayout } from '@/layouts/user/user-layout';
import { Image } from '@/components/image';
import Breadcrumb from '@/components/breadcrumb';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function AppointmentShow() {
    const { auth, appointment } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        rate: '',
        review: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, name === 'image' ? files[0] : value);
    };

    const handleSubmitRateReview = () => (e) => {
        e.preventDefault();
        post(route('user.technicianreview.store', [appointment.id]));
    };

    const { ask } = useSwal();
    return (
        <>
            <Head title="Appointment" />
            <Container>
                <>
                    <Header title={'Appointment'} subtitle={`Appointment Details`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="flex">
                            <div className="mb-8 flex w-7/12 justify-between">
                                <h2 className="text-lg font-bold">Appointment details</h2>
                            </div>

                            {appointment.status == 'completed' && (
                                <div className="mb-8 flex w-5/12 justify-between">
                                    <h2 className="text-lg font-bold">Video</h2>
                                </div>
                            )}
                        </div>
                        <Card className="mb-20 border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <div className="flex">
                                    <div className="grid w-7/12 grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                        <div className="space-y-1 sm:col-span-3">
                                            <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                                <div className="space-y-1 sm:col-span-3">
                                                    <label
                                                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="company"
                                                    >
                                                        Technician Name
                                                    </label>
                                                </div>
                                                <div className="space-y-1 sm:col-span-1">:</div>
                                                <div className="space-y-1 sm:col-span-3">
                                                    <div className="font-bold">{appointment.technician.name}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                                <div className="space-y-1 sm:col-span-3">
                                                    <label
                                                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="company"
                                                    >
                                                        Appointment Date
                                                    </label>
                                                </div>
                                                <div className="space-y-1 sm:col-span-1">:</div>
                                                <div className="space-y-1 sm:col-span-3">
                                                    <div className="font-bold">{appointment.date}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                                <div className="space-y-1 sm:col-span-3">
                                                    <label
                                                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="company"
                                                    >
                                                        Appointment Time
                                                    </label>
                                                </div>
                                                <div className="space-y-1 sm:col-span-1">:</div>
                                                <div className="space-y-1 sm:col-span-3">
                                                    <div className="font-bold">{appointment.time}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 items-center gap-x-4 gap-y-6 sm:grid-cols-7">
                                                <div className="space-y-1 sm:col-span-3">
                                                    <label
                                                        className="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                        htmlFor="company"
                                                    >
                                                        Appointment Status
                                                    </label>
                                                </div>
                                                <div className="space-y-1 sm:col-span-1">:</div>
                                                <div className="space-y-1 sm:col-span-3">
                                                    <div className="font-bold">{appointment.status}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {appointment.status == 'completed' && appointment.video ? '' : 'belum ada video '}
                                </div>
                            </CardContent>
                        </Card>
                        {appointment.status == 'completed' ? (
                            appointment.reviewed ? (
                                ''
                            ) : (
                                <>
                                    <div className="mb-8 flex w-5/12 justify-between">
                                        <h2 className="text-lg font-bold">Rate & Reviews</h2>
                                    </div>
                                    <form onSubmit={handleSubmitRateReview()}>
                                        <div className="mb-3">
                                            <Label htmlFor="rate">Rate</Label>
                                            <Input name="rate" onChange={handleChange} id="rate" type="number" min="1" max="5" />
                                        </div>
                                        <div className="mb-3">
                                            <Label htmlFor="review">Review</Label>
                                            <Textarea name="review" onChange={handleChange} id="review" />
                                        </div>
                                        <div className="mb-0">
                                            <Button className="w-full">Save </Button>
                                        </div>
                                    </form>
                                </>
                            )
                        ) : (
                            ''
                        )}
                    </div>
                </>
            </Container>
        </>
    );
}

AppointmentShow.layout = (page) => <UserLayout children={page} />;
