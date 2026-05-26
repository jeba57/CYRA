import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TipsHero from "../../components/tips/TipsHero";
import TipsPhaseFilter from "../../components/tips/TipsPhaseFilter";
import TipsGrid from "../../components/tips/TipsGrid";

export const metadata = {
  title: "Little Care Tips — CYRA",
};

export default function CareTipsPage() {
  return (
    <>
      <Navbar />
      <main>
        <TipsHero />
        <TipsPhaseFilter />
        <TipsGrid />
      </main>
      
    </>
  );
}
