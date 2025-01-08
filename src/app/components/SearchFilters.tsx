import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select';
import { Search } from 'lucide-react';

export default function SearchFilters() {
  return (
    <div className="border-b">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Search className="w-4 h-4" />
          <Input placeholder="Search projects..." className="md:w-96" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tech">Technology</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="health">Healthcare</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Equity Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-10">0-10%</SelectItem>
              <SelectItem value="10-20">10-20%</SelectItem>
              <SelectItem value="20+">20%+</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">More Filters</Button>
        </div>
      </div>
    </div>
  );
}
