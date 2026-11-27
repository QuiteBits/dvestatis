import { analyzeGitHubProfile } from "@/lib/analyze";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { saveReportToDatabase } from "@/lib/mongodb";

export const maxDuration = 120;

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    const data = await analyzeGitHubProfile(username);

    return NextResponse.json({
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

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { username } = await params;
    const session = await getSession();

    if (!session?.login) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const data = await analyzeGitHubProfile(username);

    // Save report to database
    await saveReportToDatabase({
      login: session.login,
      data,
      username,
    });

    return NextResponse.json({
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

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status }
    );
  }
}