import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import { getAllRoutes, getRouteBySlug } from "@/lib/nav";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllRoutes().map((route) => ({ slug: route.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) {
    return { title: "Page not found | Ambition Holiday" };
  }

  return {
    title: `${route.title} | Ambition Holiday`,
    description: route.description,
    alternates: {
      canonical: `/${route.slug}`,
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const route = getRouteBySlug(slug);
  if (!route) notFound();

  return <PageShell title={route.title} description={route.description} />;
}
