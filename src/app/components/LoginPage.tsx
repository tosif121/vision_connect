'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Github, Loader } from 'lucide-react';
import { useAuth, useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useSignIn();
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push('/');
    }
  }, [userId, router]);

  const handleSocialLogin = async (provider: 'oauth_github' | 'oauth_google') => {
    setIsLoading(true);

    if (!signIn) {
      console.error('signIn object is not available.');
      setIsLoading(false);
      return;
    }

    if (!role) {
      alert('Please select a role before signing in.');
      setIsLoading(false);
      return;
    }

    try {
      localStorage.setItem('userType', role);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      });
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error?.long_message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <Image width={32} height={32} src="/images/logo.png" alt="Logo" className="dark:invert" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
          <CardDescription className="text-center">Choose your role to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Role Selection Cards */}
            <div className="grid grid-cols-2 gap-4">
              <label className="cursor-pointer">
                <div
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 
                    ${role === 'developer' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="developer"
                    checked={role === 'developer'}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-2">
                      <Github className="w-6 h-6" />
                    </div>
                    <div className="font-medium">Developer</div>
                  </div>
                </div>
              </label>

              <label className="cursor-pointer">
                <div
                  className={`p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50
                    ${role === 'founder' ? 'border-primary bg-primary/5' : 'border-gray-200 dark:border-gray-700'}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="founder"
                    checked={role === 'founder'}
                    onChange={(e) => setRole(e.target.value)}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-2">
                      <Image width={24} height={24} src="/images/google.svg" alt="google" />
                    </div>
                    <div className="font-medium">Founder</div>
                  </div>
                </div>
              </label>
            </div>

            {/* Login Buttons */}
            <div className="space-y-4">
              {role && (
                <div className="animate-fadeIn">
                  {role === 'developer' ? (
                    <Button
                      variant="default"
                      className="w-full flex items-center justify-center gap-2 h-11"
                      onClick={() => handleSocialLogin('oauth_github')}
                      disabled={isLoading}
                    >
                      {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Github className="w-5 h-5" />}
                      {isLoading ? 'Processing...' : 'Continue with GitHub'}
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full flex items-center justify-center gap-2 h-11"
                      onClick={() => handleSocialLogin('oauth_google')}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader className="w-5 h-5 animate-spin" />
                      ) : (
                        <Image width={20} height={20} src="/images/google.svg" alt="google" />
                      )}
                      {isLoading ? 'Processing...' : 'Continue with Google'}
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Terms of Service */}
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
