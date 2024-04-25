import React from 'react';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import komponen Avatar

const TechnicianCardNoChat = ({ technician }) => {
    return (
        <div className="my-4 flex items-center rounded-md border bg-white p-4 dark:bg-gray-800">
            <Avatar className="h-14 w-14 lg:ml-4 lg:mr-4 lg:h-24 lg:w-24">
                {technician.image ? (
                    <>
                        <AvatarImage src={technician.image} alt={technician.name} className="h-14 w-14 rounded-full object-cover lg:h-24 lg:w-24" />
                        <AvatarFallback>{technician.initial}</AvatarFallback>
                    </>
                ) : (
                    <AvatarFallback>{technician.initial}</AvatarFallback>
                )}
            </Avatar>
            <div className="ml-4">
                <h3 className="text-lg font-semibold">{technician.name}</h3>
                <div className="mt-2">
                    {technician.specialists.length > 0 ? (
                        technician.specialists.slice(0, 3).map((specialist, index) => (
                            <span key={specialist.id} className="mr-1 inline-block rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">
                                {specialist.name}
                                {index === 2 && technician.specialists.length > 3 && ' + More'}
                            </span>
                        ))
                    ) : (
                        <span className="mr-1 inline-block rounded-md bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700">No specialization</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TechnicianCardNoChat;
