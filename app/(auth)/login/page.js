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
    }}>
      <LoginForm />
    </main>
  );
}
