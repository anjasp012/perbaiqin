import React from 'react';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';

export default function Pagination({ links }) {
    function getVariantName(active) {
        if (active) {
            return 'default';
        } else {
            return 'outline';
        }
    }

    return (
        links.length > 3 && (
            <div className="mb-4">
                <div className="mt-8 flex flex-wrap gap-1">
                    {links.map((link, key) =>
                        link.url === null ? (
                            <Link key={key} className={buttonVariants({ variant: 'outline' })} dangerouslySetInnerHTML={{ __html: link.label }}></Link>
                        ) : (
                            <Link
                                key={key}
                                className={buttonVariants({ variant: getVariantName(link.active) })}
                                href={link.url}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            ></Link>
                        ),
                    )}
                </div>
            </div>
        )
    );
}
