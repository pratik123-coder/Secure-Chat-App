import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { messages, setMessages } = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        });

        // Listen for 'dhKeys' event
        socket?.on("dhKeys", (dhKeys) => {
            // Handle the received DH keys, you might want to store them or use them for encryption
            console.log("Received DH keys:", dhKeys);
        });

        return () => {
            socket?.off("newMessage");
            socket?.off("dhKeys"); // Make sure to remove the listener when unmounting
        };
    }, [socket, setMessages, messages]);
};

export default useListenMessages;
