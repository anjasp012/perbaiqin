import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, GaugeIcon, Wrench, PowerIcon, HomeIcon, MenuIcon, Settings2Icon } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinkClasses = 'text-sm items-center font-medium tracking-tight text-muted-foreground hover:text-foreground inline-flex px-4 py-3 transition-colors duration-300';

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
                    <Link href="/" className="mr-4 flex justify-between font-bold">
                        <Wrench className="me-2 h-6 w-6" /> <h2>PerbaiQin</h2>
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
                                    <Link href={route('dashboard')}>
                                        <GaugeIcon className="mr-2 h-4 w-4" />Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={route('profile.edit')}>
                                        <Settings2Icon className="mr-2 h-4 w-4" />Settings
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => router.post(route('logout'))}>
                                    <PowerIcon className="mr-2 h-4 w-4" />Log out
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
                    <Link href={route('home')}>
                        <ApplicationLogo className="h-6 w-6" />
                        <span className="sr-only">Go to home page</span>
                    </Link>
                    <div>
                        <ThemeSwitcher />
                        <Button className="ml-2 h-8" size="icon" variant="secondary" onClick={() => setOpen(true)}>
                            <MenuIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetContent side="right">
                        <Link href="/" className="mr-4">
                            <ApplicationLogo className="h-8 w-8" />
                        </Link>
                        <div className="-mx-2">
                            {navLinks.map((navLink, index) => (
                                <NavLink key={index} active={route().current(navLink.route)} href={route(navLink.route)}>
                                    {navLink.label}
                                </NavLink>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}

const navLinks = [
    { label: 'Home', route: 'home' },
    { label: 'Ask Technician', route: 'landing.ask-technician.index' },
    { label: 'Appointments', route: 'landing.appointments.index' },
    { label: 'Articles', route: 'home' },
    { label: 'Videos', route: 'home' },
    { label: 'Products', route: 'landing.products.index' },
];

export function NavLink({ active, children, href }) {
    return <Link className={cn(navLinkClasses, active && 'font-semibold text-foreground')} href={href}>{children}</Link>;
}
