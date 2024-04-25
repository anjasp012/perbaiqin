import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { AdminLayout } from '@/layouts/admin-layout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SpecialistEdit({ specialist }) {
    const { data, setData, post, errors, processing } = useForm({
        name: specialist.name,
        description: specialist.description,
        image: null, // Menambahkan state untuk gambar
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Membuat objek FormData untuk mengirim data dan file gambar
        const formData = new FormData();
        formData.append('_method', data._method); // Method PUT
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('image', data.image); // Menambahkan gambar ke FormData

        post(route('admin.specialists.update', specialist.slug), formData); // Mengirimkan formData
    };

    return (
        <>
            <Head title="Edit Specialist" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Edit Specialist</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                        errors.name ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                            </div>
                            <div className="sm:col-span-6">
                                <Label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                        errors.description ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                            </div>
                            <div className="sm:col-span-6">
                                <Label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                    Image
                                </Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])} // Mengambil file yang diunggah
                                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                                        errors.image ? 'border-red-500' : ''
                                    }`}
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                            </div>
                        </div>
                        <div className="mt-8">
                            <Button type="submit" variant="default" disabled={processing}>
                                {processing ? 'Processing...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

SpecialistEdit.layout = (page) => <AdminLayout children={page} />;
