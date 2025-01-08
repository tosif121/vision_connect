import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';

type ApplicationFormProps = {
  isFormOpen: boolean;
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ApplicationForm({ isFormOpen, setIsFormOpen }: ApplicationFormProps) {
  const formRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(event.target as Node)) {
      if ((event.target as HTMLElement).classList.contains('backdrop')) {
        setIsFormOpen(false);
      }
    }
  };

  useEffect(() => {
    if (isFormOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFormOpen]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop bg-black/80 backdrop-blur-sm">
      <Card ref={formRef} className="relative w-full max-w-xl mx-4 my-8 shadow-2xl">
        <button
          onClick={() => setIsFormOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close form"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Apply as Co-Founder</CardTitle>
          <CardDescription className="text-base">Share why you'd be a great fit for this project</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-semibold">Your Proposal</Label>
              <textarea
                className="w-full p-4 rounded-lg border min-h-[200px] resize-y focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Tell us about:
• Your relevant experience and skills
• Why you're interested in this project
• How you plan to contribute
• Your vision for the project"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Requested Equity (%)</Label>
                <Input type="number" placeholder="15" className="h-11" min="0" max="100" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Time Commitment</Label>
                <Select>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full-time</SelectItem>
                    <SelectItem value="part">Part-time</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="weekends">Weekends Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Relevant Links</Label>
              <Input placeholder="LinkedIn, Portfolio, GitHub, etc." className="h-11" />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex gap-4">
          <Button className="h-11 text-base font-medium">Submit Application</Button>
          <Button variant="outline" className="h-11 text-base font-medium" onClick={() => setIsFormOpen(false)}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
