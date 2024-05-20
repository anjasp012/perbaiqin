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

export default function CertificateCreate({ tags }) {
    const { errors } = usePage().props;
    const { data, setData, post, processing } = useForm({
        certificate: null,
        name: '',
    });

    const handleSubmit = (e) => {
        console.log(data);
        e.preventDefault();
        const formData = new FormData();
        formData.append('certificate', data.certificate);
        formData.append('name', data.name);
        post(route('technician.certificates.store'), formData);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'certificate') {
            setData(name, files[0]);
        } else {
            setData(name, value);
        }
    };

    return (
        <>
            <Head title="Create Certificate" />
            <Container>
                <Header title={'Certificate'} subtitle={'Create new Certificate'}></Header>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <form onSubmit={handleSubmit}>
                        <div className="mt-4">
                            <Label htmlFor="name">name</Label>
                            <Input type="text" name="name" id="name" value={data.name} onChange={handleChange} />
                            {errors.name && <div className="text-sm text-red-500">{errors.name}</div>}
                        </div>
                        <div className="mt-4">
                            <Label htmlFor="certificate">Certificate</Label>
                            <Input type="file" name="certificate" id="certificate" onChange={handleChange} />
                            {errors.certificate && <div className="text-sm text-red-500">{errors.certificate}</div>}
                        </div>

                        <div className="mt-4">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Processing...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}

CertificateCreate.layout = (page) => <TechnicianLayout children={page} />;
