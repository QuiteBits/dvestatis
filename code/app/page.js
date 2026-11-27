import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FinalCTA from "./components/FinalCTA";
import Disclaimer from "./components/Disclaimer";
import Footer from "./components/Footer";
import ScoreExplanation from "./components/ScoreExplanation";
import { getSession } from "@/lib/session";

export default async function Home() {
  const user = await getSession();

  return (
    <>
      <Navbar user={user} />
      <main id="top" className="min-h-screen bg-background text-foreground">
        <Hero />
        <Features />
        <HowItWorks />
        <ScoreExplanation score={null} />
        <div className="mt-12">
          <h2 className="text-2xl font-bold tracking-[-0.01em] text-foreground mb-6">
            Why DEVSTATIs?
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-card/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-6 w-6 rounded bg-primary/15 text-primary">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.89-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 2.5-.34c.85 0 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
                  </svg>
                </span>
                <strong className="text-foreground">Evidence-based scoring</strong>
              </div>
              <p className="text-muted text-[11px] leading-relaxed">
                Scores blend objective GitHub signals with qualitative AI review, providing
                a transparent assessment of public profile evidence.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-card/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-6 w-6 rounded bg-primary/15 text-primary">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17 2H15.5l-3.3 7.5H7l3.3 7.5H5v2h14v-2h-3.5l3.3-7.5h1.7l-3.3-7.5Z" />
                  </svg>
                </span>
                <strong className="text-foreground">Persistent history</strong>
              </div>
              <p className="text-muted text-[11px] leading-relaxed">
                Save reports to MongoDB and revisit your analytics anytime. All reports
                are associated with your authenticated GitHub account.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-card/50 p-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-6 w-6 rounded bg-primary/15 text-primary">
                  <svg
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17 2H15.5l-3.3 7.5H7l3.3 7.5H5v2h14v-2h-3.5l3.3-7.5h1.7l-3.3-7.5Z" />
                  </svg>
                </span>
                <strong className="text-foreground">Transparent limitations</strong>
              </div>
              <p className="text-muted text-[11px] leading-relaxed">
                GitHub activity is a visibility metric, not a measure of programming skill.
                Scores are analytical estimates and should not be used as the sole assessment
                of technical ability or professional competence.
              </p>
            </div>
          </div>
        </div>
        <FinalCTA />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}