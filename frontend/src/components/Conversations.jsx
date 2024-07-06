import React from 'react'
import Conversation from './Conversation'
import useGetConverstaions from '../hooks/useGetConverstaions';

const Conversations = () => {
   const {loading, conversations}=useGetConverstaions();
  
  return (
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx)=>(
        <Conversation
          key={conversation._id}
          conversation = {conversation}
          lastIdx = {idx === conversations.length-1}
        />
      ))}
        {loading? <span className='loading loading-spinner mx-auto'></span>: null}
    </div>
  )
}

export default Conversations
