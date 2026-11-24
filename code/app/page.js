import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import FinalCTA from "./components/FinalCTA";
import Disclaimer from "./components/Disclaimer";
import Footer from "./components/Footer";
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
        <FinalCTA />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
