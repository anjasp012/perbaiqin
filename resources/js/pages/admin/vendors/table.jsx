// table.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSwal from '@/hooks/useSwal';
import { ChevronDown, Image as ImageIcon } from 'lucide-react';
import { cn, formatDate } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DocumentModal from './document-modal';

export default function VendorTable({ vendors }) {
    const { ask } = useSwal();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState(false);
    const [image, setImage] = useState(false);
    const handleDocumentModal = (e, name, image) => {
        e.preventDefault();
        setShowModal(true);
        setName(name);
        setImage(image);
    };
    return (
        <>
            <Table>
                <TableCaption>List of Vendors</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Store Name</TableHead>
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
                                    <AvatarFallback>
                                        <ImageIcon />
                                    </AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>{vendor.full_name}</TableCell>
                            <TableCell>{vendor.name}</TableCell>
                            <TableCell>{vendor.email}</TableCell>
                            <TableCell>{vendor.phone}</TableCell>
                            <TableCell>{formatDate(vendor.created_at)}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'me-2 tracking-tighter')}>
                                        Document
                                        <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem asChild>
                                            <Link onClick={(e) => handleDocumentModal(e, 'Ktp ' + vendor.full_name, vendor.ktp)}>Ktp</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
            {showModal && <DocumentModal setShowModal={setShowModal} name={name} image={image} />}
        </>
    );
}
