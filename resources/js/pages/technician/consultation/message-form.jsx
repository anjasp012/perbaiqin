import React, { useRef, useState } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Send, X, Paperclip, Plus, ChevronUp, GaugeIcon, File, Cross } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Dialog, DialogPortal } from '@/components/ui/dialog';

const MessageForm = ({ handleSubmit, newMessage, image, setImage, setNewMessage, loading, setLoading, setMessages, consultation }) => {
    const inputFileRef = useRef(null);
    const handleChange = (e) => {
        if (e.target.name === 'message') {
            setNewMessage(e.target.value);
        } else if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        }
        console.log(e.target.name);
    };

    const cancelImageSelection = () => {
        setImage(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex  h-full justify-between">
            <div className="flex items-center ">
                {image ? (
                    <div
                        onClick={cancelImageSelection}
                        className={buttonVariants({ variant: 'default', size: 'icon' }) + ' relative m-0 h-9 w-10 cursor-pointer p-0'}
                    >
                        <img src={URL.createObjectURL(image)} alt="Selected Image" className="h-full w-full rounded-md" />
                        <span className="absolute rotate-45 rounded-full bg-destructive p-0.5 text-destructive-foreground hover:bg-destructive/90">
                            <Plus size={16} />
                        </span>
                    </div>
                ) : (
                    <>
                        <DropdownMenu>
                            <DropdownMenuTrigger className={cn(buttonVariants({ size: 'sm' }), 'tracking-tighter')}>
                                <Plus className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start" className="w-full">
                                <DropdownMenuItem asChild>
                                    <label onClick={() => document.getElementById('image').click()} className="cursor-pointer">
                                        <Paperclip className="mr-2 h-4 w-4" />
                                        Image
                                    </label>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <label className="cursor-pointer">
                                        <File className="mr-2 h-4 w-4" />
                                        Product
                                    </label>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <input id="image" ref={inputFileRef} type="file" className="hidden" accept="image/*" onChange={handleChange} name="image" />
                    </>
                )}
            </div>

            <div className="mx-2 flex w-full items-center">
                <Input
                    className="ml-2 w-full flex-grow resize-none rounded-md p-2"
                    placeholder="Type your message..."
                    value={newMessage}
                    name="message"
                    onChange={handleChange}
                />
            </div>
            <div className="flex items-center justify-between">
                <Button type="submit" variant="default" className={`${loading ? 'cursor-not-allowed opacity-50' : ''}`}>
                    <Send className="me-2 h-4 w-4" />
                    {loading ? 'Sending...' : 'Send'}
                </Button>
            </div>
        </form>
    );
};

export default MessageForm;
