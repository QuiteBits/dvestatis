import Report from "@/app/components/results/Report";
import ResultsError from "@/app/components/results/ResultsError";
import { analyzeGitHubProfile } from "@/lib/analyze";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function generateMetadata({ params }) {
  const { username } = await params;

  return {
    title: `${username} · GitHub report`,
    description: `Evidence-based DEVSTATIS report for the public GitHub profile @${username}.`,
  };
}

export default async function ResultsPage({ params }) {
  const { username } = await params;

  let data = null;
  let failure = null;

  try {
    data = await analyzeGitHubProfile(username);
  } catch (error) {
    console.error("[DEVSTATIS] Results analysis error:", error);
    failure = error?.message || "Failed to analyze GitHub profile.";
  }

  if (!data) {
    const reason = failure || "Failed to analyze GitHub profile.";
    const notFound = reason.includes("not found");
    const invalid = reason.includes("Invalid GitHub username");

    return (
      <ResultsError
        username={username}
        title={
          notFound
            ? "Profile not found"
            : invalid
              ? "Invalid username"
              : "Couldn't generate this report"
        }
        message={
          notFound
            ? `We couldn't find a public GitHub profile for @${username}. Check the spelling and try again.`
            : invalid
              ? "GitHub usernames can only contain letters, numbers, and hyphens."
              : "The analysis service hit an error while building this report. This is usually temporary."
        }
        detail={
          notFound || invalid
            ? null
            : "Try again in a moment. If the problem continues, the AI or GitHub service may be rate limited."
        }
      />
    );
  }

  return <Report data={data} />;
}
