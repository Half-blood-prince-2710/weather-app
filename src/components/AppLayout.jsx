import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header';

const AppLayout = () => {
    
  return (
      <div className=' bg-gradient-to-br from-background to-muted'>
          <Header/>
      <main className='min-h-screen container mx-auto px-4 py-8'>
        <Outlet />
      </main>
      <footer className='border-t py-12 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='text-center text-gray-300 px-4 mx-auto '>
          <p>Made by @half-blood-prince-2710</p>
        </div>
      </footer>
    </div>
  );
}

export default AppLayout
