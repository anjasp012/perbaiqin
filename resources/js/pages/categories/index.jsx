import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { DashLayout } from '@/layouts/dash-layout';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash } from 'lucide-react'; // Import ikon Edit dan Trash dari lucide-react

export default function CategoryIndex() {
    const { categories } = usePage().props;

    const deleteCategory = (categoryId) => {
        // Tambahkan logika penghapusan kategori di sini
    };

    return (
        <>
            <Head title="Categories" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">Categories</h1>
                        <Link href={route('categories.create')}>
                            <Button variant="default">Create Category</Button>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {categories.map((category) => (
                            <Card key={category.id}>
                                <CardHeader>
                                    <CardTitle>{category.name}</CardTitle>
                                    <CardDescription>{category.products.length} Products of Category</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center space-x-4">
                                        <Link href={route('categories.edit', category.id)}>
                                            <Button size="sm">
                                                <Edit size={16} /> Edit
                                            </Button>
                                        </Link>
                                        <Button size="sm" variant="destructive" onClick={() => deleteCategory(category.id)}>
                                            <Trash size={16} /> Delete
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    );
}

CategoryIndex.layout = (page) => <DashLayout children={page} />;
