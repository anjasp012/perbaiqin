import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const EditProfile = ({ technician }) => {
    const { data, setData, errors, post } = useForm({
        name: technician.name,
        phone: technician.phone || '',
        price: technician.price || '',
        image: null,
        _method: 'PUT'
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
        post(route('technician.profile.update'), {
            onSuccess: () => {
            },
        });
    };

    return (
        <>

            <Container>
                <Head title="Profile"></Head>
                <Header title='Profile' subtitle={technician.name}></Header>
                <div className="mt-3 max-w-3xl">
                    <Card>
                        <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account's profile information and email address.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className='mb-3'>
                                    <Label htmlFor="name">Name:</Label>
                                    <Input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>
                                <div className='mb-3'>
                                    <Label htmlFor="phone"> Phone Number:</Label>
                                    <Input
                                        type="number"
                                        id="phone"
                                        name="phone"
                                        value={data.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && <div className="text-red-500">{errors.phone}</div>}
                                </div>
                                <div className='mb-3'>
                                    <Label htmlFor="price">Price for Consult </Label>
                                    <Input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        onChange={handleChange}
                                    />
                                    {errors.price && <div className="text-red-500">{errors.price}</div>}
                                </div>
                                <div className='mb-3'>
                                    <Label htmlFor="image">Photo Profile </Label>
                                    <Input

                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                    {errors.image && <div className="text-red-500">{errors.image}</div>}
                                </div>
                                <div className='mt-2'>

                                    <Button type="submit">Update Profile</Button>
                                </div>
                            </form>

                        </CardContent>

                    </Card>    </div>
            </Container>
        </>
    );
};

export default EditProfile;

EditProfile.layout = (page) => <TechnicianLayout children={page} />;