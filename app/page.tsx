import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialLinks from '@/components/SocialLinks';
import Monuments from '@/components/Monuments';
import Food from '@/components/Food';
import Museums from '@/components/Museums';
import FeedbackForm from '@/components/FeedbackForm';
import Loader from '@/components/Loader';

export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />
      <Hero />
      <SocialLinks />
      <Monuments />
      <Food />
      <Museums />
      
      <FeedbackForm />

      {/* Footer */}
      {/* Redesigned Simple Light Golden Cream Footer */}

      <div className='w-full h-[100px]'>

      </div>
  
    </main>
  );
}
