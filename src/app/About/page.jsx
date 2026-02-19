import OurStorySection from "../../components/About/Hero"
import BuildingVision from "../../components/About/Vision"
import Number from "../../components/Home/Number"
// import Team from "../../components/About/Team"
import Service from "../../components/About/Service"
import Faq from "../../components/About/Faq"
export default function Page() {
  return (
    <main>
      <OurStorySection />
          <Number />

            <BuildingVision />
            {/* <Team /> */}
            <Service />
            <Faq />
    </main>
  )
}
