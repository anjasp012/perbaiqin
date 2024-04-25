import React from "react";
import { Link } from "@inertiajs/react";
import { buttonVariants } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import komponen Avatar
import { formatRupiah } from "@/lib/utils";

const TechnicianCard = ({ technician }) => {
  return (
    <div className="flex items-center rounded-md border ">
   
      <Avatar className="h-14 w-14 lg:ml-4 border-2 lg:mr-4 lg:h-24 lg:w-24">
    
        {technician.image ? (
          <>
            <AvatarImage
              src={technician.image}
              alt={technician.name}
              className="h-14 w-14 rounded-full object-cover lg:h-24 lg:w-24"
            />
            <AvatarFallback>{technician.initial}</AvatarFallback>
          </>
        ) : (
          <AvatarFallback>{technician.initial}</AvatarFallback>
        )}
      </Avatar>
      <div className="py-3">
        <h3 className="text-md font-semibold ">
          {technician.name}
        </h3>
        <div className="mt-1 gap-1">
          {technician.specialists.length > 0 ? (
            technician.specialists.slice(0, 3).map((specialist, index) => (
              <span className="mr-1 inline-block text-xs">
                {index > 0 && ","}
                {specialist.name}
                {index === 2 && technician.specialists.length > 3 && ", + More"}
              </span>
            ))
          ) : (
            <span className="mr-1 inline-block text-xs">No specialization</span>
          )}

        </div>
        <div className="mb-1 mt-1">
          <span className="bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700 inline-block rounded-md  ">
            {formatRupiah(technician.price)}
          </span>
        </div>
        <Link
          href={route("landing.ask-technician.show", technician.slug)}
          className={
            buttonVariants({ variant: "outline", size: "sm" }) + " my-2"
          }
        >
          <MessageSquare className="me-2 h-4 w-4" />
          Chat
        </Link>
      </div>
    </div>
  );
};

export default TechnicianCard;
