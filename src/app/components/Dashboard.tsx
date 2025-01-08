import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{/* Project cards would go here */}</div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="space-y-4">{/* Application list would go here */}</div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="space-y-4">{/* Messages would go here */}</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
