
import {
  getGitHubProfile,
  getGitHubRepositories,
  getRepositoryReadme,
  getRepositoryLanguages,
} from "@/lib/github";

import { getRecentRepositoryActivity } from "@/lib/activity";
import { generateDeveloperInsights } from "@/lib/gemini";

export async function GET(request, { params }) {
  try {
    const { username } = await params;

    const [profile, repositories] = await Promise.all([
      getGitHubProfile(username),
      getGitHubRepositories(username),
    ]);

    // Collect recent development activity.
    const activity = await getRecentRepositoryActivity(repositories);

    // Fetch README files from up to 10 original repositories.
    const selectedRepos = repositories
      .filter((repo) => !repo.fork)
      .slice(0, 10);

    const readmeResults = await Promise.all(
      selectedRepos.map(async (repo) => ({
        fullName: repo.full_name,
        readme: await getRepositoryReadme(
          repo.owner.login,
          repo.name
        ),
      }))
    );

    const readmes = Object.fromEntries(
      readmeResults.map(({ fullName, readme }) => [
        fullName,
        readme,
      ])
    );

    const totalStars = repositories.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );

    const totalForks = repositories.reduce(
      (total, repo) => total + repo.forks_count,
      0
    );

    // Fetch actual language statistics for every original repository.
    const originalRepositories = repositories.filter(
      (repo) => !repo.fork
    );

    const languageResults = await Promise.all(
      originalRepositories.map(async (repo) => ({
        name: repo.full_name,
        languages: await getRepositoryLanguages(
          repo.owner.login,
          repo.name
        ),
      }))
    );

    // Language breakdown for individual repositories.
    const repositoryLanguages = Object.fromEntries(
      languageResults.map(({ name, languages }) => [
        name,
        languages || {},
      ])
    );

    // Aggregate language usage across all original repositories.
    const languageTotals = {};

    for (const result of languageResults) {
      for (const [language, bytes] of Object.entries(
        result.languages || {}
      )) {
        languageTotals[language] =
          (languageTotals[language] || 0) + bytes;
      }
    }

    const totalLanguageBytes = Object.values(
      languageTotals
    ).reduce((total, bytes) => total + bytes, 0);

    const languages = Object.entries(languageTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage:
          totalLanguageBytes > 0
            ? Number(
                ((bytes / totalLanguageBytes) * 100).toFixed(2)
              )
            : 0,
      }));

    // Raw GitHub data sent to the AI evaluator.
    const analysisPayload = {
      profile: {
        username: profile.login,
        name: profile.name,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
        publicRepos: profile.public_repos,
        company: profile.company,
        location: profile.location,
        blog: profile.blog,
        createdAt: profile.created_at,
      },

      statistics: {
        totalRepositories: repositories.length,
        originalRepositories: originalRepositories.length,
        forkedRepositories: repositories.filter(
          (repo) => repo.fork
        ).length,
        totalStars,
        totalForks,
        languages,
      },

      activity: {
        sampledRepositories: activity.sampledRepositories,
        analyzedRepositories: activity.analyzedRepositories,
        activeWithin90Days: activity.activeWithin90Days,
        activeWithin365Days: activity.activeWithin365Days,
        latestCommits: activity.latestCommits,
      },

      repositories: repositories.map((repo) => ({
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        url: repo.html_url,
        primaryLanguage: repo.language,

        // Actual language usage measured in bytes.
        languageBreakdown:
          repositoryLanguages[repo.full_name] || {},

        stars: repo.stargazers_count,
        forks: repo.forks_count,
        isFork: repo.fork,
        size: repo.size,
        topics: repo.topics,
        createdAt: repo.created_at,
        updatedAt: repo.updated_at,
        pushedAt: repo.pushed_at,
        defaultBranch: repo.default_branch,
        archived: repo.archived,
        openIssues: repo.open_issues_count,
        license: repo.license?.spdx_id || null,

        hasReadme: Boolean(readmes[repo.full_name]),
        readme: readmes[repo.full_name]?.slice(0, 4000) || null,

        readmeInspected: Object.prototype.hasOwnProperty.call(
          readmes,
          repo.full_name
        ),
      })),
    };

    // AI independently evaluates all six categories and calculates the score.
    const aiEvaluation = await generateDeveloperInsights(
      analysisPayload
    );

    return Response.json({
      success: true,

      data: {
        profile: {
          username: profile.login,
          name: profile.name,
          bio: profile.bio,
          avatar: profile.avatar_url,
          profileUrl: profile.html_url,
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.public_repos,
          company: profile.company,
          location: profile.location,
          blog: profile.blog,
          createdAt: profile.created_at,
        },

        statistics: {
          totalRepositories: repositories.length,
          totalStars,
          totalForks,
          languages,
        },

        score: aiEvaluation.overallScore,
        breakdown: aiEvaluation.breakdown,

        insights: {
          summary: aiEvaluation.summary,
          strengths: aiEvaluation.strengths,
          improvements: aiEvaluation.improvements,
          recommendations: aiEvaluation.recommendations,
        },

        coverage: aiEvaluation.coverage,

        repositories: repositories.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          languageBreakdown:
            repositoryLanguages[repo.full_name] || {},
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          updatedAt: repo.updated_at,
          isFork: repo.fork,
          size: repo.size,
          topics: repo.topics,
          hasReadme: Boolean(readmes[repo.full_name]),
        })),
      },
    });
  } catch (error) {
    console.error("DEVSTATIS analysis error:", error);

    return Response.json(
      {
        success: false,
        error: error.message || "Failed to analyze GitHub profile.",
      },
      {
        status: error.message?.includes("not found") ? 404 : 500,
      }
    );
  }
}
