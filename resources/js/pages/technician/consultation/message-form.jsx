import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send, X, Paperclip } from 'lucide-react';
import { Input } from '@/components/ui/input';

const MessageForm = ({ handleSubmit, newMessage, image, setImage, setNewMessage, loading, setLoading, setMessages, consultation }) => {
    const inputFileRef = useRef(null);

    const handleChange = (e) => {
        if (e.target.name === 'message') {
            setNewMessage(e.target.value);
        } else if (e.target.name === 'image') {
            setImage(e.target.files[0]);
        }
    };

    const cancelImageSelection = () => {
        setImage(null);
        if (inputFileRef.current) {
            inputFileRef.current.value = null;
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex  justify-between h-full">
            <div className="flex items-center ">
                <div className="flex-shrink-0 relative">
                    {image && (
                        <div className="relative w-12 h-12">
                            <img src={URL.createObjectURL(image)} alt="Selected Image" className="h-full w-full rounded-md" />
                            <Button
                                type="button"
                                size="icon"
                                onClick={cancelImageSelection}
                                className="absolute right-0 top-0 rounded-full p-1 shadow focus:outline-none"
                            >
                                <X size={16} />
                            </Button>
                        </div>
                    )}
                </div>
                <label className="flex items-center cursor-pointer">
                    <input ref={inputFileRef} type="file" className="hidden" accept="image/*" onChange={handleChange} name="image" />
                    <span className="cursor-pointer rounded-md   text-gray-600"><Paperclip /></span>
                </label>
            </div>
            <div className='w-full flex items-center mx-2'>
            <Input
                    className="flex-grow resize-none w-full rounded-md p-2 ml-2"
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
