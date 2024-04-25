import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from 'lucide-react';

export default function MakeAppointmentModal({
  technician,
  setShowModal,
  setSelectedDate,
  setSelectedTime,
  handleSubmit,
}) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open
        onClose={setShowModal}
      >
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
            <div className="inline-block bg-white dark:bg-gray-900   align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-primary sm:mx-0 sm:h-10 sm:w-10">
                    <CalendarIcon className="text-white dark:text-gray-800"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium"
                    >
                      Make Appointment
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to make an appointment with{" "}
                        {technician.name}? This action cannot be undone.
                      </p>
                      <div className="mt-4">
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Date
                        </label>
                        <Input
                          type="date"
                          name="date"
                          id="date"
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="mt-4">
                        <label
                          htmlFor="time"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Time
                        </label>
                        <Input
                          type="time"
                          name="time"
                          id="time"
                          onChange={(e) => {
                            const selectedTime = e.target.value;
                            setSelectedTime(selectedTime);
                          }}
                          className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex justify-between">
                <Button
                  type="button"
                  onClick={() => handleSubmit(date, time)} // Memanggil handleSubmit dengan date dan time sebagai parameter
                >
                  Make Appointment
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
