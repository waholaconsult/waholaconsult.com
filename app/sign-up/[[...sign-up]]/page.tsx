import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', paddingTop: '120px', paddingBottom: '80px', backgroundColor: 'var(--bg-secondary)' }}>
      <SignUp />
    </div>
  );
}
