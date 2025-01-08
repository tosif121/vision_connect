import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function ProjectsList() {
  const projects = [
    {
      title: 'GreenTech Innovations',
      equity: 15,
      status: 'Active',
      description:
        'A startup focused on sustainable energy solutions, including solar panel innovations and renewable energy storage.',
      skills: ['Renewable Energy', 'Engineering', 'Product Design'],
      founder: {
        name: 'Alice Johnson',
        location: 'San Francisco, CA',
        avatar: 'https://via.placeholder.com/150',
        initials: 'AJ',
      },
    },
    {
      title: 'AI Health Solutions',
      equity: 20,
      status: 'Closed',
      description: 'Using artificial intelligence to improve patient diagnostics and healthcare delivery systems.',
      skills: ['Artificial Intelligence', 'Healthcare', 'Machine Learning'],
      founder: {
        name: 'Dr. Michael Lee',
        location: 'Boston, MA',
        avatar: 'https://via.placeholder.com/150',
        initials: 'ML',
      },
    },
    {
      title: 'EduVerse Online',
      equity: 10,
      status: 'Active',
      description:
        'An online education platform aimed at providing accessible learning resources to underserved communities.',
      skills: ['EdTech', 'Web Development', 'Content Creation'],
      founder: {
        name: 'Sarah Patel',
        location: 'Austin, TX',
        avatar: 'https://via.placeholder.com/150',
        initials: 'SP',
      },
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="flex gap-4">
          <Input placeholder="Search projects..." className="w-64" icon={<Search className="w-4 h-4" />} />
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}
