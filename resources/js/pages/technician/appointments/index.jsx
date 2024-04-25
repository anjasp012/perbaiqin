import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Pagination from '@/shared/pagination';
import { User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';

const AppointmentIndex = ({ appointments }) => {
    return (
        <Container>
            <Head title='Appointments'></Head>
            <Header title={`Appointments`} subtitle={'Appointments request list'} />
            <div className='mt-5'>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 ">
                        <Search URL={route('technician.appointments.index')} />
                    </div>

                    <Card className="border-none">
                        <CardHeader></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Clients</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Created At</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {appointments.data.map((appointment, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{++index + (appointments.current_page - 1) * appointments.per_page}</TableCell>
                                            <TableCell className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Avatar className="mr-2">
                                                        <AvatarImage
                                                            src={appointment.user.avatar}
                                                            alt={appointment.user.name}
                                                            className="h-6 w-6 rounded-full border-2"
                                                        />
                                                        <AvatarFallback>
                                                            <UserIcon />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{appointment.user.name}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell><Badge>{appointment.status}</Badge></TableCell>
                                            <TableCell>{formatDateTime(appointment.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                              
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            ask({
                                                                url: route('technician.appointments.index'),
                                                                method: 'delete',
                                                                icon: 'warning',
                                                                message: 'Are you sure you want to delete this Product?',
                                                            })
                                                        }
                                                    >
                                                        <span>Change Status</span>
                                                    </Button>
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


            </div>
        </Container>
    );
};

export default AppointmentIndex;
AppointmentIndex.layout = (page) => <TechnicianLayout children={page} />;
