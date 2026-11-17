
import { getGitHubToken } from "@/lib/github-auth";

const GITHUB_API = "https://api.github.com";
const DAY = 24 * 60 * 60 * 1000;
const YEAR = 365 * DAY;
const MAX_REPOSITORIES = 10;
const MAX_COMMITS = 100;

async function getRepositoryCommits(owner, repo) {
  const token = await getGitHubToken();

  const url =
    `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=${MAX_COMMITS}`;

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (response.status === 404 || response.status === 409) {
    return [];
  }

  if (response.status === 401) {
    throw new Error("GitHub App authentication failed.");
  }

  if (
    response.status === 403 ||
    response.status === 429
  ) {
    throw new Error("GitHub API rate limit exceeded.");
  }

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

async function mapWithConcurrency(items, limit, callback) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (true) {
      const index = nextIndex++;

      if (index >= items.length) return;

      results[index] = await callback(items[index]);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(limit, items.length) },
      () => worker()
    )
  );

  return results;
}

function selectRepositories(repositories) {
  const original = repositories
    .filter((repo) => !repo.fork)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() -
        new Date(a.updated_at).getTime()
    );

  if (original.length <= MAX_REPOSITORIES) {
    return original;
  }

  const newest = original.slice(0, 5);
  const oldest = original.slice(-5);

  return [...newest, ...oldest];
}

function getCommitDate(commit) {
  const date =
    commit.commit.author?.date ||
    commit.commit.committer?.date;

  const timestamp = Date.parse(date);

  return Number.isFinite(timestamp) ? timestamp : null;
}

function calculateRepositoryActivity(commits, now) {
  const validCommits = commits
    .map((commit) => ({
      commit,
      timestamp: getCommitDate(commit),
    }))
    .filter((item) => item.timestamp !== null)
    .sort((a, b) => b.timestamp - a.timestamp);

  if (!validCommits.length) {
    return null;
  }

  const latestTimestamp = validCommits[0].timestamp;

  const recentCommits = validCommits.filter(
    (item) =>
      now - item.timestamp >= 0 &&
      now - item.timestamp <= YEAR
  );

  const activeMonths = new Set(
    recentCommits.map((item) => {
      const date = new Date(item.timestamp);

      return `${date.getUTCFullYear()}-${date.getUTCMonth()}`;
    })
  );

  const ageInDays = Math.max(
    0,
    (now - latestTimestamp) / DAY
  );

  // Recency: gradually decreases over 90 days.
  const recencyScore = Math.max(
    0,
    100 - (ageInDays / 90) * 100
  );

  // Frequency: logarithmic scale, capped at 30 commits.
  const frequencyScore =
    Math.min(recentCommits.length, 30) > 0
      ? (Math.log1p(
          Math.min(recentCommits.length, 30)
        ) /
          Math.log1p(30)) *
        100
      : 0;

  // Consistency: number of active months in the last year.
  const consistencyScore =
    (activeMonths.size / 12) * 100;

  const score =
    recencyScore * 0.4 +
    frequencyScore * 0.35 +
    consistencyScore * 0.25;

  return {
    latestCommitDate: new Date(
      latestTimestamp
    ).toISOString(),

    ageInDays: Math.round(ageInDays),

    commitsWithin365Days: recentCommits.length,

    activeMonths: activeMonths.size,

    sampleTruncated: commits.length === MAX_COMMITS,

    recencyScore: Math.round(recencyScore),
    frequencyScore: Math.round(frequencyScore),
    consistencyScore: Math.round(consistencyScore),

    score: Math.round(score),
  };
}

export async function getRecentRepositoryActivity(repositories) {
  const selectedRepos = selectRepositories(repositories);

  if (!selectedRepos.length) {
    return {
      score: null,
      sampledRepositories: 0,
      analyzedRepositories: 0,
      coverage: 0,
      activeWithin90Days: 0,
      activeWithin365Days: 0,
      latestCommits: [],
    };
  }

  const now = Date.now();

  const results = await mapWithConcurrency(
    selectedRepos,
    3,
    async (repo) => {
      try {
        const commits = await getRepositoryCommits(
          repo.owner.login,
          repo.name
        );

        const activity = calculateRepositoryActivity(
          commits,
          now
        );

        if (!activity) return null;

        return {
          repository: repo.full_name,
          ...activity,
        };
      } catch (error) {
        if (error.message.includes("rate limit")) {
          throw error;
        }

        if (error.message.includes("authentication")) {
          throw error;
        }

        return null;
      }
    }
  );

  const latestCommits = results.filter(Boolean);

  const analyzedRepositories = latestCommits.length;

  if (!analyzedRepositories) {
    return {
      score: null,
      sampledRepositories: selectedRepos.length,
      analyzedRepositories: 0,
      coverage: 0,
      activeWithin90Days: 0,
      activeWithin365Days: 0,
      latestCommits: [],
    };
  }

  const activeWithin90Days = latestCommits.filter(
    (repo) => repo.ageInDays <= 90
  ).length;

  const activeWithin365Days = latestCommits.filter(
    (repo) => repo.commitsWithin365Days > 0
  ).length;

  const score = Math.round(
    latestCommits.reduce(
      (total, repo) => total + repo.score,
      0
    ) / analyzedRepositories
  );

  return {
    score,
    sampledRepositories: selectedRepos.length,
    analyzedRepositories,

    coverage: Math.round(
      (analyzedRepositories / selectedRepos.length) * 100
    ),

    activeWithin90Days,
    activeWithin365Days,
    latestCommits,
  };
}
