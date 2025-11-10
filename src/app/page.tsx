
import CommunityCollage from "@/components/CommunityCollage";
import Footer from "@/components/Footer";
import GenXAISection from "@/components/GenXAISection";
import GenXBlogs from "@/components/GenXBlogs";
import HeroCarousel from "@/components/HeroCarousel";
import LaunchingProtein from "@/components/LaunchingProtein";
import LimitlessSection from "@/components/LimitlessSection";
import BuiltToEndureBanner from "@/components/MovingBanner";
import MovingCommunityStrip from "@/components/MovingCommunityStrip";
import OurPhilosophy from "@/components/OurPhilosophy";
import ProductCardSection from "@/components/ProductCardSection";
import TestimonialsSection from "@/components/TestimonialsSection";


export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <OurPhilosophy/>
      <GenXAISection/>
      <BuiltToEndureBanner/>
      <ProductCardSection/>
      <LimitlessSection/>
      <LaunchingProtein/>
      <TestimonialsSection/>
      <CommunityCollage/> 
      <GenXBlogs/>
      <MovingCommunityStrip/>
      <Footer/>
    </main>
  );
}

