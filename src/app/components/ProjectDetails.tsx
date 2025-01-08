import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Star, MapPin, Calendar, Users, Briefcase } from 'lucide-react';

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

interface ProjectDetailsModalProps {
  project: Project;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onApply: () => void;
}

export default function ProjectDetailsModal({ project, isOpen, setIsOpen, onApply }: ProjectDetailsModalProps) {
  const skills = project.skills
    .replace(/^"|"$/g, '')
    .split(',')
    .map((skill) => skill.trim());

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
              <DialogDescription className="mt-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="font-medium">{project.equity}% Equity Offered</span>
                <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                  {project.status || 'Status not available'}
                </Badge>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-6 space-y-6">
          {/* Project Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
            <div className="text-gray-600 dark:text-gray-300">{project.description}</div>
          </div>

          {/* Required Skills */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Founder Information */}
          {project.founder && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Founder</h3>
              <div className="bg-secondary/20 rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={project.founder.avatar} alt={project.founder.name} />
                    <AvatarFallback>{project.founder.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-base font-medium">{project.founder.name}</h4>
                    <div className="flex items-center gap-2 text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{project.founder.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Project Timeline</div>
                <div className="font-medium">6-12 months</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Team Size</div>
                <div className="font-medium">2-4 people</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Commitment</div>
                <div className="font-medium">Part-time</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t">
            <Button className="flex-1" onClick={onApply}>
              Apply Now
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
