// table.jsx
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSwal from '@/hooks/useSwal';
import { Image as ImageIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function VendorTable({ vendors }) {

    const { ask } = useSwal();
    return (
        <Table>
            <TableCaption>List of Vendors</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vendors.data.map((vendor) => (
                    <TableRow key={vendor.id}>
                        <TableCell>
                            <Avatar>
                                <div className="aspect-w-1 aspect-h-1">
                                    <AvatarImage src={vendor.image} alt={vendor.name} className="h-full w-full rounded-lg object-cover" />
                                </div>
                                <AvatarFallback><ImageIcon /></AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>{vendor.name}</TableCell>
                        <TableCell>{vendor.email}</TableCell>
                        <TableCell>{vendor.phone}</TableCell>
                        <TableCell>{formatDate(vendor.created_at)}</TableCell>
                        <TableCell>
                            <Link href={route('admin.vendors.show', vendor.id)} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}>
                                View
                            </Link>
                            <Link href={route('admin.vendors.edit', vendor.id)} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}>
                                Edit
                            </Link>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    ask({
                                        url: route('admin.vendors.destroy', [vendor.id]),
                                        method: 'delete',
                                        icon: 'warning',
                                        message: 'Are you sure you want to delete this Vendor?',
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
