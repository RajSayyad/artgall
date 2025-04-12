import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';

const Dashboard = () => {
  const {user} = useContext(UserContext);
  if(!user){
       return <div>Loading</div>
  }
  return (
    <div>Hello {user.username}</div>
  )
}

export default Dashboard