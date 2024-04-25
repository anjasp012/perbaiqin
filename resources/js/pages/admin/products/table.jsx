// table.jsx
import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSwal from '@/hooks/useSwal';
import { Image as ImageIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Image } from '@/components/image';

export default function VendorTable({ products }) {
    const { ask } = useSwal();
    return (
        <Table>
            <TableCaption>List of Vendors</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Created at</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.data.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <Avatar>
                                <div className="aspect-w-1 aspect-h-1">
                                    <AvatarImage src={product.image} alt={product.name} className="h-full w-full rounded-lg object-cover" />
                                </div>
                                <AvatarFallback>
                                    <ImageIcon />
                                </AvatarFallback>
                            </Avatar>

                            {/* <Image src={`/storage/products/${product.image}`} /> */}
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.vendor.name}</TableCell>
                        <TableCell>{formatDate(product.created_at)}</TableCell>
                        <TableCell>
                            <Link href={route('admin.products.show', product.id)} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}>
                                View
                            </Link>
                            <Link href={route('admin.products.edit', product.id)} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' me-2'}>
                                Edit
                            </Link>
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() =>
                                    ask({
                                        url: route('admin.products.destroy', [product.id]),
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
