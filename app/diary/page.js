import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import DiaryHero from "../../components/diary/DiaryHero";
import DiaryUpload from "../../components/diary/DiaryUpload";
import DiaryGrid from "../../components/diary/DiaryGrid";

export const metadata = {
  title: "Health Diary — CYRA",
};

export default function DiaryPage() {
  return (
    <>
      <Navbar />
      <main>
        <DiaryHero />
        <DiaryUpload />
        <DiaryGrid />
      </main>
      
    </>
  );
}
