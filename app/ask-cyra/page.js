import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import AskHero from "../../components/ai/AskHero";
import ChatInterface from "../../components/ai/ChatInterface";
import AskFeatures from "../../components/ai/AskFeatures";

export const metadata = {
  title: "Ask CYRA AI — CYRA",
};

export default function AskCyraPage() {
  return (
    <>
      <Navbar />
      <main>
        <AskHero />
        <ChatInterface />
        <AskFeatures />
      </main>
      <Footer />
    </>
  );
}
