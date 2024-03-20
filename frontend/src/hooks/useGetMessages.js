import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                if (!selectedConversation) {
                    // Clear messages if no conversation is selected
                    setMessages([]);
                    return;
                }

                const res = await fetch(`/api/messages/${selectedConversation._id}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setMessages(data);
            } catch (error) {
              setMessages([]);
                
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation) {
            getMessages(); // Call getMessages only if a conversation is selected
        }
    }, [selectedConversation, setMessages]);

    return { messages, loading };
};

export default useGetMessages;
