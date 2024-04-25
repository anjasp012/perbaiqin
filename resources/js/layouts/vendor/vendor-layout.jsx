import { FlashMessage } from '@/components/flash-message';
import { Navigation } from './navigation';

export function VendorLayout({ children }) {
    return (
        <>

            <Navigation />
            <div className="min-h-screen">
                <FlashMessage />
                <main>{children}</main>
            </div>
        </>
    );
}
