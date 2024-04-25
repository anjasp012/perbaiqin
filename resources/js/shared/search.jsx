import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Search({ URL }) {
    const [search, setSearch] = useState('');

    const searchHandler = (e) => {
        e.preventDefault();
        router.get(`${URL}?q=${search}`);
    };

    return (
        <>
            <form onSubmit={searchHandler} className="w-full  max-w-sm">
                <div className="flex items-center gap-3 py-2">
                    <Input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Type keywords and press Enter..." />
                    <Button type="submit">Search</Button>
                </div>
            </form>
        </>
    );
}
