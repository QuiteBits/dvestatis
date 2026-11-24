import Navbar from "@/app/components/Navbar";
import { getSession } from "@/lib/session";

export default async function ResultsLayout({ children }) {
  const user = await getSession();

  return (
    <>
      <Navbar user={user} />
      <main className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
        />
        {children}
      </main>
    </>
  );
}
