import React, { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import { DashLayout } from '@/layouts/dash-layout';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VendorLayout } from '@/layouts/vendor/vendor-layout';
import { Header } from '@/components/header';

export default function ProductEdit() {
    const { product, errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        name: product.name,
        description: product.description,
        price: product.price,
        image: '',
        _method: 'PUT',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === 'image') {
            setData('image', files[0]); // Simpan file image
        } else {
            setData(name, value); // Simpan nilai input dalam objek data
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('vendor.products.update', product.slug));
    };

    return (
        <>
            <Head title={`Edit ${product.name}`} />
            <Container>
                <Header title={product.name} subtitle={'Edit Product'}/>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <Label htmlFor="name">Product Name</Label>
                            <Input type="text" name="name" id="name" value={data.name} onChange={handleChange} />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="description">Description</Label>
                            <Textarea type="text" name="description" id="description" value={data.description} onChange={handleChange} />
                            {errors.description && <div className="text-sm text-red-500">{errors.description}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="price">Price</Label>
                            <Input type="number" name="price" id="price" value={data.price} onChange={handleChange} />
                            {errors.price && <div className="text-sm text-red-500">{errors.price}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="image">Product Image</Label>
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

ProductEdit.layout = (page) => <VendorLayout children={page} />;
