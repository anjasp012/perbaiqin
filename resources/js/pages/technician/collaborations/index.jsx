import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { AppLayout } from '@/layouts/app-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';

export default function CollaborationIndex() {
    const { auth, collaborations } = usePage().props;

    const { ask } = useSwal();
    return (
        <>
            <Head title="Dashboard" />
            <Container>
                <>
                    <Header title={'Technician collaborations'} subtitle={`Manage collaborations`}></Header>
                    <div className="px-4 py-6 sm:px-6 lg:p-8">
                        <div className="mb-8 flex justify-between">
                            <Search URL={route('technician.collaborations.index')} />
                            <Link href={route('technician.collaborations.create')} className={buttonVariants({ variant: 'default' })}>
                                Create New collaboration
                            </Link>
                        </div>
                        <Card className="border-none">
                            <CardHeader></CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>No.</TableHead>
                                            <TableHead>Image</TableHead>
                                            <TableHead>Collaboration Name</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Technician</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {collaborations.data.map((collaboration, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{++index + (collaborations.current_page - 1) * collaborations.per_page}</TableCell>
                                                <TableCell>
                                                    <Image
                                                        width={100}
                                                        className="aspect-[16/9] w-full rounded-2xl border object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                                        src={'/storage/' + collaboration.image}
                                                    />
                                                </TableCell>
                                                <TableCell>{collaboration.name}</TableCell>
                                                <TableCell>{formatRupiah(collaboration.price)}</TableCell>
                                                <TableCell>{collaboration.technician.name}</TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route('technician.collaborations.edit', collaboration.slug)}
                                                            className={buttonVariants({ size: 'sm', variant: 'default' })}
                                                        >
                                                            Edit
                                                        </Link>

                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            onClick={() =>
                                                                ask({
                                                                    url: route('technician.collaborations.destroy', [collaboration.slug]),
                                                                    method: 'delete',
                                                                    icon: 'warning',
                                                                    message: 'Are you sure you want to delete this collaboration?',
                                                                })
                                                            }
                                                        >
                                                            <span>Delete</span>
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <Pagination links={collaborations.links} />
                            </CardContent>
                        </Card>
                    </div>
                </>
            </Container>
        </>
    );
}

CollaborationIndex.layout = (page) => <TechnicianLayout children={page} />;
