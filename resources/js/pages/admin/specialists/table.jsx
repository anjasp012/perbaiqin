// table.jsx
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSwal from '@/hooks/useSwal';

export default function SpecialityTable({ specialists }) {

    const { ask } = useSwal();
    return (
        <Table>
            <TableCaption>List of Specialist</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Descriptions</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {specialists.data.map((specialist) => (
                    <TableRow key={specialist.id}>
                        <TableCell>
                            <Avatar>
                                <div className="aspect-w-1 aspect-h-1">
                                    <AvatarImage src={specialist.image} alt={specialist.name} className="h-full w-full rounded-lg object-cover" />
                                </div>
                                <AvatarFallback>{specialist.name}</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{specialist.name}</TableCell>
                        <TableCell>{specialist.description}</TableCell>
                        <TableCell>
                            <Link href={route('admin.specialists.show', specialist.slug)} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}>
                                View
                            </Link>
                            <Link href={route('admin.specialists.edit', specialist.slug)} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}>
                                Edit
                            </Link>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    ask({
                                        url: route('admin.specialists.destroy', [specialist.slug]),
                                        method: 'delete',
                                        icon: 'warning',
                                        message: 'Are you sure you want to delete this Specialization?',
                                    })
                                }
                            >
                                <span>Delete</span>
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
