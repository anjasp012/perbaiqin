import { FlashMessage } from '@/components/flash-message';
import { Sidebar } from './sidebar';
import { Navigation } from './sidebar/navbar';
import { useState } from 'react';
// import { Navigation } from './sidebar/navbar';

export function PosLayout({ children }) {
    const [minimizeSidebar, setMinimizeSidebar] = useState(true);

    const toggleSidebar = () => {
        setMinimizeSidebar(!minimizeSidebar);
    };
    return (
        <div className="min-h-screen">
            <Sidebar toggleSidebar={toggleSidebar} minimizeSidebar={minimizeSidebar} />
            <FlashMessage />
            <main className={`duration-200 ${minimizeSidebar ? 'lg:pl-80' : 'lg:pl-24'}`}>
                <div className="xl:pr-[22rem]">
                    <Navigation />
                    {children}
                </div>
            </main>
        </div>
    );
}
