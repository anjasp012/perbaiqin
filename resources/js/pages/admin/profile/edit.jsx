import React, { useState } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/layouts/admin-layout';

const EditProfile = ({ admin }) => {
    const { data, setData, errors, post } = useForm({
        name: admin.name,
        phone: admin.phone || '',
        _method: 'PATCH',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.profile.update'), {
            onSuccess: () => {},
        });
    };

    return (
        <>
            <Container>
                <Head title="Profile"></Head>
                <Header title="Profile" subtitle={admin.name}></Header>
                <div className="mt-3 max-w-3xl">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your account's profile information and email address.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <Label htmlFor="name">Name:</Label>
                                    <Input type="text" id="name" name="name" value={data.name} onChange={handleChange} />
                                    {errors.name && <div className="text-red-500">{errors.name}</div>}
                                </div>
                                <div className="mb-3">
                                    <Label htmlFor="phone"> Phone Number:</Label>
                                    <Input type="number" id="phone" name="phone" value={data.phone} onChange={handleChange} />
                                    {errors.phone && <div className="text-red-500">{errors.phone}</div>}
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

EditProfile.layout = (page) => <AdminLayout children={page} />;
