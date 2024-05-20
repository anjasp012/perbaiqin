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
import { formatDateTime } from '@/lib/utils';
import useSwal from '@/hooks/useSwal';
import { AdminLayout } from '@/layouts/admin-layout';

const CertificateIndex = ({ certificates, technician }) => {
    const { ask } = useSwal();
    return (
        <Container>
            <Head title="Certificates"></Head>
            <Header title={`${technician.name} Certificates`} subtitle={'Certificates'} />
            <div className="mt-5">
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <Search URL={route('admin.technicians.certificates', technician.slug)} />
                    </div>
                    <Card className="border-none">
                        <CardHeader></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Certificate Name/Title</TableHead>
                                        <TableHead>Uploaded at</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {certificates.data.map((certificate, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{++index + (certificates.current_page - 1) * certificates.per_page}</TableCell>

                                            <TableCell>{certificate.name}</TableCell>
                                            <TableCell>{formatDateTime(certificate.created_at)}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <a
                                                        target="_blank"
                                                        href={'/storage/' + certificate.certificate}
                                                        className={buttonVariants({ variant: 'secondary' })}
                                                    >
                                                        View
                                                    </a>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() =>
                                                            ask({
                                                                url: route('technician.certificates.destroy', certificate.id),
                                                                method: 'delete',
                                                                icon: 'warning',
                                                                message: 'Are you sure you want to delete this Product?',
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

                            <Pagination links={certificates.links} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default CertificateIndex;
CertificateIndex.layout = (page) => <AdminLayout children={page} />;
