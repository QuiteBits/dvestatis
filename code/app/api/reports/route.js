import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getReportsCollection } from "@/lib/mongodb";

export async function GET(request) {
  try {
    const session = await getSession();

    if (!session?.login) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const reportsCollection = await getReportsCollection();
    const reports = await reportsCollection
      .find({ login: session.login })
      .sort({ generatedAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, reports });
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();

    if (!session?.login) {
      return NextResponse.json(
        { success: false, error: "Unauthenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { reportData } = body;

    if (!reportData) {
      return NextResponse.json(
        { success: false, error: "Missing report data" },
        { status: 400 }
      );
    }

    const reportsCollection = await getReportsCollection();

    // Check for existing report with same username to avoid duplicates
    const existing = await reportsCollection.findOne({
      login: session.login,
      "profile.username": reportData.profile.username,
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Report already exists for this user." },
        { status: 409 }
      );
    }

    const now = new Date().toISOString();

    await reportsCollection.insertOne({
      login: session.login,
      profile: reportData.profile,
      statistics: reportData.statistics,
      score: reportData.score,
      breakdown: reportData.breakdown,
      scoringMethod: reportData.scoringMethod,
      coverage: reportData.coverage,
      aiAvailable: reportData.aiAvailable,
      insights: reportData.insights,
      repositories: reportData.repositories,
      generatedAt: now,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving report:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save report" },
      { status: 500 }
    );
  }
}