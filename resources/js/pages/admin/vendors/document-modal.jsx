import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';

export default function DocumentModal({ setShowModal, name, image }) {
    return (
        <Transition.Root show={true} as={Fragment}>
            <Dialog as="div" static className="fixed inset-0 z-10 overflow-y-auto" open onClose={setShowModal}>
                <div className="flex min-h-screen items-center justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block transform overflow-hidden   rounded-lg bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <div className=" px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div>
                                    <Dialog.Title as="h3" className="text-center text-lg font-medium leading-6">
                                        {name}
                                    </Dialog.Title>
                                    <div className="mt-5">
                                        <img src={'/storage/' + image} className="w-100 h-100 mx-auto" />
                                    </div>
                                </div>
                            </div>

                            <div className="justify-center bg-gray-50 px-4 py-3 dark:bg-gray-700 sm:flex sm:px-6">
                                <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>
                                    Close
                                </Button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
