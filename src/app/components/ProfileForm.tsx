import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ProfileForm() {
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Create Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <Input placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm font-medium">Project Title</label>
            <Input placeholder="Enter your project title" />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea className="w-full p-2 border rounded-md" rows={4} placeholder="Describe your project idea..." />
          </div>
          <div>
            <label className="text-sm font-medium">Equity Offer (%)</label>
            <Input type="number" placeholder="20" />
          </div>
          <Button className="w-full">Create Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
