import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';

const CollaborationCard = ({ collaboration }) => {
    return (
        <Card key={collaboration.id}>
            <Link href={route('landing.collaborations.show', collaboration.slug)}>
                <CardHeader>
                    <CardTitle>{collaboration.name}</CardTitle>
                    <CardDescription>
                        <p className="mb-3">{collaboration.technician.name}</p>

                        <Badge>{formatRupiah(collaboration.price)}</Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        className="aspect-[16/9] w-full rounded-2xl border object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        src={'/storage/' + collaboration.image}
                    ></Image>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-between gap-2"></div>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default CollaborationCard;
