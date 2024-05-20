import { useEffect, useState } from 'react';
import { InputError } from '@/components/input-error';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button, buttonVariants } from '@/components/ui/button';
import { AuthLayout } from '@/layouts/auth-layout';
import { Textarea } from '@/components/ui/textarea';

export default function VendorRegister({}) {
    //state user

    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        fullName: '',
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        address: '',
        ktp: null,
        password: '',
        password_confirmation: '',
        agree: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'ktp') {
            setData(name, files[0]);
        } else {
            setData(name, value);
            console.log(name);
        }
    };

    //function "registerHandler"
    const registerHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullName', data.fullName);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('ktp', data.ktp);
        formData.append('city', data.city);
        formData.append('country', data.country);
        formData.append('address', data.address);
        formData.append('password', data.password);
        formData.append('password_confirmation', data.password_confirmation);
        formData.append('agree', data.agree);
        post(route('vendor.register.store'), formData);
    };

    return (
        <AuthLayout>
            <Head title="Vendor Register" />
            <>
                <div className="relative bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent">
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="mt-10 grid items-center gap-8 md:grid-cols-2 lg:gap-12">
                            <div>
                                <div className="max-w-2xl md:mb-12">
                                    <h1 className="mb-5 text-4xl font-semibold text-gray-800 dark:text-gray-200 lg:text-5xl">Register Vendor</h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis velit optio porro animi.
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
                                    <div className="flex flex-col rounded-2xl sm:p-7">
                                        <div className="text-center">
                                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                Already have an account?
                                                <Link
                                                    className="ml-1 font-medium text-blue-600 decoration-2 hover:underline dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                    href={route('vendor.login')}
                                                >
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="mt-5">
                                            <form onSubmit={registerHandler}>
                                                <div className="grid gap-2">
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="fullName">Full Name</Label>
                                                        <Input
                                                            id="fullName"
                                                            type="text"
                                                            name="fullName"
                                                            value={data.fullName}
                                                            className="mt-1 block w-full"
                                                            autoComplete="fullName"
                                                            autoFocus
                                                            onChange={handleChange}
                                                        />

                                                        <InputError message={errors.fullName} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="name">Store Name</Label>
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            name="name"
                                                            value={data.name}
                                                            className="mt-1 block w-full"
                                                            autoComplete="name"
                                                            autoFocus
                                                            onChange={handleChange}
                                                        />

                                                        <InputError message={errors.name} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="phone">Phone</Label>
                                                        <Input
                                                            id="phone"
                                                            type="number"
                                                            name="phone"
                                                            value={data.phone}
                                                            className="mt-1 block w-full"
                                                            autoComplete="phone"
                                                            autoFocus
                                                            onChange={handleChange}
                                                        />

                                                        <InputError message={errors.phone} className="mt-2" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <div className="grid gap-1">
                                                            <Label htmlFor="city">City</Label>
                                                            <Input
                                                                id="city"
                                                                type="text"
                                                                name="city"
                                                                value={data.city}
                                                                className="mt-1 block w-full"
                                                                autoComplete="city"
                                                                autoFocus
                                                                onChange={handleChange}
                                                            />

                                                            <InputError message={errors.city} className="mt-2" />
                                                        </div>
                                                        <div className="grid gap-1">
                                                            <Label htmlFor="country">Country</Label>
                                                            <Input
                                                                id="country"
                                                                type="text"
                                                                name="country"
                                                                value={data.country}
                                                                className="mt-1 block w-full"
                                                                autoComplete="country"
                                                                autoFocus
                                                                onChange={handleChange}
                                                            />

                                                            <InputError message={errors.country} className="mt-2" />
                                                        </div>
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="address">Address</Label>
                                                        <Textarea
                                                            id="address"
                                                            type="text"
                                                            name="address"
                                                            value={data.address}
                                                            className="mt-1 block w-full"
                                                            autoComplete="address"
                                                            autoFocus
                                                            onChange={handleChange}
                                                        />

                                                        <InputError message={errors.address} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="ktp">Ktp</Label>
                                                        <Input
                                                            id="ktp"
                                                            type="file"
                                                            name="ktp"
                                                            className="mt-1 block w-full"
                                                            autoComplete="ktp"
                                                            autoFocus
                                                            onChange={handleChange}
                                                        />

                                                        <InputError message={errors.ktp} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            className="mt-1 block w-full"
                                                            autoComplete="email"
                                                            autoFocus
                                                            onChange={handleChange}
                                                        />

                                                        <InputError message={errors.email} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="password">Password</Label>

                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            value={data.password}
                                                            className="mt-1 block w-full"
                                                            autoComplete="current-password"
                                                            onChange={handleChange}
                                                        />
                                                        {errors.password && <InputError message={errors.password} className="mt-2" />}
                                                    </div>

                                                    <div className="grid gap-1">
                                                        <Label htmlFor="password_confirmation">Password Confirmation</Label>

                                                        <Input
                                                            id="password_confirmation"
                                                            type="password"
                                                            name="password_confirmation"
                                                            value={data.password_confirmation}
                                                            className="mt-1 block w-full"
                                                            autoComplete="current-password"
                                                            onChange={handleChange}
                                                        />

                                                        {errors.password_confirmation && <InputError message={errors.password_confirmation} className="mt-2" />}
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <label className="flex items-center">
                                                            <Checkbox defaultChecked={false} name="agree" onCheckedChange={(e) => setData('agree', e)} />
                                                            <span className="ml-2 select-none text-sm text-muted-foreground">Agree with terms</span>
                                                        </label>
                                                        {errors.agree && <InputError message={errors.agree} className="mt-2" />}
                                                    </div>
                                                    <div className="mt-2 gap-x-2">
                                                        <Button className="w-full" disabled={processing} type="submit">
                                                            Register
                                                        </Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center gap-x-1.5 py-3 text-sm text-gray-800 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-white dark:after:border-gray-700 md:mt-12">
                            PerbaiQin
                        </div>
                    </div>
                </div>
            </>
        </AuthLayout>
    );
}
