import Navbar from "@/app/components/Navbar";
import AnalyzeClient from "@/app/components/AnalyzeClient";
import { getSession } from "@/lib/session";

export const metadata = {
  title: "Analyze a GitHub profile",
  description:
    "Generate an evidence-based DEVSTATIS report for any public GitHub profile.",
};

export default async function AnalyzePage() {
  const user = await getSession();

  return (
    <>
      <Navbar user={user} />
      <main className="relative overflow-hidden pb-20 pt-32 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        />
        <AnalyzeClient user={user} />
      </main>
    </>
  );
}
