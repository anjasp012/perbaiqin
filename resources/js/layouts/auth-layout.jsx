import { FlashMessage } from '@/components/flash-message';
import { Navigation } from './navigation';
export function AuthLayout({ children }) {
    return (
        <div className="min-h-screen">
            <Navigation />
            <FlashMessage />
            {children}
        </div>
    );
}
