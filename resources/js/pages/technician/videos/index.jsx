import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';
import useSwal from '@/hooks/useSwal';
import { Image } from '@/components/image';

const VideoIndex = ({ videos }) => {
    const { ask } = useSwal();
    return (
        <Container>
            <Head title="Videos"></Head>
            <Header title={`Technician Videos`} subtitle={'Videos'} />
            <div className="mt-5">
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <Link href={route('technician.videos.create')} className={buttonVariants({ variant: 'default' })}>
                            Upload New Videos
                        </Link>
                        <Search URL={route('technician.videos.index')} />
                    </div>

                    <div className={`grid grid-cols-4 gap-3`}>
                        {videos.data.map((video, index) => (
                            <Card className="overflow-hidden rounded" key={video.id}>
                                <Image
                                    skeletonHeight="40"
                                    className="aspect-[16/9] w-full object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                    src={`/storage/${video.thumbnail}`}
                                ></Image>
                                <CardContent>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{formatDateTime(video.created_at)}</span>
                                        {/* <Badge variant="primary" className="text-xs">
                                            {video.tags}
                                        </Badge> */}
                                    </div>
                                    <h3 className="mt-2 text-lg font-bold">{video.captions}</h3>
                                    <div className="mt-4 flex items-center justify-between">
                                        <Link href={route('technician.videos.edit', video.id)} className={buttonVariants({ variant: 'secondary' })}>
                                            Edit
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                ask({
                                                    url: route('technician.videos.destroy', video.id),
                                                    method: 'delete',
                                                    icon: 'warning',
                                                    message: 'Are you sure you want to delete this video?',
                                                })
                                            }
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default VideoIndex;
VideoIndex.layout = (page) => <TechnicianLayout children={page} />;
