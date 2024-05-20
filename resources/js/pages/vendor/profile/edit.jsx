import React, { useEffect, useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { VendorLayout } from '@/layouts/vendor/vendor-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const EditProfile = ({ vendor }) => {
    const { data, setData, errors, post } = useForm({
        fullName: vendor.full_name,
        name: vendor.name,
        phone: vendor.phone,
        city: vendor.city,
        country: vendor.country,
        address: vendor.address,
        image: null,
        _method: 'PUT',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vendor.profile.update'), {
            onSuccess: () => {},
        });
    };

    return (
        <>
            <Container>
                <Head title="Profile"></Head>
                <Header title="Profile" subtitle={vendor.name}></Header>
                <div className="mt-3 max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your account's profile information.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <Label htmlFor="fullName">Full Name:</Label>
                                    <Input type="text" id="fullName" name="fullName" value={data.fullName} onChange={handleChange} />
                                    {errors.fullName && <div className="text-red-500">{errors.fullName}</div>}
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="name">Store Name:</Label>
                                    <Input type="text" id="name" name="name" value={data.name} onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="phone"> Phone Number:</Label>
                                    <Input type="text" id="phone" name="phone" value={data.phone} onChange={handleChange} />
                                    {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="mb-3">
                                        <Label htmlFor="city"> City:</Label>
                                        <Input type="text" id="city" name="city" value={data.city} onChange={handleChange} />
                                        {errors.city && <div className="text-red-500">{errors.city}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <Label htmlFor="country"> Country:</Label>
                                        <Input type="text" id="country" name="country" value={data.country} onChange={handleChange} />
                                        {errors.country && <div className="text-red-500">{errors.country}</div>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="address"> Address:</Label>
                                    <Textarea id="address" name="address" value={data.address} onChange={handleChange} />
                                    {errors.address && <div className="text-red-500">{errors.address}</div>}
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="image">Photo Profile </Label>
                                    <Input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
                                    {errors.image && <div className="text-red-500">{errors.image}</div>}
                                </div>
                                <div className="mt-2">
                                    <Button type="submit">Update Profile</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>{' '}
                </div>
            </Container>
        </>
    );
};

export default EditProfile;

EditProfile.layout = (page) => <VendorLayout children={page} />;
