import { FlashMessage } from '@/components/flash-message';
export function ChatLayout({ children }) {
    return (
        <>
        <div className="min-h-screen">
            <FlashMessage />
            <main>{children}</main>
        </div>
        </>
    );
}
