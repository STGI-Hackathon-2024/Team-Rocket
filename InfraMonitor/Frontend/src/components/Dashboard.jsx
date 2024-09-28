import React from 'react'
import Navbar from './Navbar'


const Dashboard = ({ username, onLogout }) => {
  return (
    <div className='bg-gradient-to-br from-slate-900 to-stone-900 h-screen'>
        <Navbar username={username} onLogout={onLogout} />
    </div>
  )
}

export default Dashboard