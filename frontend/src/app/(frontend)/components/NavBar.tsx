/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Link from 'next/link'
import { Home, MessageCircle, Info } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NavBar({selected}:any) {

    const [chat,setChat] = useState("text-gray-900")
    const [about,setAbout] = useState("text-gray-900")
    const [home,setHome] = useState("text-gray-900")
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const router = useRouter()

   
//   const { pathname, query, asPath } = router;
//   console.log(pathname)
    

    useEffect(() =>{
        if(selected === "chat"){
            setChat("text-blue-600")
            setHome("text-gray-900")
        }
        if(selected === "about"){
            setAbout("text-blue-600")
            setHome("text-gray-900")
        }
    },[selected])
    


  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex space-x-8">
              <Link 
              href="/" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${home} hover:text-blue-600 transition-colors duration-200`}>
                <Home className="mr-1 h-4 w-4" />
                Home
              </Link>
              <Link 
              href="/chat" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${chat} hover:text-blue-600 transition-colors duration-200`}>
                <MessageCircle className="mr-1 h-4 w-4" />
                Chat
              </Link>
              <Link 
              href="/about" 
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${about} hover:text-blue-600 transition-colors duration-200`}>
                <Info className="mr-1 h-4 w-4" />
                About
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link 
            href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200">
              SocialAI
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
