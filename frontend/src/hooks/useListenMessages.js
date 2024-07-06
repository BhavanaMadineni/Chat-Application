import React, { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConverstaion from '../Zustand/useConversation';
import notificationSOund from "../assets/sounds/i_phone_notification.mp3"

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages} = useConverstaion();

  useEffect(()=>{
    socket?.on("newMessage", (newMessage)=>{
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSOund);
        sound.play();
        setMessages([...messages,newMessage])
    })

    return ()=> socket?.off("newMessage")
  },[socket, setMessages, messages])
}

export default useListenMessages
