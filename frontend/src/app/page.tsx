'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import NavBar from './(frontend)/components/NavBar';
export default function Home() {
  return (
    <div className="flex flex-col items-center  justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500 cursor-default">
      <motion.h1 
        className="text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Social Media Engagement Chatbot
      </motion.h1>
      <motion.p 
        className="text-xl text-white mb-8 text-center max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Get started with our AI-powered chatbot to boost your social media presence!
        Receive personalized advice and strategies to enhance your online engagement.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/chat">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100 transition-colors duration-300">
            Get Started
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
