import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Header } from '@/components/header';
import { TechnicianLayout } from '@/layouts/technician/technician-layout';
import { Select } from '@radix-ui/react-select';
// import { Select } from '@/components/select';

export default function VideoEdit({ video }) {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        thumbnail: null,
        captions: video.captions,
        file_video: null,
    });

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        const formData = new FormData();
        formData.append('thumbnail', data.thumbnail);
        formData.append('captions', data.captions);
        formData.append('file_video', data.file_video);
        post(route('technician.videos.update', video.id), formData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'file_video' || name === 'thumbnail') {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    return (
        <>
            <Head title="Edit Video" />
            <Container>
                <Header title={'Video'} subtitle={'Edit new Video'}></Header>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <Label htmlFor="thumbnail">Thumbnail</Label>
                            <Input type="file" name="thumbnail" id="thumbnail" accept="image/*" onChange={handleChange} />
                            {errors.thumbnail && <div className="text-sm text-red-500">{errors.thumbnail}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="video">Video</Label>
                            <Input type="file" name="file_video" id="file_video" accept="video/*" onChange={handleChange} />
                            {errors.file_video && <div className="text-sm text-red-500">{errors.file_video}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="captions">Captions</Label>
                            <Textarea name="captions" id="captions" value={data.captions} onChange={handleChange} />
                            {errors.captions && <div className="text-sm text-red-500">{errors.captions}</div>}
                        </div>

                        <div className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Processing...' : 'Edit'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

VideoEdit.layout = (page) => <TechnicianLayout children={page} />;
