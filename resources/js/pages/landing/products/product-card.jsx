import React from 'react';
import { Link } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product }) => {
    return (
        <Card key={product.id}>
            <Link href={route('landing.products.show', product.slug)}>
                <CardHeader>
                    <CardTitle>{product.name}</CardTitle>
                    <CardDescription>
                        <p className="mb-3">{product.vendor.name}</p>
                        <Badge>{formatRupiah(product.price)}</Badge>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image
                        skeletonHeight="40"
                        className="aspect-[16/9] w-full rounded-2xl border  object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                        src={`${product.image}`}
                    ></Image>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-between gap-2"></div>
                </CardFooter>
            </Link>
        </Card>
    );
};

export default ProductCard;
