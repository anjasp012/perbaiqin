import { FlashMessage } from '@/components/flash-message';
import { Nav } from '@/layouts/admin/nav';
import { Footer } from '@/layouts/footer';

export function AdminLayout({ children }) {
    return (
        <>
            <Nav />
            <div className="min-h-screen">
                {/* <Navigatio /> */}
                <FlashMessage />
                <main>{children}</main>
                <Footer />
            </div>
        </>
    );
}
