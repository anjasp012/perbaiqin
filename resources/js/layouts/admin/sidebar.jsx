import React from 'react';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, CreditCard, Sofa, Users, Settings, ShoppingBag, ShieldCheck, ShieldX } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import hasAnyPermission from '@/utils/permission';

export function Sidebar({ minimizeSidebar }) {
    return (
        <div className={`top-18 fixed z-50 flex ${minimizeSidebar ? 'md:w-64' : 'hidden'} min-h-screen flex-col duration-200`}>
            <ScrollArea className="flex grow flex-col overflow-y-auto border-r border-border/40 bg-background/95 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <nav className="flex">
                    <ul className="flex flex-1 flex-col">
                        {[
                           {
                                href: '/dashboard',
                                label: 'Dashboard',
                                icon: <LayoutDashboard className="h-4 w-4 md:me-1" />,
                            },
                            {
                                href: route('payment_methods.index'),
                                label: 'Payment Methods',
                                icon: <CreditCard className="h-4 w-4 md:me-1" />,
                            },
                            
                        ].map(
                            ({ href, label, icon }) =>
                                href && (
                                    <li key={label}>
                                        <Link
                                            className={`bg-gray flex items-center ${
                                                minimizeSidebar ? 'justify-between' : 'justify-center'
                                            } px-4 py-2 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-900`}
                                            href={href}
                                        >
                                            <span className="flex items-center">
                                                {minimizeSidebar && (
                                                    <>
                                                        {icon}
                                                        {label}
                                                    </>
                                                )}
                                                {!minimizeSidebar && icon}
                                            </span>
                                        </Link>
                                    </li>
                                ),
                        )}
                    </ul>
                </nav>
            </ScrollArea>
        </div>
    );
}
