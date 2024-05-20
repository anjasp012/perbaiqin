import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
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
import Breadcrumb from '@/components/breadcrumb';
import { Badge } from '@/components/ui/badge';

export default function AppointmentIndex() {
    const { auth, appointments } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Appointment" />
            <Container>
                <>
                    <Header title={'Appointments History'} subtitle={`Manage Appointments history`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <h2 className="text-lg font-bold">Appointments History</h2>
                            <Search URL={route('user.appointments.index')} />
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No.</TableHead>
                                            <TableHead>Technician Id</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Time</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Action</TableHead>
                                            {/* <TableHead>Transaction Date</TableHead>
                                            <TableHead>Vendor</TableHead>
                                            <TableHead>Actions</TableHead> */}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {appointments.data.map((appointment, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{appointment.id}</TableCell>
                                                <TableCell>{appointment.technician.name}</TableCell>
                                                <TableCell>{appointment.date}</TableCell>
                                                <TableCell>{appointment.time}</TableCell>
                                                <TableCell>
                                                    <Badge>{appointment.status}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('user.appointments.show', appointment.id)}
                                                            className={buttonVariants({ size: 'sm', variant: 'default' })}
                                                        >
                                                            Details
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <Pagination links={appointments.links} />
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

AppointmentIndex.layout = (page) => <UserLayout children={page} />;
