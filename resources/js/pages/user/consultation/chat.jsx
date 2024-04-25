import React, { useEffect, useState, useRef } from "react";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import ChatBubble from "@/components/chat-bubble";
import MessageForm from "./message-form";
import { User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserLayout } from "@/layouts/user/user-layout";
import { Container } from "@/components/container";
import { ScrollArea } from "@/components/ui/scroll-area";
import Swal from 'sweetalert';

const ChatRoom = () => {
  const { consultation, env, auth } = usePage().props;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchChat();
    subscribeToPusher();
  }, []);

  useEffect(() => {
      scrollToBottom();
  }, [messages]);

  const fetchChat = () => {
    axios
      .get(route("consultation.fetch_chat", consultation.id))
      .then((response) => {
        const { messages } = response.data;
        setMessages(messages);
      })
      .catch((error) => {
        console.error("Error fetching chat:", error);
      });
  };

  const subscribeToPusher = () => {
    const pusher = new Pusher(env.pusher_app_key, {
      cluster: env.pusher_app_cluster,
    });

    const channel = pusher.subscribe(`consultation.${consultation.id}`);
    channel.bind("consultation-send", (data) => {
      const newMessage = {
        message: data.message,
        created_at: data.created_at,
        sender_type: data.sender,
        image: data.image,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      scrollToBottom();
    });
    const messageReadChannel = pusher.subscribe(
      `message-read.${consultation.id}`
    );
    messageReadChannel.bind("consulation-read", (data) => {
      markMessageAsRead(data.message.id);
    });

    return () => {
      pusher.unsubscribe(`consultation.${consultation.id}`);
      pusher.unsubscribe(`message-read.${consultation.id}`);
      pusher.disconnect();
    };
  };

  const markMessageAsRead = (messageId) => {
    axios
      .post(route("consultation.message.mark_as_read", messageId))
      .then((response) => {
        console.log("Message marked as read");
      })
      .catch((error) => {
        console.error("Error marking message as read:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("message", newMessage);
    if (image) {
      formData.append("image", image);
    }
    axios
      .post(route("consultation.send", consultation.id), formData)
      .then((response) => {
        const { message } = response.data;
        setMessages([...messages, message]);
        setNewMessage("");
        setImage(null);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to send message. Please try again later.",
        });
      });
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head title="Chat" />
   <Container/>
   <div className="grid grid-1 md:grid-cols-2">
        <div className="hidden md:block">

        </div>
        <div className="w-full h-screen flex flex-col">
          <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-4">
            <div className="flex items-center">
              <Avatar className="flex items-center">
                <AvatarImage
                  src={consultation.technician.image}
                  alt={consultation.technician.name}
                  className="h-10 w-10 rounded-full border-2"
                />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>

              </Avatar>
              <h2 className="text-lg font-semibold ml-2">
                {consultation.technician.name}
              </h2>
            </div>
          </div>

          <ScrollArea className="flex-1 overflow-y-auto px-4">
            <div className="px-3 mt-4" style={{ minHeight: "calc(100vh - 8rem)" }}>
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

          <div className="bg-gray-100 dark:bg-gray-800 p-4">
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

ChatRoom.layout = (page) => <UserLayout children={page} />;
export default ChatRoom;
