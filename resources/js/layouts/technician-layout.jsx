import { FlashMessage } from '@/components/flash-message';
import { Footer } from '@/layouts/footer';
import { NavigationTechnician } from './technician';

export function TechnicianLayout({ children }) {
    return (
        <div className="min-h-screen">
            {/* <NavigationTechnician /> */}
            <FlashMessage />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
