import React from 'react';
import { Link } from '@inertiajs/react';
import { buttonVariants } from '@/components/ui/button';
import { CalendarClock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Import komponen Avatar

const AppointmentTechnicianCard = ({ technician }) => {
    return (
        <div className="flex items-center rounded-md border p-4">
            {/* Avatar */}
            <Avatar className="h-14 w-14 border-2 lg:ml-4 lg:mr-4 lg:h-24 lg:w-24">
                {technician.image ? (
                    <>
                        <AvatarImage src={technician.image} alt={technician.name} className="h-14 w-14 rounded-full object-cover lg:h-24 lg:w-24" />
                        <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
                    </>
                ) : (
                    <AvatarFallback>{technician.name.charAt(0)}</AvatarFallback>
                )}
            </Avatar>
            <div className="ml-4 overflow-hidden truncate">
                <h3 className="text-md line-clamp font-semibold">{technician.name}</h3>
                <div>
                    {technician.specialists.length > 0 ? (
                        technician.specialists.slice(0, 3).map((specialist, index) => (
                            <span key={index} className="mr-1 inline-block text-xs">
                                {index > 0 && ', '}
                                {specialist.name}
                                {index === 2 && technician.specialists.length > 3 && ', + More'}
                            </span>
                        ))
                    ) : (
                        <span className="mr-1 inline-block text-xs">No specialization</span>
                    )}
                </div>
                <Link
                    href={route('landing.appointments.show', technician.slug)}
                    className={buttonVariants({ variant: 'outline', size: 'sm' }) + ' mt-2 max-w-full'}
                >
                    <CalendarClock className="me-2 h-4 w-4" />
                    Make Appointment
                </Link>
            </div>
        </div>
    );
};

export default AppointmentTechnicianCard;
