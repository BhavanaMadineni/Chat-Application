import React, { useState,useEffect } from 'react'
import useConverstaion from '../Zustand/useConversation';

const useGetMessages =  () => {
    const [loading,setLoading] = useState(false);
    const {messages,setMessages, selectedConversation} = useConverstaion()

    useEffect(()=>{
        const getMessages = async ()=>{
            setLoading(true)
            try{
                const res = await fetch(`/api/messages/${selectedConversation._id}`)
                const data = await res.json()
                if(data.error) throw new Error(data.error)
        
                setMessages(data)
            }catch(err){
                toast.error(err.message)
            }finally{
                setLoading(false)
            }

        }

        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])

    return {messages, loading}
}


export default useGetMessages
