import Banner from "@/features/pages/main/component/banner";
import Discover from "@/features/pages/main/component/discover";
import Hero from "@/features/pages/main/component/hero";
import hero from "@/assets/images/hero.jpg";
import innovation from "@/assets/images/innovation.jpg";
import Founder from "@/features/pages/main/component/founder";

export default function Home() {
  return (
    <>
      <Hero
        image={hero}
        title="THE FUTURE OF WELLNESS."
        description="The perfect balance of science, nature and technology. Prepare to look and feel your absolute best."
      />
      <Discover />
      <Banner />
      <Hero
        image={innovation}
        title="Wellness innovation at its scientific best."
      />
      <Founder />
    </>
  );
}
