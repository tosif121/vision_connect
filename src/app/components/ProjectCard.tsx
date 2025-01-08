import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@clerk/nextjs';
import { Mail, Star } from 'lucide-react';
import ApplicationForm from './ApplicationForm';
import { useState } from 'react';
import ProjectDetailsModal from './ProjectDetails';

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
  founder?: Founder;
}

export default function ProjectCard({ project }: { project: Project }) {
  const { user, isLoaded } = useUser();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const skills = project.skills
    .replace(/^"|"$/g, '')
    .split(',')
    .map((skill) => skill.trim());

  return (
    <>
      {isFormOpen && <ApplicationForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}
      <ProjectDetailsModal
        project={project}
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        onApply={() => {
          setIsDetailsOpen(false);
          setIsFormOpen(true);
        }}
      />
      <Card className="flex flex-col h-full rounded-lg shadow-md border dark:border-gray-700">
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200">{project.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{project.equity}% Equity Offered</span>
              </div>
            </div>
            <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
              {project.status || 'Status not available'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 flex-1">
          <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardContent className="p-4 border-t dark:border-gray-700">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User Avatar'} />
              <AvatarFallback>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h2 className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize truncate">
                {user?.fullName || 'Unknown User'}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mt-1">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{user?.primaryEmailAddress?.emailAddress || 'No email available'}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 gap-4">
          <Button className="w-full" onClick={() => setIsDetailsOpen(true)}>View Details</Button>
          <Button className="w-full" variant={'outline'} onClick={() => setIsFormOpen(true)}>
            Apply
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
