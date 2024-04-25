import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react'; // Import Inertia
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Image } from '@/components/image';
import { Input } from '@/components/ui/input';
import { PosLayout } from '@/layouts/pos-layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AsideCart from '@/layouts/sidebar/aside';

export default function PosIndex() {
    const { products, categories, auth, cartItems } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
        setSearchTerm(''); // Clear the search input when category is changed
    };
    const addToCart = (productId) => {
        const qty = 1; // Jumlah item yang akan ditambahkan ke keranjang
        router.post(route('add-to-cart'), { product_id: productId, qty });
    };

    const filteredProducts = products.filter((product) => {
        // Filter by category if category is selected
        const categoryFilter = selectedCategory === '' || product.category_id === selectedCategory;
        // Filter by search term
        const searchFilter = searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryFilter && searchFilter;
    });

    return (
        <>
            <Head title="POS" />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <h1 className="text-xl font-semibold">{auth.selected_store.name}</h1>
                    </div>
                    <div className="space-2 mb-4 flex justify-between">
                        <Select>
                            <SelectTrigger className={'w-180 me-4'}>
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all" onClick={() => handleCategoryChange('')}>
                                    All Categories
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem key={category.id} value={category.id} onClick={() => handleCategoryChange(category.id)}>
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <br />

                        <Input
                            type="text"
                            className="rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <Card key={product.id}>
                                <CardHeader>
                                    <CardTitle>{product.name}</CardTitle>
                                    <CardDescription>${product.price}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Image
                                        className="aspect-[16/9] w-full rounded-2xl bg-black object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                                        src={'storage/' + product.thumbnail}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button key={product.id} size="sm" onClick={() => addToCart(product.id)}>
                                        Add to Cart
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                    <div className="mt-8"></div>
                </div>
            </Container>
            <AsideCart cartItems={cartItems} />
        </>
    );
}

PosIndex.layout = (page) => <PosLayout children={page} />;
