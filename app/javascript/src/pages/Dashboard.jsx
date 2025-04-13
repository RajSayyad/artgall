import React, { useContext, useEffect, useState } from 'react'
import { useUser } from '../contexts/UserContext';

const Dashboard = () => {
  const {user} = useUser();
  console.log(user);
  if(!user){
       return <div>Loading</div>
  }
  return (
    <div>Hello {user.username}</div>
  )
}

export default Dashboard