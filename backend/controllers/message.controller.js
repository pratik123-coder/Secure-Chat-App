import Conversation from "../models/converstation.model.js";
import { Message } from "../models/message.model.js";

export const sendMessage = async ( req, res ) => {
    try {
        const { message} = req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;  
        let converstation = await Conversation.findOne({
            participants:{
                $all: [senderId, recieverId]
            }
        })  
        if(!converstation) {
            converstation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }
        const newMessage = await Message.create({
            senderId,
            recieverId,
            message
        })

        if(newMessage){
            converstation.messages.push(newMessage._id);
            
        }
        await converstation.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in Sending Message",error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) {
            return res.status(404).json({ error: "Conversation not found" });
        }

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};