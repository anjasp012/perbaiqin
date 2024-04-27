import React from 'react';
import { Link } from '@inertiajs/react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDateTime, formatRupiah } from '@/lib/utils';
import { Image } from '@/components/image';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';

const VideoCard = ({ video }) => {
    return (
        <Card key={video.id}>
            <CardContent>
                <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateTime(video.created_at)}</span>
                    {/* <Badge variant="primary" className="text-xs">
                                            {video.tags}
                                        </Badge> */}
                </div>
                <h3 className="mt-2 text-lg font-bold">{video.captions}</h3>
                <div className="mt-4 flex items-center justify-between">
                    <Link href={route('landing.videos.show', video.id)} className={buttonVariants({ variant: 'secondary' })}>
                        Play
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default VideoCard;
