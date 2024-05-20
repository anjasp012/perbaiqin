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
import { ChevronDown, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn, formatDateTime } from '@/lib/utils';
import useSwal from '@/hooks/useSwal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AppointmentIndex = ({ appointments }) => {
    const { ask } = useSwal();
    return (
        <Container>
            <Head title="Appointments"></Head>
            <Header title={`Appointments`} subtitle={'Appointments request list'} />
            <div className="mt-5">
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

                                            <TableCell>
                                                <Badge>{appointment.status}</Badge>
                                            </TableCell>
                                            <TableCell>{formatDateTime(appointment.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'tracking-tighter')}>
                                                            Action
                                                            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-40">
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    onClick={() =>
                                                                        ask({
                                                                            url: route('technician.appointments.update', appointment.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'pending' },
                                                                            message: 'Are you sure you want to Pending this Appointment?',
                                                                        })
                                                                    }
                                                                >
                                                                    Pending
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    onClick={() =>
                                                                        ask({
                                                                            url: route('technician.appointments.update', appointment.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'accepted' },
                                                                            message: 'Are you sure you want to Accept this Appointment?',
                                                                        })
                                                                    }
                                                                >
                                                                    Accept
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    onClick={() =>
                                                                        ask({
                                                                            url: route('technician.appointments.update', appointment.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'rejected' },
                                                                            message: 'Are you sure you want to Reject this Appointment?',
                                                                        })
                                                                    }
                                                                >
                                                                    Reject
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    onClick={() =>
                                                                        ask({
                                                                            url: route('technician.appointments.update', appointment.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'canceled' },
                                                                            message: 'Are you sure you want to Cancel this Appointment?',
                                                                        })
                                                                    }
                                                                >
                                                                    Cancel
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    onClick={() =>
                                                                        ask({
                                                                            url: route('technician.appointments.update', appointment.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'completed' },
                                                                            message: 'Are you sure you want to Complete this Appointment?',
                                                                        })
                                                                    }
                                                                >
                                                                    Complete
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
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
