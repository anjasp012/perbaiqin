import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { DashLayout } from '@/layouts/dash-layout';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function CategoryCreate() {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        name: '',
        store_id: '', // Jika diperlukan, ganti dengan nilai toko default atau dapatkan dari sesi atau autentikasi
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('categories.store'));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    return (
        <>
            <Head title="Create Category" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-xl font-semibold">Create New Category</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <Label htmlFor="name">Category Name</Label>
                            <Input type="text" name="name" id="name" value={data.name} onChange={handleChange} />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>
                        <div className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Processing...' : 'Create Category'}
                            </Button>
                            <Link href={route('categories.index')}>
                                <Button variant="secondary">Back</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

CategoryCreate.layout = (page) => <DashLayout children={page} />;
