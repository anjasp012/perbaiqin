import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { buttonVariants } from '@/components/ui/button';
import { Container } from '@/components/container';
import { AuthLayout } from '@/layouts/auth-layout';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.login'), {});
    };

    return (
        <>
            <Head title="Admin Login" />
            <AuthLayout>
                <Container>
                    <div className="mx-auto mt-8 max-w-md">
                        <div className="mb-6 text-center text-2xl font-semibold">Admin Login</div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" />
                                {errors.email && <div className="text-red-500">{errors.email}</div>}
                            </div>
                            <div className="mb-4">
                                <Input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" />
                                {errors.password && <div className="text-red-500">{errors.password}</div>}
                            </div>
                            <div className="mb-4 flex items-center justify-between">
                                <button type="submit" className={`${buttonVariants({ variant: 'default' })} w-full`} disabled={processing}>
                                    {processing ? 'Logging in...' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </Container>
            </AuthLayout>
        </>
    );
}
