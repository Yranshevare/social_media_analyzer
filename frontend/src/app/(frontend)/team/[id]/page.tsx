import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  skills: string[];
  projects: { name: string; description: string }[];
}

const teamMembers: TeamMember[] = [
  {
    id: "asura",
    name: "Dhiraj Lande (Asura)",
    role: "Full Stack Developer",
    bio: "Dhiraj (Asura) is a full-stack developer with expertise in building dynamic web applications and integrating AI technologies.",
    avatar: "/dhiraj.jpg",
    email: "landedhiraj928@gmail.com",
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "AI Integration",
      "Nextjs",
      "TypeScript",
      "Fastapi",
      "Python",
      "Docker",
    ],
    projects: [
      {
        name: "DynamicWebApp",
        description: "A dynamic web application built using React and Node.js",
      },
      {
        name: "AIAssistant",
        description: "AI-powered chatbot for automated customer service",
      },
    ],
  },
  {
    id: "yash",
    name: "Yash Khilare",
    role: "Backend Developer",
    bio: "Yash specializes in backend development, creating efficient APIs and databases for scalable applications.",
    avatar: "/yash.jpg",
    email: "yashkhilare25@gmail.com",
    skills: ["API Development", "Database Management", "Python", "Docker"],
    projects: [
      {
        name: "APIHub",
        description: "A collection of efficient REST APIs for various services",
      },
      {
        name: "CloudDatabase",
        description:
          "Cloud-based database solution for large-scale applications",
      },
    ],
  },
  {
    id: "parth",
    name: "Parth Lohar",
    role: "UI/UX Designer",
    bio: "Parth ensures that the user experience is intuitive and the design is visually engaging, focusing on seamless user interactions.",
    avatar: "/parth.jpg",
    email: "parthlahor@gmail.com",
    skills: ["UI Design", "UX Research", "Prototyping", "Wireframing"],
    projects: [
      {
        name: "ChatUI Revamp",
        description:
          "Redesigned chat interface improving user satisfaction by 40%",
      },
      {
        name: "AccessibleAI",
        description: "Making AI interfaces more accessible to all users",
      },
    ],
  },
  {
    id: "Yadnesh",
    name: "Yadnesh Ranshevare",
    role: "Full Stack Developer",
    bio: "Yadnesh brings full-stack development expertise, building robust and scalable solutions for modern applications.",
    avatar: "/yadnesh.jpg",
    email: "yranshevare2005@gmail.com",
    skills: ["JavaScript", "React", "Node.js", "Express"],
    projects: [
      {
        name: "ScalableWebApp",
        description: "Developed a scalable web application for high traffic",
      },
      {
        name: "AIIntegration",
        description:
          "Integrated AI models for predictive analytics in a web app",
      },
    ],
  },
];

export default function TeamMemberProfile({
  params,
}: {
  params: { id: string };
}) {
  const member = teamMembers.find((m) => m.id === params.id);

  if (!member) {
    notFound();
  }

  return (
    <>
      <NavBar selected={"about"} />
      <div className="container mx-auto px-4 py-8 cursor-default">
        <Card className="w-full max-w-4xl mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-center gap-6 pb-6">
            <Image
              src={member.avatar}
              alt={member.name}
              width={200}
              height={200}
              className="rounded-full text-center bg-slate-200"
            />
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl font-bold mb-2">
                {member.name}
              </CardTitle>
              <p className="text-xl text-muted-foreground mb-4">
                {member.role}
              </p>
              <Link href="/about">
                <Button variant="outline">Back to Team</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-2">About</h2>
              <p className="text-muted-foreground">{member.bio}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Contact</h2>
              <p className="text-muted-foreground">{member.email}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">Projects</h2>
              <ul className="space-y-4">
                {member.projects.map((project, index) => (
                  <li key={index}>
                    <h3 className="text-lg font-semibold">{project.name}</h3>
                    <p className="text-muted-foreground">
                      {project.description}
                    </p>
                  </li>
                ))} 
              </ul>
            </section>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
