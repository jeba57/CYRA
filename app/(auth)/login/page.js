// app/(auth)/login/page.js
import LoginForm from "../../../components/auth/LoginForm";

export const metadata = { title: "Login — CYRA" };

export default function LoginPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#3D2840,#6B3A7A,#9B7BB8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient orbs */}
      <div style={{ position:"absolute", top:"-150px", right:"-150px", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle,rgba(252,222,192,0.1),transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"-100px", left:"-100px", width:"350px", height:"350px", borderRadius:"50%", background:"radial-gradient(circle,rgba(232,224,245,0.1),transparent 70%)", pointerEvents:"none" }} />
      <LoginForm />
    </main>
  );
}