'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { RedirectToSignIn, useAuth, useClerk, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import CreateProjectForm from './CreateProjectForm';

export default function Navbar() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only after component mounts
    const storedUserType = localStorage.getItem('userType');
    setUserType(storedUserType);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <>
      {isFormOpen && <CreateProjectForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}
      <nav className="border-b sticky top-0 bg-white dark:bg-gray-900 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <span
                onClick={() => handleNavigate('/')}
                className="text-2xl font-bold cursor-pointer hover:opacity-80 transition-opacity"
              >
                Vision Connect
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" onClick={() => handleNavigate('/browse')}>
                Browse
              </Button>
              <Button variant="ghost" onClick={() => handleNavigate('/projects')}>
                My Projects
              </Button>
              {userType === 'founder' && (
                <Button onClick={() => setIsFormOpen(true)}>Post Idea</Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity">
                    <AvatarImage src={user?.imageUrl} alt={user?.firstName || 'User'} />
                    <AvatarFallback>
                      {user?.firstName?.charAt(0)}
                      {user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user?.fullName}</div>
                    <div className="text-muted-foreground">{user?.emailAddresses[0].emailAddress}</div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                  >
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}