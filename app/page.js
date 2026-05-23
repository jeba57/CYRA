import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import HomeHero from "../components/home/HomeHero";
import HomeMission from "../components/home/HomeMission";
import HomeEducation from "../components/home/HomeEducation";
import HomePhases from "../components/home/HomePhases";
import HomeWellness from "../components/home/HomeWellness";
import HomeCTA from "../components/home/HomeCTA";

export const metadata = {
  title: "CYRA — Your Hormonal Wellness Companion",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HomeHero />
        <HomeMission />
        <HomeEducation />
        <HomePhases />
        <HomeWellness />
        <HomeCTA />
      </main>
      <Footer />
    </>
  );
}
