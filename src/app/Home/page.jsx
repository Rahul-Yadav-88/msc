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
      buttonHref="/Projects"
      projects={[
        { location: "Haryana, India", title: "KGP Expressway", image: "/h11.png" },
        { location: "Haryana, India", title: "NH-152D Bharat Mala", image: "/h13.png" },
        { location: "Jhajjar, India", title: "Industrial Warehouse Platform", image: "/h12.png" },
      ]}
      tiltIntensity={16}
      lift={8}
      stagger={120}/>
      <Explor />
      
      <Service/>
       <Expert
      leftImage="/h11.png"
      smallImage="/h4.png"
      title="Precision Execution for Reliable Infrastructure Projects"
      buttonHref="/Contact"
    />
    <Number />

          <TestimonialsSection />
          <ContactSection />

    </>
  )
}
