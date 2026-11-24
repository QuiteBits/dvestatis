import {
  getGitHubProfile,
  getGitHubRepositories,
  getRepositoryReadme,
  getRepositoryLanguages,
} from "@/lib/github";
import { calculateDeveloperScore } from "@/lib/scoring";
import { getRecentRepositoryActivity } from "@/lib/activity";
import { generateDeveloperInsights } from "@/lib/gemini";

export async function analyzeGitHubProfile(username) {
  const cleanUsername = String(username || "")
    .trim()
    .replace(/^@/, "");

  if (!/^[a-zA-Z0-9-]{1,39}$/.test(cleanUsername)) {
    throw new Error("Invalid GitHub username.");
  }

  const [profile, repositories] = await Promise.all([
    getGitHubProfile(cleanUsername),
    getGitHubRepositories(cleanUsername),
  ]);

  const activity = await getRecentRepositoryActivity(repositories);

  const selectedRepos = repositories
    .filter((repo) => !repo.fork)
    .slice(0, 10);

  const readmeResults = await Promise.all(
    selectedRepos.map(async (repo) => ({
      fullName: repo.full_name,
      readme: await getRepositoryReadme(repo.owner.login, repo.name),
    }))
  );

  const readmes = Object.fromEntries(
    readmeResults.map(({ fullName, readme }) => [fullName, readme])
  );

  const totalStars = repositories.reduce(
    (total, repo) => total + repo.stargazers_count,
    0
  );

  const totalForks = repositories.reduce(
    (total, repo) => total + repo.forks_count,
    0
  );

  const originalRepositories = repositories.filter((repo) => !repo.fork);

  const languageResults = await Promise.all(
    originalRepositories.map(async (repo) => ({
      name: repo.full_name,
      languages: await getRepositoryLanguages(repo.owner.login, repo.name),
    }))
  );

  const repositoryLanguages = Object.fromEntries(
    languageResults.map(({ name, languages }) => [
      name,
      languages || {},
    ])
  );

  const languageTotals = {};

  for (const result of languageResults) {
    for (const [language, bytes] of Object.entries(
      result.languages || {}
    )) {
      languageTotals[language] =
        (languageTotals[language] || 0) + bytes;
    }
  }

  const totalLanguageBytes = Object.values(languageTotals).reduce(
    (total, bytes) => total + bytes,
    0
  );

  const languages = Object.entries(languageTotals)
    .sort((a, b) => b[1] - a[1])
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage:
        totalLanguageBytes > 0
          ? Number(((bytes / totalLanguageBytes) * 100).toFixed(2))
          : 0,
    }));

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
      forkedRepositories: repositories.filter((repo) => repo.fork).length,
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

      languageBreakdown: repositoryLanguages[repo.full_name] || {},

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

  let aiEvaluation = null;

  try {
    aiEvaluation = await generateDeveloperInsights(analysisPayload);
  } catch (error) {
    console.error(
      "[DEVSTATIS] AI review unavailable, using objective signals only:",
      error.message
    );
  }

  const aiAvailable = Boolean(aiEvaluation);

  const scoringResult = calculateDeveloperScore(
    profile,
    repositories,
    readmes,
    activity,
    languages,
    aiEvaluation
  );

  return {
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

    score: scoringResult.overallScore,
    breakdown: scoringResult.breakdown,
    scoringMethod: scoringResult.scoringMethod,
    coverage: scoringResult.coverage,
    aiAvailable,

    activity: {
      score: activity.score,
      sampledRepositories: activity.sampledRepositories,
      analyzedRepositories: activity.analyzedRepositories,
      coverage: activity.coverage,
      activeWithin90Days: activity.activeWithin90Days,
      activeWithin365Days: activity.activeWithin365Days,
      latestCommits: activity.latestCommits.map((commit) => ({
        repository: commit.repository,
        latestCommitDate: commit.latestCommitDate,
        ageInDays: commit.ageInDays,
        commitsWithin365Days: commit.commitsWithin365Days,
        activeMonths: commit.activeMonths,
        recencyScore: commit.recencyScore,
        frequencyScore: commit.frequencyScore,
        consistencyScore: commit.consistencyScore,
        score: commit.score,
      })),
    },

    insights: aiAvailable
      ? {
          categoryInsights: aiEvaluation.categoryInsights,
          summary: aiEvaluation.summary,
          strengths: aiEvaluation.strengths,
          improvements: aiEvaluation.improvements,
          recommendations: aiEvaluation.recommendations,
        }
      : {
          categoryInsights: {},
          summary:
            "AI review was unavailable for this report, so the score is based on objective public profile evidence only.",
          strengths: [],
          improvements: [],
          recommendations: [],
        },

    repositories: repositories.map((repo) => ({
      name: repo.name,
      fullName: repo.full_name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      languageBreakdown: repositoryLanguages[repo.full_name] || {},
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      updatedAt: repo.updated_at,
      isFork: repo.fork,
      size: repo.size,
      topics: repo.topics,
      hasReadme: Boolean(readmes[repo.full_name]),
    })),

    generatedAt: new Date().toISOString(),
  };
}
