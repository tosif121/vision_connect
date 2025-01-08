import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Github, Twitter, Linkedin, Globe, LucideIcon } from 'lucide-react';

interface Experience {
  title: string;
  period: string;
  description: string;
}

interface Developer {
  name: string;
  role: string;
  avatar: string;
  github: string;
  twitter: string;
  linkedin: string;
  website: string;
  skills: string[];
  experience: Experience;
}

interface SocialLinkProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

const developers: Developer[] = [
  {
    name: "Sarah Chen",
    role: "Full Stack Engineer",
    avatar: "/api/placeholder/150/150",
    github: "sarahchen",
    twitter: "sarahcodes",
    linkedin: "sarahchen",
    website: "sarah.dev",
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    experience: {
      title: "Lead Developer at TechFlow",
      period: "2021 - Present",
      description: "Leading a team of 5 developers, architecting cloud-native applications"
    }
  },
  {
    name: "Marcus Rodriguez",
    role: "Frontend Architect",
    avatar: "/api/placeholder/150/150",
    github: "mrodriguez",
    twitter: "marcusdev",
    linkedin: "marcusrodriguez",
    website: "marcus.tech",
    skills: ["Vue.js", "React", "WebGL", "Three.js", "TailwindCSS"],
    experience: {
      title: "Senior Frontend Dev at PixelPerfect",
      period: "2019 - Present",
      description: "Specializing in 3D web experiences and performant UI systems"
    }
  },
  {
    name: "Aisha Patel",
    role: "Backend Engineer",
    avatar: "/api/placeholder/150/150",
    github: "aishap",
    twitter: "aishadev",
    linkedin: "aishapatel",
    website: "aisha.io",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Docker"],
    experience: {
      title: "System Architect at DataFlow",
      period: "2020 - Present",
      description: "Building scalable backend systems processing millions of requests"
    }
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    avatar: "/api/placeholder/150/150",
    github: "davidk",
    twitter: "davidops",
    linkedin: "davidkim",
    website: "davidkim.dev",
    skills: ["Kubernetes", "Terraform", "AWS", "CI/CD", "Go"],
    experience: {
      title: "DevOps Lead at CloudScale",
      period: "2022 - Present",
      description: "Implementing infrastructure as code and automating deployment pipelines"
    }
  },
  {
    name: "Emma Wilson",
    role: "Mobile Developer",
    avatar: "/api/placeholder/150/150",
    github: "emmaw",
    twitter: "emmabuilds",
    linkedin: "emmawilson",
    website: "emma.app",
    skills: ["React Native", "Swift", "Kotlin", "Firebase", "Redux"],
    experience: {
      title: "Mobile Lead at AppWorks",
      period: "2021 - Present",
      description: "Developing cross-platform mobile applications with React Native"
    }
  }
];

const SocialLink: React.FC<SocialLinkProps> = ({ icon: Icon, href, label }) => (
  <a 
    href={href}
    className="text-gray-600 hover:text-primary transition-colors duration-200"
    aria-label={label}
  >
    <Icon className="w-4 h-4" />
  </a>
);

const DeveloperProfiles: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-12">Our Development Team</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {developers.map((dev) => (
          <Card key={dev.name} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary">
                  <AvatarImage src={dev.avatar} alt={`${dev.name}'s profile`} />
                  <AvatarFallback>{dev.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-xl">{dev.name}</CardTitle>
                  <CardDescription className="text-sm">{dev.role}</CardDescription>
                  <div className="flex items-center gap-3 mt-2">
                    <SocialLink icon={Github} href={`https://github.com/${dev.github}`} label="GitHub Profile" />
                    <SocialLink icon={Twitter} href={`https://twitter.com/${dev.twitter}`} label="Twitter Profile" />
                    <SocialLink icon={Linkedin} href={`https://linkedin.com/in/${dev.linkedin}`} label="LinkedIn Profile" />
                    <SocialLink icon={Globe} href={`https://${dev.website}`} label="Personal Website" />
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {dev.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="hover:bg-primary hover:text-white transition-colors duration-200">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Current Role</h3>
                  <div className="bg-secondary/20 rounded-lg p-3">
                    <p className="font-medium text-sm">{dev.experience.title}</p>
                    <p className="text-sm text-gray-500">{dev.experience.period}</p>
                    <p className="text-sm mt-2">{dev.experience.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeveloperProfiles;