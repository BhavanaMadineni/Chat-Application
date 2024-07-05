const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

exports.sendMessage =async (req,res)=>{
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([conversation.save(),newMessage.save()]);


        res.status(201).json(newMessage);
    }catch(err){
        console.log("error while sending message", err.message)
        res.status(500).json({error:"Internal server error"})
    }
}

exports.getMessage =async (req,res)=>{
    try{
       const {id: userToChatId} = req.params;
       const senderId = req.user._id;

       const conversation = await Conversation.findOne({
        participants: { $all: [senderId, userToChatId]},
       }).populate("messages").exec();

       if(!conversation){
        return res.status(200).json([]);
       }

       res.status(200).json(conversation.messages);
    }catch(err){
        console.log("error while getting message", err.message)
        res.status(500).json({error:"Internal server error"})
    }
}