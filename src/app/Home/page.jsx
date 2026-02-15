import HeroSection from "../../components/Home/Hero"
import Project from "../../components/Home/Project"
import Explor from "../../components/Home/Explor"
import Expert from "../../components/Home/Expert"
import Number from "../../components/Home/Number"
import TestimonialsSection from "../../components/Home/Test"
import ContactSection from "../../components/Home/Contact"
import Service from "../../components/About/Service"
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Project 
       eyebrow="Explore"
      heading="OUR PROJECTS"
      buttonText="View All Projects"
      buttonHref="/projects"
      projects={[
        { location: "Chandigarh, India", title: "Tech Park", image: "/hero.webp" },
        { location: "Delhi, India", title: "Commercial Tower", image: "/hero.webp" },
        { location: "Mumbai, India", title: "Luxury Villa", image: "/hero.webp" },
      ]}
      tiltIntensity={16}
      lift={8}
      stagger={120}/>
      <Explor />
      
      <Service/>
       <Expert
      leftImage="/hero.webp"
      smallImage="/hero.webp"
      title="Expert Craftsmanship for Unmatched Construction Projects"
      buttonHref="/contact"
    />
    <Number />

          <TestimonialsSection />
          <ContactSection />

    </>
  )
}
