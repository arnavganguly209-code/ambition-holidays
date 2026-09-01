import OrbitLoginClient from "@/app/orbit-login/OrbitLoginClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function OrbitLoginPage() {
  return <OrbitLoginClient />;
}
