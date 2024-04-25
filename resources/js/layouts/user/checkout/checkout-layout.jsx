import { FlashMessage } from '@/components/flash-message';
export function CheckoutLayout({ children }) {
    return (
        <>
            <div className="min-h-screen">
                <FlashMessage />
                <main>{children}</main>
            </div>
        </>
    );
}
