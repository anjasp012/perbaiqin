import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

import { Link } from '@inertiajs/react';

import { ArrowLeftToLine, LayoutDashboard, PackageSearch, Hash, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Sidebar({ toggleSidebar, minimizeSidebar }) {
    return (
        <div className={`duration-200 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col ${minimizeSidebar ? 'lg:w-80' : 'hidden '}`}>
            <ScrollArea className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-foreground/10 px-6 pt-4">
                <div className={`mb-4 flex h-24 items-center justify-between ${minimizeSidebar ? '' : 'flex-col'}`}>
                    <Link className="flex shrink-0 items-center" href="/dashboard">
                        {/* Gunakan operator ternary untuk menampilkan teks atau ikon */}
                        {minimizeSidebar ? (
                            <>
                                <PackageSearch className="mr-2 text-lg" />
                                <h2 className="text-lg font-bold">Edgepos</h2>
                            </>
                        ) : (
                            <PackageSearch className="mb-2 text-lg font-bold" />
                        )}
                    </Link>
                    <div className="z-20 space-y-2">
                        <Button variant={'outline'} size={'icon'} id={'sidebarToggler'} onClick={toggleSidebar}>
                            <ArrowLeftToLine />
                        </Button>
                    </div>
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="mt-4 flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list">
                                <li>
                                    <Link
                                        className="flex items-center justify-between rounded-lg py-2 pl-2 pr-4 text-sm font-medium text-foreground hover:bg-accent/50"
                                        href={'/dashboard'}
                                    >
                                        <span className="flex items-center">
                                            {/* Gunakan operator ternary untuk menampilkan teks atau ikon */}
                                            {minimizeSidebar ? (
                                                <>
                                                    <LayoutDashboard className="me-2" />
                                                    Dashboard
                                                </>
                                            ) : (
                                                <LayoutDashboard className="me-2" />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center justify-between rounded-lg py-2 pl-2 pr-4 text-sm font-medium text-foreground hover:bg-accent/50"
                                        href={'/stores'}
                                    >
                                        <span className="flex items-center">
                                            {/* Gunakan operator ternary untuk menampilkan teks atau ikon */}
                                            {minimizeSidebar ? (
                                                <>
                                                    <ShoppingBag className="me-2" />
                                                    My Store
                                                </>
                                            ) : (
                                                <ShoppingBag className="me-2" />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center justify-between rounded-lg py-2 pl-2 pr-4 text-sm font-medium text-foreground hover:bg-accent/50"
                                        href={'/products'}
                                    >
                                        <span className="flex items-center">
                                            {/* Gunakan operator ternary untuk menampilkan teks atau ikon */}
                                            {minimizeSidebar ? (
                                                <>
                                                    <PackageSearch className="me-2" />
                                                    Products
                                                </>
                                            ) : (
                                                <PackageSearch className="me-2" />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="flex items-center justify-between rounded-lg py-2 pl-2 pr-4 text-sm font-medium text-foreground hover:bg-accent/50"
                                        href={'/categories'}
                                    >
                                        <span className="flex items-center">
                                            {/* Gunakan operator ternary untuk menampilkan teks atau ikon */}
                                            {minimizeSidebar ? (
                                                <>
                                                    <Hash className="me-2" />
                                                    Categories
                                                </>
                                            ) : (
                                                <Hash className="me-2" />
                                            )}
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="mt-auto py-4" />
                    </ul>
                </nav>
            </ScrollArea>
        </div>
    );
}
