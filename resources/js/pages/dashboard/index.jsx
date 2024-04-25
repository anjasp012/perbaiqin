import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { DashLayout } from '@/layouts/dash-layout';

import { ChevronDown, GaugeIcon, StoreIcon, ShoppingCart, PowerIcon, Settings2Icon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    // DropdownMenuLabel,
    // DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AppLayout } from '@/layouts/app-layout';

export default function DashboardIndex() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                </div>
            </Container>
        </>
    );
}

DashboardIndex.layout = (page) => <AppLayout children={page} />;
