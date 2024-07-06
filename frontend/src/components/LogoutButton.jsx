import React from 'react'
import { RiLogoutBoxLine } from "react-icons/ri";
import useLogout from '../hooks/useLogout';

const LogoutButton = () => {

  const {loading, logout} = useLogout();
  return (
    <div className='mt-auto '>
      <RiLogoutBoxLine className='w-6 h-6 text-gray-800 cursor-pointer'
        onClick={logout}
      />
    </div>
  )
}

export default LogoutButton
