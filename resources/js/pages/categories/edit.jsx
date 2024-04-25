import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { DashLayout } from '@/layouts/dash-layout';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CategoryEdit() {
    const { category, errors } = usePage().props;
    const { data, setData, put, processing } = useForm({
        name: category.name,
        store_id: category.store_id, // Jika diperlukan, ganti dengan nilai toko default atau dapatkan dari sesi atau autentikasi
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('categories.update', category.id));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <>
            <Head title={`Edit ${category.name}`} />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold">Edit Category</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <Label htmlFor="name">Category Name</Label>
                            <Input type="text" name="name" id="name" value={data.name} onChange={handleChange} />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>

                        <div className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Processing...' : 'Update Category'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

CategoryEdit.layout = (page) => <DashLayout children={page} />;
