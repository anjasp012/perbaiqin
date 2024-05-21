// components/TechnicianTable.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@inertiajs/react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, formatDate } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import DocumentModal from './document-modal';

export default function TechnicianTable({ technicians, handleTechnicianDelete }) {
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
                                <DropdownMenu>
                                    <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'me-2 tracking-tighter')}>
                                        Document
                                        <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem asChild>
                                            <Link onClick={(e) => handleDocumentModal(e, 'Ktp ' + technician.name, technician.ktp)}>Ktp</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link onClick={(e) => handleDocumentModal(e, 'Ijazah ' + technician.name, technician.ijazah)}>Ijazah</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href={route('admin.technicians.certificates', technician.slug)}>Certificates</Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
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
            {showModal && <DocumentModal setShowModal={setShowModal} name={name} image={image} />}
        </>
    );
}
