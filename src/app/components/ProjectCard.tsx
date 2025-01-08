import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {  Star } from 'lucide-react';

export default function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Star className="w-4 h-4" />
              <span>{project.equity}% Equity Offered</span>
            </div>
          </div>
          <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>{project.status}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, index) => (
            <Badge key={index} variant="outline">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={project.founder.avatar} />
            <AvatarFallback>{project.founder.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{project.founder.name}</p>
            <p className="text-xs text-gray-500">{project.founder.location}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View Details</Button>
      </CardFooter>
    </Card>
  );
}
