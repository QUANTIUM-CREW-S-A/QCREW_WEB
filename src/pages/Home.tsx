import { Hero } from "../components/sections/Hero";
import { Partners } from "../components/sections/Partners";
import { Problem } from "../components/sections/Problem";
import { Services } from "../components/sections/Services";
import { TechStack } from "../components/sections/TechStack";
import { WhyUs } from "../components/sections/WhyUs";
import { CTA } from "../components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Partners />
      <Problem />
      <Services />
      <TechStack />
      <WhyUs />
      <CTA />
    </>
  );
}