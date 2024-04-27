import { FlashMessage } from '@/components/flash-message';
import { Navigation } from '@/layouts/admin/navigation';
import { Footer } from '@/layouts/footer';

export function AdminLayout({ children }) {
    return (
        <>
            <Navigation />
            <div className="min-h-screen">
                {/* <Navigatio /> */}
                <FlashMessage />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
