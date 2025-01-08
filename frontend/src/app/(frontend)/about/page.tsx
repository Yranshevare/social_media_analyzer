"use client"
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'

export default function AboutPage() {
  return (
    <>
    <NavBar selected={"about"}/>
    <div className="container mx-auto px-4 py-8">
        
      <h1 className="text-4xl font-bold mb-8 text-center text-primary cursor-default">Meet Our Team</h1>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto cursor-default">
        We&apos;re a diverse group of experts dedicated to revolutionizing social media engagement through AI technology.
      </p>
      
      <AboutUs />
    </div>
    <Footer/>
    </>
  )
}

