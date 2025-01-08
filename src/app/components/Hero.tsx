'use client';
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { useState } from 'react';
import CreateProjectForm from './CreateProjectForm';

export default function Hero() {
  const userType = localStorage.getItem('userType');
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      {isFormOpen && <CreateProjectForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}

      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Co-Founder</h1>
            <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
              Connect with tech enthusiasts and bring your ideas to life
            </p>
            {(userType == 'founder' && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => setIsFormOpen(true)}
                >
                  <Briefcase className="w-5 h-5" />
                  Post Your Idea
                </Button>
              </div>
            )) ||
              ''}
          </div>
        </div>
      </div>
      
    </>
  );
}
