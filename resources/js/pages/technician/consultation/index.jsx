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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import useSwal from '@/hooks/useSwal';

const TechnicianConsultationIndex = ({ consultations }) => {
    const { ask } = useSwal();
    return (
        <Container>
            <Head title="Consultation"></Head>
            <Header title={`Consultations`} subtitle={'Consultations request list'} />
            <div className="mt-5">
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex justify-between">
                        <Search URL={route('technician.consultations.index')} />
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
                                    {consultations.data.map((consultation, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{++index + (consultations.current_page - 1) * consultations.per_page}</TableCell>
                                            <TableCell className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <Avatar className="mr-2">
                                                        <AvatarImage
                                                            src={consultation.user.avatar}
                                                            alt={consultation.user.name}
                                                            className="h-6 w-6 rounded-full border-2"
                                                        />
                                                        <AvatarFallback>
                                                            <UserIcon />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{consultation.user.name}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Badge>{consultation.status}</Badge>
                                            </TableCell>
                                            <TableCell>{formatDateTime(consultation.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {consultation.status == 'ongoing' && (
                                                        <Link
                                                            href={route('technician.consultations.chat', consultation.id)}
                                                            className={buttonVariants({ size: 'sm', variant: 'secondary' })}
                                                        >
                                                            Go to Chat
                                                        </Link>
                                                    )}
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
                                                                            url: route('technician.consultations.update', consultation.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'pending' },
                                                                            message: 'Are you sure you want to Pending this Consultation?',
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
                                                                            url: route('technician.consultations.update', consultation.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'Ongoing' },
                                                                            message: 'Are you sure you want to Ongoing this Consultation?',
                                                                        })
                                                                    }
                                                                >
                                                                    Ongoing
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem asChild>
                                                                <Link
                                                                    onClick={() =>
                                                                        ask({
                                                                            url: route('technician.consultations.update', consultation.id),
                                                                            method: 'put',
                                                                            icon: 'warning',
                                                                            data: { status: 'completed' },
                                                                            message: 'Are you sure you want to Completed this Consultation?',
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

                            <Pagination links={consultations.links} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default TechnicianConsultationIndex;
TechnicianConsultationIndex.layout = (page) => <TechnicianLayout children={page} />;
