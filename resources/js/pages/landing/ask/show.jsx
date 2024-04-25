import React from "react";
import { Head, Link, usePage, useForm } from "@inertiajs/react";
import { Container } from "@/components/container";
import { Button, buttonVariants } from "@/components/ui/button";
import { AppLayout } from "@/layouts/app-layout";
import { Image } from "@/components/image";
import swal from "sweetalert";
import Breadcrumb from "@/components/breadcrumb";
import { formatRupiah } from "@/lib/utils";

export default function TechnicianShow({ technician }) {
  const { post } = useForm();

  const handleConsultation = () => {
    swal({
      title: "Are you sure?",
      text: `You are about to start consultation with ${technician.name}`,
      icon: "info",
      buttons: ["Cancel", "Confirm"],
      dangerMode: false,
    }).then((willConsult) => {
      if (willConsult) {
        post(`/create-consultation/${technician.slug}`);
      }
    });
  };

  return (
    <>
      <Head title={`Ask with : ${technician.name}`} />
      <Container>
        <Breadcrumb
          links={[
            { label: 'Home', url: '/' },
            { label: 'Ask Technician', url: '/ask-technician' },
            { label: technician.name, url: '#' },
          ]}
        />
        <div className="mb-4 mt-4 rounded-xl lg:mb-16">
          <div className="grid lg:grid-cols-6 lg:gap-24 p-10">
            <div className="lg:col-span-3  lg:block">
              <Image
                className="h-auto lg:h-[26rem] border-4 mb-3 w-full bg-white dark:bg-gray-700 rounded-2xl object-cover object-center"
                src={technician.image}
                alt={technician.name}
              />
            </div>
            <div className="flex h-full flex-col pl-4 pr-4 lg:col-span-3 mt-4">
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
                      className="mr-2 inline-block rounded-md bg-gray-200 mb-2 px-2 py-1 text-sm dark:bg-gray-700"
                    >
                      {specialist.name}
                    </span>
                  ))}
                </div>
                <p className="mb-3 mt-6 text-lg leading-8 text-muted-foreground">
                 {formatRupiah(technician.price)}
                </p>
                <Button
                  onClick={handleConsultation}
                  className={buttonVariants({ variant: "default" })}
                >
                  Consultation Now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

TechnicianShow.layout = (page) => <AppLayout children={page} />;
