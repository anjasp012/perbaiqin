// components/TechnicianTable.jsx
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/lib/utils';

export default function TechnicianTable({ technicians, handleTechnicianDelete }) {
    return (
        <Table>
            <TableCaption>List of Technicians</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {technicians.data.map((technician) => (
                    <TableRow key={technician.id}>
                        <TableCell>
                            <Avatar>
                                <div className="aspect-w-1 aspect-h-1">
                                    <AvatarImage src={technician.image} alt={technician.name} className="h-full w-full rounded-lg object-cover" />
                                </div>
                                <AvatarFallback>{technician.initial}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{technician.name}</TableCell>
                        <TableCell>{technician.email}</TableCell>
                        <TableCell>{formatDate(technician.created_at)}</TableCell>
                        <TableCell>
                            {technician.email_verified_at == null ? (
                                <span className="text-red-500">Not Verified</span>
                            ) : (
                                <span className="text-green-500">Verified</span>
                            )}
                        </TableCell>
                        <TableCell>
                            {technician.email_verified_at == null ? (
                                <Link
                                    href={route('admin.technicians.verified', technician.slug)}
                                    className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2 bg-green-500 hover:bg-green-600/90'}
                                >
                                    Verified Now
                                </Link>
                            ) : (
                                ''
                            )}
                            <Link
                                href={route('admin.technicians.show', technician.slug)}
                                className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}
                            >
                                View
                            </Link>
                            <Link
                                href={route('admin.technicians.edit', technician.slug)}
                                className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}
                            >
                                Edit
                            </Link>
                            <Button onClick={() => handleTechnicianDelete(technician.slug)} size="sm" variant="destructive">
                                Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
