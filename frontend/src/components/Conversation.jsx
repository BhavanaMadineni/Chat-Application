import React from 'react'
import useConverstaion from '../Zustand/useConversation'
import { useSocketContext } from '../context/SocketContext';

const Conversation = ({conversation,lastIdx}) => {
const {selectedConversation, setSelectedConversation} = useConverstaion();

const isSelected = selectedConversation?._id === conversation._id
const {onlineUsers} = useSocketContext();
const isOnline = onlineUsers.includes(conversation._id)
  return (
    <div>
      <div className={`flex gap-3 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
      ${isSelected ? "bg-sky-500":""}
      `}
      onClick={()=>setSelectedConversation(conversation)}
      >

        <div className={`avatar ${isOnline? "online": ""}`}>
        <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt='userAvatar'/>
        </div>
        </div>

        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-800'>{conversation.fullName}</p>
                {/* <span className='text-xl'>✋</span> */}
            </div>
        </div>
      </div>
      {!lastIdx && <div className='divider my-0 py-0 h-1'></div> }
    </div>
  )
}

export default Conversation
