import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialLinks from '@/components/SocialLinks';
import Monuments from '@/components/Monuments';
import Museums from '@/components/Museums';
import FoodPlaces from '@/components/FoodPlaces';
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
      <Museums />
      <FoodPlaces />
      <FeedbackForm />

      {/* Footer */}
      {/* Redesigned Simple Light Golden Cream Footer */}
      <div className='w-full h-[100px]'>

      </div>
  
    </main>
  );
}
