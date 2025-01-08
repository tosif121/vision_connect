'use client';
import { Button } from '@/components/ui/button';
import ProjectCard from './ProjectCard';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getProjects } from '@/lib/apiUtils';

interface Founder {
  avatar: string;
  initials: string;
  name: string;
  location: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  equity: number;
  skills: string;
  status?: string;
  founder: Founder;
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects();
        setProjects(response.projects);
      } catch (error) {
        toast.error('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="flex gap-4">
          <div className="flex items-center border rounded px-2 py-1 w-64">
            <Search className="w-5 h-5 mr-2" />
            <Input placeholder="Search projects..." className="w-full border-none focus:outline-none" />
          </div>
          <Button variant="outline">Filter</Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 && projects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </div>
  );
}
