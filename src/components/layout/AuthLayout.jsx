import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

/** Glass sign-in shell shared by login / activate / forgot-password. */
export default function AuthLayout({ children }) {
  const name = process.env.REACT_APP_NAME || "Admin";
  return (
    <div className="auth-screen auth-split">
      <aside className="auth-aside">
        <Logo size={40} withName />
        <img src="/assets/group-42903.png" alt="" className="auth-art" />
        <p className="auth-aside-text">{name} Admin Console</p>
      </aside>
      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-brand d-lg-none">
            <Logo size={44} />
          </div>
          <Container className="px-0">{children}</Container>
        </div>
      </div>
    </div>
  );
}
