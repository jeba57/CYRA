import Navbar from "../../components/layout/Navbar";
import AdminDashboard from "../../components/admin/AdminDashboard";

export const metadata = {
  title: "Admin — CYRA",
};

export default function AdminPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", background: "#F5EDE6", paddingTop: "64px" }}>
        <AdminDashboard />
      </main>
    </>
  );
}
