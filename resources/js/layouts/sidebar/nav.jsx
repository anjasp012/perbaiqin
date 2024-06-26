import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router, usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { ChevronDown, GaugeIcon, StoreIcon, ShoppingCart, PowerIcon, Settings2Icon } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { buttonVariants } from '@/components/ui/button';

const navLinkClasses =
    'text-sm items-center font-medium tracking-tight text-muted-foreground hover:text-foreground inline-flex px-4 py-3 transition-colors duration-300';

export function Nav() {
    const { auth } = usePage().props;

    // Mendapatkan teks untuk DropdownMenuTrigger
    const dropdownTriggerText = auth.selected_store ? auth.selected_store.name : auth.my_store ? 'Change Store' : 'Kamu belum membuat store';

    return (
        <nav className="relative z-10 mx-auto hidden items-center justify-between p-2 px-4 py-2.5 sm:flex sm:px-6">
            <div className="flex items-center"></div>

            <div className="flex items-center">
                <ThemeSwitcher />
                <div className="mx-4 h-8 w-px bg-foreground/10" />
                {auth.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            className={cn(
                                buttonVariants({
                                    size: 'sm',
                                }),
                                'tracking-tighter',
                            )}
                        >
                            {auth.user.name}
                            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-60">
                            <DropdownMenuLabel>
                                <span className="relative flex items-center font-normal">
                                    <Avatar>
                                        <AvatarImage src={auth.user.gravatar} alt={auth.user.name} />
                                    </Avatar>
                                    <div className="ml-3">
                                        <strong className="inline-flex items-center font-semibold">{auth.user.name}</strong>
                                        <div className="text-muted-foreground">{auth.user.email}</div>
                                    </div>
                                </span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('dashboard')}>
                                    <GaugeIcon className="mr-2 h-4 w-4" />
                                    Dashboard
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={route('profile.edit')}>
                                    <Settings2Icon className="mr-2 h-4 w-4" />
                                    Settings
                                </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem onSelect={() => router.post(route('logout'))}>
                                <PowerIcon className="mr-2 h-4 w-4" />
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <DropdownMenu>
                        <DropdownMenuTrigger className={cn(navLinkClasses, 'group focus:outline-none')}>
                            Login
                            <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
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
    );
}

export function NavLink({ active, ...props }) {
    return <Link className={cn(navLinkClasses, active && 'font-semibold text-foreground')} {...props} />;
}
