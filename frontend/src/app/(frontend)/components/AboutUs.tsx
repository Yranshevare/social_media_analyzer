"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from 'next/link'

const teamMembers = [
  { id: "asura", name: "Dhiraj Lande (Asura)", role: "Full Stack Developer", bio: "Dhiraj (Asura) is a full-stack developer with expertise in building dynamic web applications and integrating AI technologies.", avatar: "dhiraj.jpg" },
  { id: "yash", name: "Yash Khilare", role: "Backend Developer", bio: "Yash specializes in backend development, creating efficient APIs and databases for scalable applications.", avatar: "/yash.jpg" },
  { id: "parth", name: "Parth Lohar", role: "Frontend Developer", bio: "Parth ensures that the user experience is intuitive and the design is visually engaging, focusing on seamless user interactions.", avatar: "/parth.jpg" },
  { id: "Yadnesh", name: "Yadnesh Ranshevare", role: "Full Stack Developer", bio: "Yadnesh brings full-stack development expertise, building robust and scalable solutions for modern applications.", avatar: "/yadnesh.jpg" }
]

export default function AboutUs() {
  
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Card className="shadow-lg cursor-default">
        <CardHeader className="bg-primary/5">
          <CardTitle className="text-2xl font-bold text-primary">About Our Project</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg text-muted-foreground">
            Our Social Media Engagement Chatbot is designed to help businesses and individuals enhance their social media presence. By leveraging advanced AI technology, we provide personalized suggestions, content ideas, and engagement strategies tailored to each user&apos;s unique needs and goals.
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamMembers.map((member, index) => (
          <Link href={`/team/${member.id}`} key={index}>
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer min-h-[250px]">
              <CardHeader className="flex flex-row items-center gap-4 bg-primary/5">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.avatar.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-bold text-primary">{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">{member.role}</p>
                </div>
              </CardHeader>
              <CardContent className="pt-4 flex-grow">
                <p className="text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
