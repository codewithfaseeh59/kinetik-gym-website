import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { forms, getForm } from "@/data/forms";
import FormView from "@/sections/FormView";

export const dynamicParams = false;

export function generateStaticParams() {
  return forms.map((f) => ({ type: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params;
  const form = getForm(type);
  return form ? { title: `${form.title} — KINETIK`, description: form.blurb } : {};
}

export default async function FormPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params;
  const form = getForm(type);
  if (!form) notFound();
  return <FormView config={form} />;
}
