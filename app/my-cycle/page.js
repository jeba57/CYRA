import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import CycleHero from "../../components/cycle/CycleHero";
import CycleCalendar from "../../components/cycle/CycleCalendar";
import CyclePhaseGuide from "../../components/cycle/CyclePhaseGuide";

export const metadata = {
  title: "My Cycle — CYRA",
};

export default function MyCyclePage() {
  return (
    <>
      <Navbar />
      <main>
      
        <CycleCalendar />
        
    
      </main>
      
    </>
  );
}
