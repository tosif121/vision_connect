import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';

export default function CreateProjectForm() {
  return (
    <Card className="max-w-3xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
        <CardDescription>Share your idea with potential co-founders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Project Title</label>
            <Input placeholder="Enter project title" />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full p-3 rounded-md border min-h-[120px]"
              placeholder="Describe your project idea..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Equity Offer (%)</label>
              <Input type="number" placeholder="20" />
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">Technology</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="health">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Required Skills</label>
            <Input placeholder="e.g. React, Node.js, Python" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Create Project</Button>
      </CardFooter>
    </Card>
  );
}
