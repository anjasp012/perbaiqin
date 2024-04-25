import { useEffect } from 'react';
import { InputError } from '@/components/input-error';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button, buttonVariants } from '@/components/ui/button';
import { AuthLayout } from '@/layouts/auth-layout';

export default function VendorLogin({ }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('vendor.login'));
    };

    return (
        <AuthLayout>
            <Head title="Vendor Login" />
            <>
                <div className="relative bg-gradient-to-bl from-blue-100 via-transparent dark:from-blue-950 dark:via-transparent">
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="mt-10 grid items-center gap-8 md:grid-cols-2 lg:gap-12">
                            <div className='hidden md:block'>
                                <div className="max-w-2xl md:mb-12">
                                    <h1 className="mb-5 text-4xl font-semibold text-gray-800 dark:text-gray-200 lg:text-5xl">Sign in as Vendor</h1>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Authentication for Vendors
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
                                    <div className="flex flex-col rounded-2xl sm:p-7">
                                        <div className="text-center">
                                            <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Login as Vendor</h1>
                                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                Don't have an account?
                                                <Link
                                                    className="ml-1 font-medium text-blue-600 decoration-2 hover:underline dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                                    href={route('vendor.register')}
                                                >
                                                    Register here
                                                </Link>
                                            </p>
                                        </div>
                                        <div className="mt-5">
                                            <form onSubmit={submit}>
                                                <div className="grid gap-2">
                                                    <div className="grid gap-1">
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={data.email}
                                                            className="mt-1 block w-full"
                                                            autoComplete="username"
                                                            autoFocus
                                                            onChange={(e) => setData('email', e.target.value)}
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
                                                            onChange={(e) => setData('password', e.target.value)}
                                                        />

                                                        <InputError message={errors.password} className="mt-2" />
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between">
                                                        <label className="flex items-center">
                                                            <Checkbox defaultChecked={true} name="remember" onCheckedChange={(e) => setData('remember', e)} />

                                                            <span className="ml-2 select-none text-sm text-muted-foreground">Remember me</span>
                                                        </label>

                                                        <Link href="/forgot-password" className="text-sm font-medium text-foreground hover:underline">
                                                            Forgot password?
                                                        </Link>

                                                    </div>
                                                    <div className="mt-2 gap-x-2">
                                                        <Button className="w-full" disabled={processing} type="submit">
                                                            Log in
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
