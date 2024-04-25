import { FlashMessage } from '@/components/flash-message';
import { Navigation } from './navigation';

export function UserLayout({ children }) {
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
