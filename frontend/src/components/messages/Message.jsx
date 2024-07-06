import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConverstaion from '../../Zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({message}) => {
  const {authUser} = useAuthContext();
  const {selectedConversation} =useConverstaion();

  const fromMe = message.senderId === authUser.data._id;
  const formatedTime = extractTime(message.createdAt);

  const chatClassName = fromMe? 'chat-end' : 'chat-start';
  const profilePic = fromMe? authUser.data.profilePic: selectedConversation?.profilePic;
  const bgColor = fromMe? ' bg-blue-500':"";
  const shakeClass = message.shouldShake ? "shake": ""

  return (
    <div className= {`chat ${chatClassName}`}>
      <div className=' chat-image avatar'>
        <div className='w-10 rounded-full'>
            <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic} />
    
        </div>
      </div>
      <div className= {`chat-bubble text-white pb-2 ${bgColor} ${shakeClass}`}> {message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
        {formatedTime}
      </div>
    </div>
  )
}

export default Message
