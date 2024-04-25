import React from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product }) => {
    return (
        <Card key={product.id}>
            <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>
                <p className='mb-3'>{product.vendor.name}</p>

                   <Badge>
                        {formatRupiah(product.price)}
                    </Badge>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Image
                    className="aspect-[16/9] border w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    src={`${product.image}`}
                ></Image>
            </CardContent>
            <CardFooter>
                <div className="flex items-center justify-between gap-2">
               
                </div>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;
