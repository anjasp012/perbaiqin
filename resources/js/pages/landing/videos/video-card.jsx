import React from 'react';
import { Link } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime, formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';

const VideoCard = ({ video }) => {
    return (
        <Link href={route('landing.videos.show', video.id)}>
            <Card className="overflow-hidden rounded" key={video.id}>
                <Image
                    skeletonHeight="40"
                    className="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    src={`/storage/${video.thumbnail}`}
                ></Image>{' '}
                <CardContent>
                    <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateTime(video.created_at)}</span>
                        {/* <Badge variant="primary" className="text-xs">
                                            {video.tags}
                                        </Badge> */}
                    </div>
                    <h3 className="mt-2 text-lg font-bold">{video.captions}</h3>
                    {/* <div className="mt-4 flex items-center justify-between">
                        Play
                    </div> */}
                </CardContent>
            </Card>
        </Link>
    );
};

export default VideoCard;
