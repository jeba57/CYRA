import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import FeelingsHero from "../../components/feelings/FeelingsHero";
import MoodTracker from "../../components/feelings/MoodTracker";
import BloomTracker from "../../components/feelings/BloomTracker";
import FeelingsHistory from "../../components/feelings/FeelingsHistory";

export const metadata = {
  title: "Today's Feelings — CYRA",
};

export default function FeelingsPage() {
  return (
    <>
      <Navbar />
      <main>
        <FeelingsHero />
        <MoodTracker />
        <BloomTracker />
        <FeelingsHistory />
      </main>
      
    </>
  );
}
