import { analyzeGitHubProfile } from "@/lib/analyze";

export const maxDuration = 120;

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const data = await analyzeGitHubProfile(username);

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("DEVSTATIS analysis error:", error);

    const message = error.message || "Failed to analyze GitHub profile.";
    const status = message.includes("not found")
      ? 404
      : message.includes("Invalid GitHub username")
        ? 400
        : 500;

    return Response.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}
