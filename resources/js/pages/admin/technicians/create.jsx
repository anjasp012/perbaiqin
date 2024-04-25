import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/container';
import { AdminLayout } from '@/layouts/admin-layout';
import { Label } from '@/components/ui/label';

export default function TechnicianCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        phone: '',
        price: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, name === 'image' ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.technicians.store'));
    };

    return (
        <>
            <Head title="Create Technician" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold">Create Technician</h1>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <Label> Name </Label>
                                <Input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Name" error={errors.name} />
                                {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                            </div>
                            <div className="mb-3">
                                <Label> Name </Label>
                                <Input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" error={errors.email} />
                                {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <Label> Password </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    error={errors.password}
                                />
                                {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
                            </div>
                            <div className="mb-3">
                                <Label> Phone </Label>
                                <Input type="number" name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" error={errors.phone} />
                                {errors.phone && <span className="text-sm text-red-500">{errors.phone}</span>}
                            </div>
                            <div className="mb-3">
                                <Label> Price </Label>
                                <Input type="number" name="price" value={data.price} onChange={handleChange} placeholder="Price" error={errors.price} />
                                {errors.price && <span className="text-sm text-red-500">{errors.price}</span>}
                            </div>
                            <div className="mb-3">
                                <Label> Image </Label>
                                <Input type="file" name="image" accept="image/*" onChange={handleChange} error={errors.image} />
                                {errors.image && <span className="text-sm text-red-500">{errors.image}</span>}
                            </div>
                            <div className="mt-6">
                                <Button type="submit" variant="default" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                            </div>
                        </form>{' '}
                    </div>
                </div>
            </Container>
        </>
    );
}

TechnicianCreate.layout = (page) => <AdminLayout children={page} />;
