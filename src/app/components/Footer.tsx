'use client'
import { RedirectToSignIn, useAuth } from '@clerk/nextjs';
import React from 'react';

function Footer() {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <footer className="bg-transparent border-t-[#ddd] dark:border-[#999] text-gray-900 py-4 border-t dark:text-white">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Vision Connect All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
