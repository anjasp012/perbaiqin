import { useEffect, useState } from 'react';
import { InputError } from '@/components/input-error';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button, buttonVariants } from '@/components/ui/button';
import { AuthLayout } from '@/layouts/auth-layout';

export default function VendorRegister({}) {
    //state user

    const { errors, processing } = usePage().props;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [agree, setAgree] = useState('');
    //function "registerHandler"
    const registerHandler = async (e) => {
        e.preventDefault();

        //register
        router.post(route('vendor.register.store'), {
            name: name,
            email: email,
            phone: phone,
            password: password,
            password_confirmation: passwordConfirmation,
            agree: agree,
        });
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
                                                        <Label htmlFor="name">Vendor Name</Label>
                                                        <Input
                                                            id="name"
                                                            type="text"
                                                            name="name"
                                                            value={name}
                                                            className="mt-1 block w-full"
                                                            autoComplete="name"
                                                            autoFocus
                                                            onChange={(e) => setName(e.target.value)}
                                                        />

                                                        <InputError message={errors.name} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="phone">Phone</Label>
                                                        <Input
                                                            id="phone"
                                                            type="number"
                                                            name="phone"
                                                            value={phone}
                                                            className="mt-1 block w-full"
                                                            autoComplete="phone"
                                                            autoFocus
                                                            onChange={(e) => setPhone(e.target.value)}
                                                        />

                                                        <InputError message={errors.phone} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={email}
                                                            className="mt-1 block w-full"
                                                            autoComplete="email"
                                                            autoFocus
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />

                                                        <InputError message={errors.email} className="mt-2" />
                                                    </div>
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="password">Password</Label>

                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            value={password}
                                                            className="mt-1 block w-full"
                                                            autoComplete="current-password"
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                        {errors.password && <InputError message={errors.password} className="mt-2" />}
                                                    </div>

                                                    <div className="grid gap-1">
                                                        <Label htmlFor="password_confirmation">Password Confirmation</Label>

                                                        <Input
                                                            id="password_confirmation"
                                                            type="password"
                                                            name="password_confirmation"
                                                            value={passwordConfirmation}
                                                            className="mt-1 block w-full"
                                                            autoComplete="current-password"
                                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                                        />

                                                        {errors.passwordConfirmation && <InputError message={errors.passwordConfirmation} className="mt-2" />}
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <label className="flex items-center">
                                                            <Checkbox defaultChecked={false} name="agree" onCheckedChange={(e) => setAgree(e)} />
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
