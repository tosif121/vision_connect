'use client';
import DeveloperProfile from './components/DeveloperProfile';
import Hero from './components/Hero';
import ProjectsList from './components/ProjectsList';

export default function Home() {
  const userType = localStorage.getItem('userType');

  return (
    <>
      <Hero />
      {(userType !== 'founder' && <ProjectsList />) || <DeveloperProfile />}
    </>
  );
}
