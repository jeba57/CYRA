import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import InsightsHero from "../../components/insights/InsightsHero";
import InsightsDashboard from "../../components/insights/InsightsDashboard";
import MoodTrends from "../../components/insights/MoodTrends";
import MonthlySummary from "../../components/insights/MonthlySummary";

export const metadata = {
  title: "For You & Your Body — CYRA",
};

export default function ForYouPage() {
  return (
    <>
      <Navbar />
      <main>
        <InsightsHero />
        <InsightsDashboard />
        <MoodTrends />
        <MonthlySummary />
      </main>
      
    </>
  );
}
