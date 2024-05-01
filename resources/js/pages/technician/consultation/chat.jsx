import React, { useEffect, useState, useRef } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import ChatBubble from '@/components/chat-bubble-technician';
import MessageForm from './message-form';
import { User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserLayout } from '@/layouts/user/user-layout';
import { Container } from '@/components/container';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatLayout } from '@/layouts/technician/chat/chat-layout';
import { ChatNav } from '@/layouts/technician/chat/chat-nav';

const ChatRoom = () => {
    const { consultation, env, auth } = usePage().props;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const [image, setImage] = useState(null);
    const [echo, setEcho] = useState(null);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        fetchChat();
        initializeEcho();
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            scrollToBottom();
        }
    }, [messages]);

    const fetchChat = () => {
        axios
            .get(route('consultation.fetch_chat', consultation.id))
            .then((response) => {
                const { messages } = response.data;
                setMessages(messages);
                setInitialLoad(false);
            })
            .catch((error) => {
                console.error('Error fetching chat:', error);
            });
    };

    const initializeEcho = () => {
        const echoInstance = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
            wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
            wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
            wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
            forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });
        setEcho(echoInstance);

        if (echoInstance) {
            echoInstance.private(`consultation.${consultation.id}`).listen('.consultation-send', (data) => {
                console.log('New message received:', data);
                setMessages((prevMessages) => [...prevMessages, data]);
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('message', newMessage);
        if (image) {
            formData.append('image', image);
        }
        axios
            .post(route('technician.consultations.send', consultation.id), formData)
            .then((response) => {
                const { message } = response.data;
                setMessages([...messages, message]);
                setNewMessage('');
                setImage(null);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error sending message:', error);
                setLoading(false);
            });
    };

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Head title="Chat" />
            <Container />
            <div className="grid-1 grid ">
                <div className="flex h-screen w-full flex-col">
                    <ChatNav consultation={consultation} />

                    <ScrollArea className="flex-1 overflow-y-auto px-4">
                        <div className="mt-4 px-3" style={{ minHeight: 'calc(100vh - 8rem)' }}>
                            {messages.map((message, index) => (
                                <ChatBubble
                                    key={index}
                                    message={message.message}
                                    created_at={message.created_at}
                                    senderType={message.sender_type}
                                    image={message.image ?? null}
                                />
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    <div className="bg-gray-100 p-4 dark:bg-gray-800">
                        <MessageForm
                            handleSubmit={handleSubmit}
                            newMessage={newMessage}
                            image={image}
                            setImage={setImage}
                            setNewMessage={setNewMessage}
                            consultation={consultation}
                            setMessages={setMessages}
                            setLoading={setLoading}
                            loading={loading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

ChatRoom.layout = (page) => <ChatLayout children={page} />;
export default ChatRoom;
