import SignupForm from "../../../components/auth/SignupForm";

export const metadata = { title: "Sign Up — CYRA" };

export default function SignupPage() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#3D2840,#6B3A7A,#9B7BB8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <SignupForm />
    </main>
  );
}
