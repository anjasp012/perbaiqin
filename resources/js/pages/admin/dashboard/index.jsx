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
import { AdminLayout } from '@/layouts/admin-layout';
import { Header } from '@/components/header';

export default function DashboardIndex() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Dashboard" />
            <Container>
                <Header title={`Hello ${auth.admin.name}`} subtitle={''} />
            </Container>
        </>
    );
}

DashboardIndex.layout = (page) => <AdminLayout children={page} />;
