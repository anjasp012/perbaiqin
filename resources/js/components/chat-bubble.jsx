import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image } from "./image";

const ChatBubble = ({ message, senderType, created_at, image, isRead }) => {
  const bubbleStyles =
    senderType === "user"
      ? "bg-gray-100 dark:bg-gray-800 max-w-[70%] rounded-tl-md rounded-br-md rounded-tr-md p-3 self-end"
      : "bg-gray-100 dark:bg-gray-800 max-w-[70%] rounded-tr-md rounded-bl-md rounded-br-md p-3 self-start";

  const bubbleContainerStyles =
    senderType === "user" ? "justify-end" : "justify-start";

  return (
    <div className={`mb-2 flex w-auto ${bubbleContainerStyles}`}>
      {image ? (
        <div className={bubbleStyles}>
          <Dialog>
            <DialogTrigger>
              
            <div className="flex max-w-[15rem] justify-center rounded-lg   cursor-pointer">
                <Image
                  src={image}
                  alt="Uploaded Image"
                  className="aspect-[16/9] border w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="p-10">
              <Image src={image} className="w-full rounded-2xl"/>
            </DialogContent>
          </Dialog>
          <div className="max-w-full mt-2 break-words">
            <p className="text-justify">{message}</p>
          </div>
        </div>
      ) : (
        <div className={bubbleStyles}>
          <div className="max-w-full break-words">
            <p className="text-justify">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
