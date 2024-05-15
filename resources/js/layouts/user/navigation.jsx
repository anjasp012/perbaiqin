import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, GaugeIcon, Wrench, PowerIcon, HomeIcon, MenuIcon, Settings2Icon, ShoppingCartIcon } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ApplicationLogo } from '@/components/application-logo';

const navLinkClasses =
    'text-sm items-center font-medium tracking-tight text-muted-foreground hover:text-foreground inline-flex px-2 py-3 transition-colors duration-300';

export function Navigation() {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        return router.on('finish', () => {
            setOpen(false);
        });
    }, []);
    return (
        <>
            <nav className="relative z-10 mx-auto hidden max-w-screen-2xl items-center justify-between border-b px-4 py-2.5 sm:flex sm:px-6">
                <div className="flex items-center">
                    <Link href={route('home')} className="mr-4 flex justify-between font-bold">
                        <ApplicationLogo className="me-2 h-6 w-6" /> <h2>PerbaiQin</h2>
                    </Link>
                    {navLinks.map((navLink, index) => (
                        <NavLink key={index} active={route().current(navLink.route)} href={route(navLink.route)}>
                            {navLink.label}
                        </NavLink>
                    ))}
                </div>

                <div className="flex items-center">
                    <ThemeSwitcher />
                    <div className="mx-4 h-8 w-px bg-foreground/10" />
                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'tracking-tighter')}>
                                {auth.user.name} <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-60">
                                <DropdownMenuItem asChild>
                                    <Link href={route('user.dashboard')}>
                                        <GaugeIcon className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('user.cart.index')}>
                                        <ShoppingCartIcon className="mr-2 h-4 w-4" />
                                        Cart
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('user.profile.edit')}>
                                        <Settings2Icon className="mr-2 h-4 w-4" />
                                        Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => router.post(route('logout'))}>
                                    <PowerIcon className="mr-2 h-4 w-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(navLinkClasses, 'group focus:outline-none')}>
                                Login <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                                <DropdownMenuItem asChild>
                                    <Link href={route('login')}>Login</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('register')}>Register</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </nav>

            <nav className="sm:hidden">
                <div className="fixed top-0 z-20 flex w-full items-center justify-between border-b px-4 py-3 shadow-sm backdrop-blur-lg">
                    <Link href="/" className="mr-4 flex justify-between font-bold">
                        <ApplicationLogo className="me-2 h-6 w-6" /> <h2>PerbaiQin</h2>
                    </Link>
                    <div>
                        <ThemeSwitcher />
                        <Button className="ml-2 h-8" size="icon" variant="secondary" onClick={() => setOpen(true)}>
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="left">
                        <Link href="/" className="mb-4 mr-4 flex items-center">
                            <ApplicationLogo className="me-2 h-6 w-6" />
                            <h2 className="text-xl font-bold">PerbaiQin</h2>
                        </Link>

                        <div className="-mx-2 space-y-2">
                            {navLinks.map((navLink, index) => (
                                <NavLinkResponsive key={index} active={route().current(navLink.route)} href={route(navLink.route)}>
                                    {navLink.label}
                                </NavLinkResponsive>
                            ))}
                            <DropdownMenu>
                                <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'w-full justify-start tracking-tighter')}>
                                    {auth.user.name}{' '}
                                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start" className="w-56">
                                    <DropdownMenuItem asChild>
                                        <Link href={route('user.dashboard')}>
                                            <GaugeIcon className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={route('user.cart.index')}>
                                            <ShoppingCartIcon className="mr-2 h-4 w-4" />
                                            Cart
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href={route('user.profile.edit')}>
                                            <Settings2Icon className="mr-2 h-4 w-4" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onSelect={() => router.post(route('logout'))}>
                                        <PowerIcon className="mr-2 h-4 w-4" />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}

const navLinks = [
    { label: 'Dashboard', route: 'user.dashboard' },
    { label: 'Appointments History', route: 'user.appointments.index' },
    { label: 'Transaction History', route: 'user.transactions.index' },
    { label: 'Collaboration Order History', route: 'user.collaborationOrders.index' },
];

export function NavLink({ active, children, href }) {
    return (
        <Link className={cn(navLinkClasses, active && 'font-semibold text-foreground')} href={href}>
            {children}
        </Link>
    );
}

export function NavLinkResponsive({ active, children, href }) {
    return (
        <Link
            href={href}
            className={cn(
                'flex items-center rounded px-2 py-2 text-sm hover:bg-accent',
                active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
        >
            {children}
        </Link>
    );
}
