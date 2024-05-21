// components/pages/AppointmentIndex.jsx

import React, { useState } from 'react';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Search as SearchIcon, MessageSquare } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import Breadcrumb from '@/components/breadcrumb';
import Pagination from '@/shared/pagination';
import Search from '@/shared/search';
import { Header } from '@/components/header';
import CollaborationCard from './collaboration-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CollaborationIndex() {
    const { auth, collaborations, cities, query, citySelected } = usePage().props;
    const [selectedCities, setSelectedCities] = useState(citySelected);
    const [querySearch, setQuerySearch] = useState(query);

    const handleCityChange = (city) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter((item) => item !== city));
        } else {
            setSelectedCities([...selectedCities, city]);
        }
    };

    const { get } = useForm();

    const handleFilter = () => {
        get(route('landing.collaborations.index', { cities: selectedCities, q: querySearch }));
    };
    const handleClearFilter = () => {
        get(route('landing.collaborations.index'));
    };

    return (
        <>
            <Head title="Collaborations" />
            <Container>
                <>
                    <Breadcrumb
                        links={[
                            { label: 'Home', url: '/' },
                            { label: 'Collaborations', url: '/collaborations' },
                        ]}
                    />
                    <Header title={'Collaborations Fix Up'} subtitle={`collaborations fix up`}></Header>
                    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                        <div className="grid gap-10 md:grid-cols-12">
                            <div className="md:col-span-12">
                                <div className="mt-0">
                                    <div className="grid grid-cols-12 gap-4">
                                        <div className="col-span-12 md:col-span-3">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-xl">Filter</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="mb-5">
                                                        <h4 className="mb-3 font-medium">City</h4>
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            {cities.map((city) => (
                                                                <label className="flex items-center">
                                                                    <Checkbox
                                                                        defaultChecked={false}
                                                                        name="lokasi"
                                                                        checked={selectedCities.includes(city)}
                                                                        onCheckedChange={(e) => handleCityChange(city)}
                                                                    />
                                                                    <span className="ml-2 select-none text-sm text-muted-foreground">{city}</span>
                                                                </label>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="mb-3">
                                                        <h4 className="mb-3 font-medium">Search</h4>
                                                        <Input
                                                            placeholder="Search Name"
                                                            type="search"
                                                            name="q"
                                                            id="q"
                                                            value={querySearch}
                                                            onChange={(e) => setQuerySearch(e.target.value)}
                                                        />
                                                    </div>
                                                    <Button onClick={handleFilter} className="mb-2 w-full">
                                                        Filter
                                                    </Button>
                                                    <Button onClick={handleClearFilter} variant="secondary" className="w-full">
                                                        Clear Filter
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <div className="col-span-12 md:col-span-9">
                                            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                {collaborations.data.length > 0 ? (
                                                    collaborations.data.map((collaboration) => (
                                                        <CollaborationCard key={collaboration.id} collaboration={collaboration} /> // Gunakan TechnicianCard di sini
                                                    ))
                                                ) : (
                                                    <p>No collaborations found.</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-2 flex justify-end">
                                    <Pagination links={collaborations.links} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </Container>
        </>
    );
}

CollaborationIndex.layout = (page) => <AppLayout children={page} />;
