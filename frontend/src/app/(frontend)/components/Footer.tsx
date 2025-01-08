import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white shadow-md mt-8 border-t border-t-gray-300 cursor-default">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 sm:w-[20%]">
              <a 
              href="/" className="text-xl font-bold text-blue-600 w-full text-center hover:text-blue-800 transition-colors duration-200">
              SocialAI
              </a> 
              </div>
              <div className="text-sm text-gray-600 sm:w-[40%] text-center">
                © 2023 SocialAI Engagement Chatbot. All rights reserved.
              </div>
              <div className="mt-4 md:mt-0 sm:w-[40%] flex justify-center  ">
                <ul className="flex space-x-4 justify-evenly w-full">
                  <li><a href="#" className="text-gray-600 hover:text-primary">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-primary">Contact</a></li>
                </ul>
              </div>
            </div>
        </div>
    </footer>
  )
}
