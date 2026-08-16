import OrbitDashboard from "@/components/OrbitDashboard";
import { readContent } from "@/lib/content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrbitPage() {
  const content = await readContent();
  return <OrbitDashboard initial={content} />;
}
