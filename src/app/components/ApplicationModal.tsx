import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function ApplicationModal() {
  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <CardTitle>Apply as Co-Founder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Your Proposal</label>
            <textarea
              className="w-full p-2 border rounded-md"
              rows={4}
              placeholder="Describe why you'd be a great co-founder..."
            />
          </div>
          <div>
            <label className="text-sm font-medium">Requested Equity (%)</label>
            <Input type="number" placeholder="15" />
          </div>
          <Button className="w-full flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Submit Application
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
