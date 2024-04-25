import React, { useEffect, useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { AdminLayout } from '@/layouts/admin-layout';
import Select from 'react-select';
import { Button } from '@/components/ui/button';

export default function TechnicianShow() {
    const { technician, specialists } = usePage().props;
    const { data, setData, post, processing } = useForm({
        specialist_ids: technician.specialists.map((s) => s.id.toString()) || [],
    });

    const [selectedSpecialists, setSelectedSpecialists] = useState([]);

    useEffect(() => {
        // Inisialisasi nilai awal selectedSpecialists dengan spesialisasi yang dimiliki oleh teknisi
        const initialSelected = technician.specialists.map((s) => ({
            value: s.id.toString(),
            label: s.name,
        }));
        setSelectedSpecialists(initialSelected);
    }, [technician]);

    const handleSelectChange = (selectedOptions) => {
        // Mengatur nilai selectedSpecialists saat ada perubahan pada select
        setSelectedSpecialists(selectedOptions);
        const selectedIds = selectedOptions.map((option) => option.value);
        setData('specialist_ids', selectedIds);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('admin.technicians.manage-specialists', technician.slug));
    };

    const options = specialists.map((specialist) => ({
        value: specialist.id.toString(),
        label: specialist.name,
    }));

    return (
        <>
            <Head title={`Technician: ${technician.name}`} />
            <Container>
                <div className="px-4 py-6 sm:px-6 lg:p-8">
                    <div className="mb-8">
                        <h1 className="text-2xl font-semibold">Technician Details</h1>
                    </div>
                    <div className="overflow-hidden">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Profile Information</h3>
                        </div>
                        <div className="border-t border-gray-200 px-4 py-5 dark:border-gray-700 sm:px-6">
                            <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Name</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{technician.name}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Email</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{technician.email}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Phone</dt>
                                    <dd className="mt-1 text-sm text-gray-900 dark:text-white">{technician.phone}</dd>
                                </div>
                                {technician.image && (
                                    <div className="sm:col-span-2">
                                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Profile Picture</dt>
                                        <dd className="mt-1 flex items-center">
                                            <img src={technician.image} alt={technician.name} className="h-12 w-12 rounded-full object-cover" />
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Manage Specialists</h3>
                            <Select
                                options={options}
                                isMulti
                                onChange={handleSelectChange}
                                value={selectedSpecialists}
                                inputId="specialist_ids"
                                name="specialist_ids[]"
                            />
                        </div>
                        <div className="px-4 py-4 sm:px-6">
                            <Button type="submit" variant="default" onClick={handleSubmit} disabled={processing}>
                                {processing ? 'Saving...' : 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

TechnicianShow.layout = (page) => <AdminLayout children={page} />;
