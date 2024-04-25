import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';

export default function Paginate({ links }) {
    const { currentPage, lastPage, prev, next } = links;

    return (
        <div className="flex justify-center px-5 pt-8">
            <div className="flex items-center gap-1 [&_svg]:h-4 [&_svg]:w-4">
                {currentPage !== 1 && (
                    <Link href={links.first} className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                        <ChevronsLeftIcon className="h-6 w-6" />
                    </Link>
                )}
                {prev ? (
                    <Link href={prev} className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                        <ChevronLeftIcon className="h-6 w-6" />
                    </Link>
                ) : (
                    <div className="opacity-25">
                        <ChevronLeftIcon className="h-6 w-6" />
                    </div>
                )}
                <div className="mx-4">
                    <strong className="font-semibold text-foreground">{currentPage}</strong> / <span className="text-muted-foreground">{lastPage}</span>
                </div>
                {next ? (
                    <Link href={next} className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                        <ChevronRightIcon className="h-6 w-6" />
                    </Link>
                ) : (
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-background opacity-25 shadow-[8.05051px_24.1515px_89.4501px_-11.6285px_rgba(22,52,80,0.05)] backdrop-blur-xl transition duration-300 hover:bg-secondary">
                        <ChevronRightIcon className="h-6 w-6" />
                    </div>
                )}
                {currentPage !== lastPage && (
                    <Link href={links.last} className={buttonVariants({ size: 'icon', variant: 'outline' })}>
                        <ChevronsRightIcon className="h-6 w-6" />
                    </Link>
                )}
            </div>
        </div>
    );
}
