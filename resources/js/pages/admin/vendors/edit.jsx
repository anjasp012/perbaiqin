import React, { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/container';
import { AdminLayout } from '@/layouts/admin-layout';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function VendorEdit({ vendor }) {
    const { data, setData, post, processing, errors } = useForm({
        name: vendor.name,
        email: vendor.email,
        password: '',
        phone: vendor.phone,
        address: vendor.address,
        image: null,
        _method: 'PUT',
    });

    useEffect(() => {
        setData('name', vendor.name);
        setData('email', vendor.email);
        setData('phone', vendor.phone);
        setData('address', vendor.address);
    }, [vendor]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, name === 'image' ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.vendors.update', vendor.id));
    };

    return (
        <>
            <Head title="Edit Vendor" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold">Edit Vendor</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="mb-3">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" value={data.name} onChange={handleChange} placeholder="Name" error={errors.name} />
                                {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="email">Email</Label>
                                <Input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" error={errors.email} />
                                {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input type="number" name="phone" value={data.phone} onChange={handleChange} placeholder="Phone" error={errors.phone} />
                                {errors.phone && <span className="text-sm text-red-500">{errors.phone}</span>}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="image">Image</Label>
                                <Input type="file" name="image" accept="image/*" onChange={handleChange} error={errors.image} />
                                {errors.image && <span className="text-sm text-red-500">{errors.image}</span>}
                            </div>
                            <div className="mb-3">
                                <Label htmlFor="address">Address</Label>
                                <Textarea name="address" value={data.address} onChange={handleChange} error={errors.address} />
                                {errors.address && <span className="text-sm text-red-500">{errors.address}</span>}
                            </div>
                        </div>
                        <div className="mt-6">
                            <Button type="submit" variant="default" disabled={processing}>
                                {processing ? 'Updating...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

VendorEdit.layout = (page) => <AdminLayout children={page} />;
