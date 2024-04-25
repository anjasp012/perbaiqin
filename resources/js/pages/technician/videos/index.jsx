import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { Container } from '@/components/container';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import { Header } from '@/components/header';
import Search from '@/shared/search';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDateTime } from '@/lib/utils';

const VideoIndex = ({ videos }) => {
    return (
        <Container>
            <Head title='Videos'></Head>
            <Header title={`Technician Videos`} subtitle={'Videos'} />
            <div className='mt-5'>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex justify-between">
                        <h2 className="text-lg font-bold">Your Videos</h2>
                        <Search URL={route('technician.videos.index')} />
                    </div>

                    <div className={`grid grid-cols-3 gap-3`}>
                        {videos.data.map((video, index) => (
                            <Card key={video.id}>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-700 dark:text-gray-300 text-sm">{formatDateTime(video.created_at)}</span>
                                        <Badge variant="primary" className="text-xs">{video.tags}</Badge>
                                    </div>
                                    <h3 className="text-lg font-bold mt-2">{video.captions}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <Link href={route('technician.videos.edit', video.id)} className={buttonVariants({ variant: 'secondary' })}>
                                            Edit
                                        </Link>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() =>
                                                ask({
                                                    url: route('technician.videos.index'),
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
