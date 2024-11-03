import { Header } from "@/sections/Header";
import { Hero } from "@/sections/Hero";
import { Footer } from "@/sections/Footer";
import {Testimonial} from "../sections/Testimonials";
import {ExploreGem} from "../sections/ExploreGem";
import { ProductShowcase } from "@/sections/ProductShowcase";



export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ProductShowcase/>
      <ExploreGem/>
      <Testimonial/>
      
      <Footer/>
      
    </>
  );
}