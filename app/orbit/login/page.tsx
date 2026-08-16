import { Suspense } from "react";
import OrbitLoginPage from "./OrbitLoginClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070a10]" />}>
      <OrbitLoginPage />
    </Suspense>
  );
}
