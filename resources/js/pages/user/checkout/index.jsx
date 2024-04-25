import React, { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatRupiah } from '@/lib/utils';
import Pagination from '@/shared/pagination';
import useSwal from '@/hooks/useSwal';
import { UserLayout } from '@/layouts/user/user-layout';
import { Image } from '@/components/image';
import { CheckoutLayout } from '@/layouts/user/checkout/checkout-layout';
import { ApplicationLogo } from '@/components/application-logo';
import { Input } from '@/components/ui/input';

export default function CheckoutIndex() {
    const { auth, carts, subTotal } = usePage().props;

    const { ask } = useSwal();

    const { data, setData, post, processing, errors } = useForm({
        buyer_name: auth.user.name,
        buyer_phone: auth.user.phone,
        address: '',
        city: '',
        province: '',
        postal_code: '',
        payment_method: 'COD',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setData(name, name === 'image' ? files[0] : value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkout.checkoutNow'));
    };
    return (
        <>
            <Head title="My Cart" />
            <div className="mx-auto h-lvh max-w-screen-2xl bg-muted/30">
                <div className="fixed left-0 top-0 hidden h-full w-1/2 bg-background lg:block"></div>
                <div className="fixed right-0 top-0 hidden h-full w-1/2 border-l bg-muted/5 lg:block"></div>
                <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
                    <h1 className="sr-only">Order information</h1>
                    <section className="bg-muted/10 px-4 pb-10 pt-6 sm:px-6 sm:pt-16 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16">
                        <div class="mx-auto max-w-lg lg:max-w-none">
                            <div class="relative mb-6 lg:hidden">
                                <a class="inline-flex" href="/">
                                    <ApplicationLogo className="me-2 h-6 w-6" /> <h2>PerbaiQin</h2>
                                </a>
                                <nav aria-label="breadcrumb" class="mt-6 hidden sm:block">
                                    <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                                        <li class="inline-flex items-center gap-1.5">
                                            <a class="transition-colors hover:text-foreground" href="/">
                                                Home
                                            </a>
                                        </li>
                                        <li role="presentation" aria-hidden="true" class="[&>svg]:size-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2" d="m9 4 8 8-8 8"></path>
                                            </svg>
                                        </li>
                                        <li class="inline-flex items-center gap-1.5">
                                            <button
                                                type="button"
                                                id="radix-:r1i:"
                                                aria-haspopup="menu"
                                                aria-expanded="false"
                                                data-state="closed"
                                                class="group cursor-pointer focus:outline-none"
                                            >
                                                <span role="presentation" aria-hidden="true" class="flex h-9 w-9 items-center justify-center">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        class="size-4"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            stroke-linecap="round"
                                                            stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2m8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M4 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
                                                        ></path>
                                                    </svg>
                                                    <span class="sr-only">More</span>
                                                </span>
                                            </button>
                                        </li>
                                        <li role="presentation" aria-hidden="true" class="[&>svg]:size-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2" d="m9 4 8 8-8 8"></path>
                                            </svg>
                                        </li>
                                        <li class="inline-flex items-center gap-1.5">
                                            <span role="link" aria-disabled="true" aria-current="page" class="font-normal text-foreground">
                                                Payment
                                            </span>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <h2 id="summary-heading" class="mb-0 text-lg font-semibold">
                                Order summary
                            </h2>
                            <ul role="list" class="divide-y text-sm font-medium">
                                {carts.map((cart, index) => (
                                    <li key={index} className="flex items-start space-x-4 py-6">
                                        <img
                                            alt={cart.product.name}
                                            width="72"
                                            height="72"
                                            data-nimg={index}
                                            class="size-20 flex-none rounded-md object-cover object-center"
                                            src={cart.product.image}
                                        />
                                        <div class="flex-auto space-y-2">
                                            <h3 class="text-base font-medium">{cart.product.name}</h3>
                                            <div class="text-[0.85rem] font-normal capitalize text-muted-foreground">
                                                <p className="text-red-600">{cart.product.vendor.name}</p>
                                                <p>Quantity: {cart.quantity}</p>
                                            </div>
                                        </div>
                                        <p class="flex-none text-base font-medium">{formatRupiah(cart.product.price)}</p>
                                    </li>
                                ))}
                            </ul>
                            <dl class="hidden space-y-6 pt-6 text-sm font-medium lg:block">
                                <div class="flex items-center justify-between border-t pt-6">
                                    <dt class="text-base">Total</dt>
                                    <dd class="text-base">{formatRupiah(subTotal)}</dd>
                                </div>
                            </dl>
                            <div class="-mx-4 lg:hidden">
                                <button
                                    type="button"
                                    aria-haspopup="dialog"
                                    aria-expanded="false"
                                    aria-controls="radix-:r1k:"
                                    data-state="closed"
                                    class="fixed bottom-0 right-0 flex w-full items-center justify-between border-t bg-background p-4"
                                >
                                    <span class="text-base">Total</span>
                                    <div class="flex items-center">
                                        <span class="mr-2 text-base">{formatRupiah(subTotal)}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            class="size-5 text-muted-foreground"
                                            aria-hidden="true"
                                        >
                                            <path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="m8 14 4-4 4 4"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </section>
                    <div className="border-t bg-background px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:border-transparent lg:bg-transparent lg:px-0 lg:pb-16 lg:pt-0">
                        <div class="relative hidden py-10 lg:block">
                            <a class="inline-flex" href="/">
                                <ApplicationLogo className="me-2 h-6 w-6" /> <h2>PerbaiQin</h2>
                            </a>
                            <nav aria-label="breadcrumb" class="mt-6 hidden sm:block">
                                <ol class="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
                                    <li class="inline-flex items-center gap-1.5">
                                        <a class="transition-colors hover:text-foreground" href="/">
                                            Home
                                        </a>
                                    </li>
                                    <li role="presentation" aria-hidden="true" class="[&>svg]:size-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-width="2" d="m9 4 8 8-8 8"></path>
                                        </svg>
                                    </li>
                                    <li class="inline-flex items-center gap-1.5">
                                        <span role="link" aria-disabled="true" aria-current="page" class="font-normal text-foreground">
                                            Payment
                                        </span>
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div class="lg:col-start-1 lg:row-start-1">
                            <div class="mx-auto max-w-lg lg:max-w-none">
                                <form onSubmit={handleSubmit}>
                                    <div class="mt-8">
                                        <div class="space-y-14">
                                            <section aria-labelledby="shipping-heading">
                                                <div class="mb-6 flex flex-col space-y-1.5 p-0 [&+.yahnba]:pt-0" id="shipping-heading">
                                                    <h3 class="text-xl font-semibold leading-none tracking-tight">Shipping address</h3>
                                                    <p class="max-w-2xl text-sm text-muted-foreground">Enter your shipping address to complete your order.</p>
                                                </div>
                                                <div class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
                                                    <div class="space-y-1 sm:col-span-3">
                                                        <label
                                                            class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            for="company"
                                                        >
                                                            Name
                                                        </label>
                                                        <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                            <Input
                                                                type="text"
                                                                name="buyer_name"
                                                                value={data.buyer_name}
                                                                onChange={handleChange}
                                                                placeholder="Name"
                                                                error={errors.buyer_name}
                                                            />
                                                        </div>
                                                        {errors.buyer_name && <span className="text-sm text-red-500">{errors.buyer_name}</span>}
                                                    </div>
                                                    <div class="space-y-1 sm:col-span-3">
                                                        <label
                                                            class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            for="company"
                                                        >
                                                            Phone
                                                        </label>
                                                        <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                            <Input
                                                                type="text"
                                                                name="buyer_phone"
                                                                value={data.buyer_phone}
                                                                onChange={handleChange}
                                                                placeholder="Phone"
                                                                error={errors.buyer_phone}
                                                            />
                                                        </div>
                                                        {errors.buyer_phone && <span className="text-sm text-red-500">{errors.buyer_phone}</span>}
                                                    </div>
                                                    <div class="space-y-1 sm:col-span-6">
                                                        <label
                                                            class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            for="address"
                                                        >
                                                            Address
                                                        </label>
                                                        <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                            <Input
                                                                type="text"
                                                                name="address"
                                                                value={data.address}
                                                                onChange={handleChange}
                                                                placeholder="Address"
                                                                error={errors.address}
                                                            />
                                                        </div>
                                                        {errors.address && <span className="text-sm text-red-500">{errors.address}</span>}
                                                    </div>
                                                    <div class="space-y-1 sm:col-span-2">
                                                        <label
                                                            class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            for="city"
                                                        >
                                                            City
                                                        </label>
                                                        <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                            <Input
                                                                type="text"
                                                                name="city"
                                                                value={data.city}
                                                                onChange={handleChange}
                                                                placeholder="City"
                                                                error={errors.city}
                                                            />
                                                        </div>
                                                        {errors.city && <span className="text-sm text-red-500">{errors.city}</span>}
                                                    </div>
                                                    <div class="space-y-1 sm:col-span-2">
                                                        <label
                                                            class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            for="region"
                                                        >
                                                            State / Province
                                                        </label>
                                                        <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                            <Input
                                                                type="text"
                                                                name="province"
                                                                value={data.province}
                                                                onChange={handleChange}
                                                                placeholder="Province"
                                                                error={errors.province}
                                                            />
                                                        </div>
                                                        {errors.province && <span className="text-sm text-red-500">{errors.province}</span>}
                                                    </div>
                                                    <div class="space-y-1 sm:col-span-2">
                                                        <label
                                                            class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            for="postal-code"
                                                        >
                                                            Postal code
                                                        </label>
                                                        <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                            <Input
                                                                type="text"
                                                                name="postal_code"
                                                                value={data.postal_code}
                                                                onChange={handleChange}
                                                                placeholder="Postal Code"
                                                                error={errors.postal_code}
                                                            />
                                                        </div>
                                                        {errors.postal_code && <span className="text-sm text-red-500">{errors.postal_code}</span>}
                                                    </div>
                                                </div>
                                            </section>
                                            <section aria-labelledby="payment-heading">
                                                <div class="mb-6 flex flex-col space-y-1.5 p-0 [&+.yahnba]:pt-0">
                                                    <h3 class="text-xl font-semibold leading-none tracking-tight">Payment Details</h3>
                                                    <p class="max-w-2xl text-sm text-muted-foreground">Enter your payment details to complete your order.</p>
                                                </div>
                                                <div class="yahnba p-0 [&:has(table)+.ccvgs8x]:border-t [&:has(table)+.ccvgs8x]:py-5 [&:has(table)]:p-0 [&_td]:px-6 [&_th]:px-6">
                                                    <div class="grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                                                        <div class="col-span-3 space-y-1 sm:col-span-4">
                                                            <label
                                                                class="text-sm font-medium leading-none text-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                for="name-on-card"
                                                            >
                                                                Payment Method
                                                            </label>
                                                            <div class="flex items-center [&_svg]:size-[1.15rem] [&_svg]:shrink-0 [&_svg]:text-muted-foreground">
                                                                <select
                                                                    class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-foreground/70 focus-visible:outline-none focus-visible:ring-[0.20rem] focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                                    id="payment_method"
                                                                    name="payment_method"
                                                                    onChange={handleChange}
                                                                >
                                                                    <option value="COD">COD (Cash On Delivery)</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div class="mt-6 border-t pt-6 sm:flex sm:items-center sm:justify-between">
                                            <button
                                                class="inline-flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 sm:w-auto [&_svg]:size-4 [&_svg]:shrink-0"
                                                type="submit"
                                            >
                                                Continue
                                            </button>
                                            <p class="mt-4 text-center text-sm text-muted-foreground sm:mt-0 sm:text-left">
                                                You won't be charged until the next step.
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

CheckoutIndex.layout = (page) => <CheckoutLayout children={page} />;
