import React from 'react';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { Container } from '@/components/container';
import { AppLayout } from '@/layouts/app-layout';
import { buttonVariants } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import TechnicianCardNoChat from '@/components/technicians/TechnicianCardNoChat';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Swal from 'sweetalert2';

const ConsultationIndex = () => {
    const { post } = useForm();
    const { auth, consultation } = usePage().props;
    const total = 0;

    const handleConfirmation = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to confirm the payment.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, confirm payment!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Jika pengguna mengonfirmasi, kirim permintaan POST
                handleSubmit();
            }
        });
    };

    const handleSubmit = () => {
        // Mengirim permintaan POST ke consultation.confirmation
        post(route('consultation.confirmation', consultation.id));
    };

    return (
        <>
            <Head title="Consultation" />
            <Container className="max-w-7xl">
                <div className="mx-auto mt-3 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                    <div className="grid-col-1 grid lg:grid-cols-2">
                        <div className="rounded-md p-4">
                            <h2 className="mt-5 text-2xl font-bold">Chat with Technician at Perbaiqin</h2>
                            <p>Consultation service ready to assist you</p>
                            <Link
                                className={buttonVariants({ variant: 'default' }) + ' mb-3 mt-3'}
                                href={route('landing.ask-technician.show', consultation.technician.slug)}
                            >
                                <ArrowLeft className="h-4 w-4" /> Back
                            </Link>
                        </div>
                        <div className="rounded-md border bg-gray-100 p-4 dark:bg-gray-600">
                            <h3 className="mb-3 text-lg font-semibold">Payment Summary</h3>
                            <ScrollArea className="h-80 px-8">
                                <TechnicianCardNoChat technician={consultation.technician} />
                                <div className="my-4 rounded-md border bg-white p-4 text-sm dark:bg-gray-800">
                                    <div className="flex justify-between">
                                        <div>Session Fee</div>
                                        <div className="ml-auto">Rp {consultation.technician.price}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>100% Discount</div>
                                        <div className="ml-auto">- Rp {consultation.technician.price}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div style={{ fontWeight: 'bold' }}>Total</div>
                                        <div className="ml-auto" style={{ fontWeight: 'bold' }}>
                                            Free
                                        </div>
                                    </div>
                                </div>

                                <div className="my-4 flex items-center rounded-md border bg-white p-4 dark:bg-gray-800">
                                    <div className="mb-3 w-full">
                                        <Label>Discount Coupon</Label>
                                        <Input type="text" className="mt-2 w-full" disabled placeholder="PROMO100PERCENT"></Input>
                                    </div>
                                </div>
                            </ScrollArea>

                            <button onClick={handleConfirmation} className={buttonVariants({ variant: 'default', size: 'sm' }) + ' mt-2 w-full'}>
                                Confirmation
                            </button>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};

ConsultationIndex.layout = (page) => <AppLayout children={page} />;
export default ConsultationIndex;
