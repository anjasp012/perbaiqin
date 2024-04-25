import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, GaugeIcon, Wrench, PowerIcon, HomeIcon, MenuIcon, Settings2Icon } from 'lucide-react';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Sheet, SheetContent, SheetHeader } from '@/components/ui/sheet';
import { ApplicationLogo } from '@/components/application-logo';

import { User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from '@/components/ui/card';
const navLinkClasses = 'text-sm items-center font-medium tracking-tight text-muted-foreground hover:text-foreground inline-flex px-2 py-3 transition-colors duration-300';

export function ChatNav({ consultation }) {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    useEffect(() => {
        return router.on('finish', () => {
            setOpen(false);
        });
    }, []);
    return (
        <>

            <nav >
                <div className=" flex w-full items-center justify-between border-b px-4 py-3 shadow-sm backdrop-blur-lg">
                    <Avatar className="flex items-center">
                        <AvatarImage
                            src={consultation.technician.image}
                            alt={consultation.technician.name}
                            className="h-6 w-6 rounded-full border-2"
                        />
                        <AvatarFallback>
                            <UserIcon />
                        </AvatarFallback>

                    </Avatar>
                    <div>

                        <h2 className="text-lg font-semibold ml-2">
                            {consultation.technician.name}
                        </h2>
                    </div>
                    <div>
                        <ThemeSwitcher />
                        <Button className="ml-2 h-8" size="icon" variant="secondary" onClick={() => setOpen(true)}>
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="right">
                        <Link href="/" className="mr-4 mb-4 flex items-center">
                            <ApplicationLogo className="me-2 h-6 w-6" />
                            <h2 className="text-xl font-bold"> PerbaiQin</h2>
                        </Link>
                        <div className="mt-3 mb-3">

                            <Card>
                                <CardHeader>
                                    <Avatar className="flex items-center">
                                        <AvatarImage
                                            src={auth.user.avatar}
                                            alt={auth.user.name}
                                            className="h-6 w-6 rounded-full border-2"
                                        />
                                        <AvatarFallback>
                                            <UserIcon />
                                        </AvatarFallback>

                                    </Avatar>
                                    <div>

                                        <h2 className="text-lg font-semibold ml-2">
                                            {auth.user.name}
                                        </h2>
                                    </div>
                                </CardHeader>
                            </Card>

                        </div>
                        <div className="-mx-2 space-y-2">
                            {navLinks.map((navLink, index) => (
                                <NavLinkResponsive key={index} active={route().current(navLink.route)} href={route(navLink.route)}>
                                    {navLink.label}
                                </NavLinkResponsive>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}

const navLinks = [
    { label: 'Dashboard', route: 'dashboard' },
    { label: 'History', route: 'vendor.products.index' },
    { label: 'Appointments', route: 'vendor.products.index' },
];

export function NavLink({ active, children, href }) {
    return <Link className={cn(navLinkClasses, active && 'font-semibold text-foreground')} href={href}>{children}</Link>;
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
