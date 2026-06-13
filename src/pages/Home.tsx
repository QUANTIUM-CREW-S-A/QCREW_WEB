import { Hero } from "../components/sections/Hero";
import { Partners } from "../components/sections/Partners";
import { Stats } from "../components/sections/Stats";
import { Services } from "../components/sections/Services";
import { Process } from "../components/sections/Process";
import { WhyUs } from "../components/sections/WhyUs";
import { FeaturedTestimonials } from "../components/sections/FeaturedTestimonials";
import { CTA } from "../components/sections/CTA";
import { ClientChat } from "../components/ui/ClientChat";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Stats />
      <Services />
      <Process />
      <WhyUs />
      <FeaturedTestimonials />
      <CTA />
      <ClientChat />
    </>
  );
}
