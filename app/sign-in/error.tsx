"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Sign-in Page Error:", error);
  }, [error]);

  return (
    <div style={{ padding: "140px 20px", textAlign: "center", minHeight: "100vh" }}>
      <h2>Something went wrong loading the login page!</h2>
      <p style={{ color: "red", margin: "20px 0" }}>{error.message}</p>
      <button
        className="btn-primary"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
