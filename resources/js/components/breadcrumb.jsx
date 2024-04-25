import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function Breadcrumb({ links }) {
    return (
        <div className="mx-auto border-b  px-4 py-2 sm:px-6 lg:px-8">
            <ol className="flex items-center whitespace-nowrap" aria-label="Breadcrumb">
                {links.map((link, index) => (
                    <li key={index} className="inline-flex items-center">
                        {link.url ? (
                            <Link
                                href={link.url}
                                className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:text-blue-600 focus:outline-none dark:focus:text-blue-500"
                            >
                                {link.label}
                            </Link>
                        ) : (
                            <span className="flex items-center text-sm text-gray-500 focus:text-blue-600 focus:outline-none dark:focus:text-blue-500">
                                {link.label}
                            </span>
                        )}
                        {index !== links.length - 1 && <ChevronRight className="h-4 w-4" />}
                    </li>
                ))}
            </ol>
        </div>
    );
}
