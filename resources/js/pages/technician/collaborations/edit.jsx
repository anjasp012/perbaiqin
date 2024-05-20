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

export default function CollaborationEdit({ collaboration }) {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        name: collaboration.name,
        description: collaboration.description,
        price: collaboration.price,
        image: null,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('image', data.image);
        formData.append('_method', data._method);
        post(route('technician.collaborations.update', collaboration.slug), formData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    return (
        <>
            <Head title="Edit Collaboration" />
            <Container>
                <Header title={'Collaboration'} subtitle={'Edit Collaboration'}></Header>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <Label htmlFor="name">Collaboration Name</Label>
                            <Input type="text" name="name" id="name" value={data.name} onChange={handleChange} />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea name="description" id="description" value={data.description} onChange={handleChange} />
                            {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="price">Price</Label>
                            <Input type="number" name="price" id="price" value={data.price} onChange={handleChange} />
                            {errors.price && <div className="text-sm text-red-500">{errors.price}</div>}
                        </div>

                        <div className="mt-4">
                            <Label htmlFor="image">Collaboration Image</Label>
                            <Input type="file" name="image" id="image" accept="image/*" onChange={handleChange} />
                            {errors.image && <div className="text-sm text-red-500">{errors.image}</div>}
                        </div>

                        <div className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Processing...' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

CollaborationEdit.layout = (page) => <TechnicianLayout children={page} />;
