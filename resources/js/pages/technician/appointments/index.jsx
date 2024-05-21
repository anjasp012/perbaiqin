import React, { useRef, useState } from 'react';
import { Link, Head, useForm } from '@inertiajs/react';
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
import { Input } from '@/components/ui/input';
import UploadVideoModal from './upload-video-modal';
import { constant } from 'lodash';

const AppointmentIndex = ({ appointments }) => {
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState('');
    const handleUploadVideoClick = (val) => {
        console.log(val);
        setShowModal(true);
        setId(val);
    };
    const { ask } = useSwal();
    const fileInputRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        video: null,
        _method: 'PUT',
    });

    const handleChange = (e) => {
        console.log('oke');
        const { name, value, files } = e.target;
        if (name === 'video') {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('video', data.video);
        post(route('technician.appointments.uploadVideo', id), formData);
        setShowModal(false);
        setId('');
    };

    return (
        <>
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
                                                        {appointment.status == 'completed' && appointment.video == '' && (
                                                            <>
                                                                <Button
                                                                    onClick={() => handleUploadVideoClick(appointment.id)}
                                                                    className={cn(buttonVariants({ size: 'sm' }), 'tracking-tighter')}
                                                                >
                                                                    Upload Video
                                                                </Button>
                                                            </>
                                                        )}
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
            {showModal && <UploadVideoModal setShowModal={setShowModal} handleChange={handleChange} handleSubmit={handleSubmit} />}
        </>
    );
};

export default AppointmentIndex;
AppointmentIndex.layout = (page) => <TechnicianLayout children={page} />;
