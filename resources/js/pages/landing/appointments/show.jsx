import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import { AppLayout } from '@/layouts/app-layout';
import { Image } from '@/components/image';
import MakeAppointmentModal from './make-appointment-modal';
import axios from 'axios'; // Import Axios
import Breadcrumb from '@/components/breadcrumb';
import swal from 'sweetalert2';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AppointmentShow({ technician, reviews }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(''); // State untuk menyimpan tanggal yang dipilih
    const [selectedTime, setSelectedTime] = useState(''); // State untuk menyimpan waktu yang dipilih
    const handleMakeAppointmentClick = () => {
        setShowModal(true);
    };

    const handleSubmit = () => {
        axios
            .post(route('landing.appointments.make', technician.id), {
                date: selectedDate,
                time: selectedTime,
            })
            .then((response) => {
                setShowModal(false);
                setSelectedDate('');
                setSelectedTime('');
                swal.fire('Success!', response.data.message, 'success').then(() => {
                    window.location.href = route('dashboard');
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                swal.fire('Error!', error.response.data.message, 'error').then(() => {});
            });
    };

    return (
        <>
            <Head title={`Appointment : ${technician.name}`} />
            <Container>
                <Breadcrumb
                    links={[
                        { label: 'Home', url: '/' },
                        { label: 'Appointments', url: '/appointments' },
                        { label: technician.name, url: '#' },
                    ]}
                />
                <div className="mb-4 mt-4  rounded-xl lg:mb-16">
                    <div className="grid p-10 lg:grid-cols-6 lg:gap-24">
                        <div className="lg:col-span-3  lg:block">
                            <Image
                                className="mb-3 h-auto w-full rounded-2xl border-4  object-cover object-center lg:h-[26rem]"
                                src={technician.image}
                                alt={technician.name}
                            />
                        </div>
                        <div className="lg:col-span-3 ">
                            <div className="flex h-full w-full flex-col justify-between">
                                <div>
                                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{technician.name}</h2>
                                    <div className="mt-2">
                                        <div className="col-span-1">
                                            <h6 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">Specializations</h6>
                                            {technician.specialists.map((specialist) => (
                                                <span
                                                    key={specialist.id}
                                                    className="mb-2 mr-2 inline-block rounded-md bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700"
                                                >
                                                    {specialist.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Button className={buttonVariants({ variant: 'default' }) + ' mt-2'} onClick={handleMakeAppointmentClick}>
                                        Make Appointment
                                    </Button>
                                </div>
                                <div className="rounded-lg bg-gray-200 px-2 py-2 text-sm text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                                    <h6 className="mb-3 border-b pb-2 text-sm font-bold ">Contact Information</h6>
                                    <div className="grid grid-cols-12 text-sm">
                                        <div className="col-span-3">City</div>
                                        <div className="col-span-1">:</div>
                                        <div className="col-span-8">{technician.city}</div>
                                    </div>
                                    <div className="grid grid-cols-12 text-sm">
                                        <div className="col-span-3">Country</div>
                                        <div className="col-span-1">:</div>
                                        <div className="col-span-8">{technician.city}</div>
                                    </div>
                                    <div className="grid grid-cols-12 text-sm">
                                        <div className="col-span-3">Address</div>
                                        <div className="col-span-1">:</div>
                                        <div className="col-span-8">{technician.address}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <h3 className="mb-6 text-xl font-semibold leading-none tracking-tight">Reviews</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {reviews.map((review, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    {Array.from({ length: review.rate }, (_, starIndex) => (
                                        <span className="contents" key={starIndex}>
                                            ⭐
                                        </span>
                                    ))}
                                </CardHeader>
                                <CardContent>{review.review}</CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>

            {showModal && (
                <MakeAppointmentModal
                    technician={technician}
                    setShowModal={setShowModal}
                    setSelectedDate={setSelectedDate}
                    setSelectedTime={setSelectedTime}
                    handleSubmit={handleSubmit}
                />
            )}
        </>
    );
}

AppointmentShow.layout = (page) => <AppLayout children={page} />;
