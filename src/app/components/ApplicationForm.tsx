import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ApplicationForm() {
  return (
    <Card className="max-w-2xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Apply as Co-Founder</CardTitle>
        <CardDescription>Share why you'd be a great fit for this project</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium">Your Proposal</label>
            <textarea
              className="w-full p-3 rounded-md border min-h-[200px]"
              placeholder="Describe your interest and how you can contribute..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Requested Equity (%)</label>
              <Input type="number" placeholder="15" />
            </div>
            <div>
              <label className="text-sm font-medium">Time Commitment</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full-time</SelectItem>
                  <SelectItem value="part">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Submit Application</Button>
      </CardFooter>
    </Card>
  );
}
