import { useEffect } from 'react';
import { GuestLayout } from '@/layouts/guest-layout';
import { InputError } from '@/components/input-error';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/layouts/auth-layout';
import { Checkbox } from '@/components/ui/checkbox';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <AuthLayout>
            <Head title="Register" />
            <>
                <div className="relative bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent">
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-12">
                            <div>
                                <div className="mt-5 max-w-2xl md:mb-12">
                                    <h1 className="mb-5 text-4xl font-semibold text-gray-800 dark:text-gray-200 lg:text-5xl">Register Account</h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                    Directly handled by Experts in the context of Gadgets, Technology, and more
                                    </p>
                                </div>
                            </div>

                            <div>
                                <div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
                                    <div className="flex flex-col rounded-2xl  sm:p-7">
                                        <div className="text-center">
                                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Register</h1>
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                Already Have Account?
                                                <Link
                                                    className="ml-1 font-medium text-blue-600 decoration-2 hover:underline dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                    href="#"
                                                >
                                                    Sign in here
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="mt-5">
                                            <form onSubmit={submit}>
                                                <div>
                                                    <Label htmlFor="name">Name</Label>

                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={data.name}
                                                        className="mt-1 block w-full"
                                                        autoComplete="name"
                                                        autoFocus
                                                        onChange={(e) => setData('name', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.name} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <Label htmlFor="email">Email</Label>

                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        name="email"
                                                        value={data.email}
                                                        className="mt-1 block w-full"
                                                        autoComplete="username"
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.email} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <Label htmlFor="phone">Phone</Label>

                                                    <Input
                                                        id="phone"
                                                        type="number"
                                                        name="phone"
                                                        value={data.phone}
                                                        className="mt-1 block w-full"
                                                        autoComplete="username"
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.phone} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <Label htmlFor="password">Password</Label>

                                                    <Input
                                                        id="password"
                                                        type="password"
                                                        name="password"
                                                        value={data.password}
                                                        className="mt-1 block w-full"
                                                        autoComplete="new-password"
                                                        onChange={(e) => setData('password', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.password} className="mt-2" />
                                                </div>

                                                <div className="mt-4">
                                                    <Label htmlFor="password_confirmation">Confirm Password</Label>

                                                    <Input
                                                        id="password_confirmation"
                                                        type="password"
                                                        name="password_confirmation"
                                                        value={data.password_confirmation}
                                                        className="mt-1 block w-full"
                                                        autoComplete="new-password"
                                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                                        required
                                                    />

                                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                                </div>

                                                <div className="mt-4 flex items-center justify-end">
                                                    <Link href={route('login')} className="text-sm font-medium text-foreground hover:underline">
                                                        Already registered?
                                                    </Link>

                                                    <Button className="ml-4" disabled={processing}>
                                                        Register
                                                    </Button>
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
