import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import { Container } from "@/components/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { AppLayout } from "@/layouts/app-layout";
import { Image } from "@/components/image";
import MakeAppointmentModal from "./make-appointment-modal";
import axios from "axios"; // Import Axios
import Breadcrumb from "@/components/breadcrumb";
import swal from 'sweetalert2';

export default function AppointmentShow({ technician }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // State untuk menyimpan tanggal yang dipilih
  const [selectedTime, setSelectedTime] = useState(""); // State untuk menyimpan waktu yang dipilih
  const handleMakeAppointmentClick = () => {
    setShowModal(true);
  };

  const handleSubmit = () => {
    axios.post(route('landing.appointments.make', technician.id), {
      date: selectedDate,
      time: selectedTime,
    })
      .then((response) => {
        setShowModal(false);
        setSelectedDate("");
        setSelectedTime("");
        swal.fire("Success!", response.data.message, "success").then(() => {
          window.location.href = route("dashboard");
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        swal.fire("Error!", error.response.data.message, "error").then(() => {
        });
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
          <div className="grid lg:grid-cols-6 lg:gap-24 p-10">
            <div className="lg:col-span-3  lg:block">
              <Image
                className="h-auto lg:h-[26rem] border-4 mb-3 w-full  rounded-2xl object-cover object-center"
                src={technician.image}
                alt={technician.name}
              />
            </div>
            <div className="lg:col-span-3 ">
              <div className="flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {technician.name}
                </h2>
                <div className="mt-2">
                  <h6 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                    Specializations
                  </h6>
                  {technician.specialists.map((specialist) => (
                    <span
                      key={specialist.id}
                      className="mr-2 mb-2 inline-block rounded-md bg-gray-200 px-2 py-1 text-sm dark:bg-gray-700"
                    >
                      {specialist.name}
                    </span>
                  ))}
                </div>
                <Button
                  className={buttonVariants({ variant: "default" }) + " mt-2"}
                  onClick={handleMakeAppointmentClick}
                >
                  Make Appointment
                </Button>
              </div>
            </div>
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
