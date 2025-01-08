import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ChatInterface from '../components/ChatInterface'
import  Navbar  from '../components/NavBar'
import { BarChart, Users, TrendingUp } from 'lucide-react'
import React from 'react'
import Footer from "../components/Footer"

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 cursor-default">
      <Navbar selected ={"chat"}/>
    <div className="container mx-auto p-4 pt-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 animate-fade-in-down">
        Social Media AI Assistant
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Social Media Analyzer</CardTitle>
            </CardHeader>
            <CardContent>
              <ChatInterface />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Social Media Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="Likes">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="Likes">Likes</TabsTrigger>
                  <TabsTrigger value="Shears">Shares</TabsTrigger>
                  <TabsTrigger value="Comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="Likes">
                  <div className="flex items-center space-x-2">
                    <BarChart className="h-5 w-5 text-blue-500" />
                    <span>Total likes: 309,359</span>
                  </div>
                </TabsContent>
                <TabsContent value="Shears">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-green-500" />
                    <span>Total Shares: 48,051</span>
                  </div>
                </TabsContent>
                <TabsContent value="Comments">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span>Total comment: 48,065 </span>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Post consistently to increase engagement</li>
                <li>Use relevant hashtags to reach your target audience</li>
                <li>Engage with your followers by responding to comments</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
  )
}
