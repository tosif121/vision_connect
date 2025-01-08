import Hero from './components/Hero';
import Navbar from './components/Nav';
import ProjectsList from './components/ProjectsList';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProjectsList />
    </>
  );
}
