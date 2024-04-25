import { FlashMessage } from '@/components/flash-message';
import { Sidebar } from './sidebar';
import { Navigation } from './sidebar/navbar';
import { useState } from 'react';
// import { Navigation } from './sidebar/navbar';

export function DashLayout({ children }) {
    const [minimizeSidebar, setMinimizeSidebar] = useState(false);

    const toggleSidebar = () => {
        setMinimizeSidebar(!minimizeSidebar);
    };
    return (
        <div className="min-h-screen">
            <Sidebar toggleSidebar={toggleSidebar} minimizeSidebar={minimizeSidebar} />
            <FlashMessage />
            <main className={`duration-200`}>
                <Navigation />
                {children}
            </main>
        </div>
    );
}
