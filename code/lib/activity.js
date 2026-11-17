import { getGitHubToken } from "@/lib/github-auth";
const GITHUB_API = "https://api.github.com";

const DAY = 24 * 60 * 60 * 1000;


async function getLatestCommit(owner, repo) {
  const url = `${GITHUB_API}/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits?per_page=1`;

  const token = await getGitHubToken();

  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  // Empty repositories or inaccessible histories.
  if (response.status === 404 || response.status === 409) {
    return null;
  }

  if (response.status === 401) {
    throw new Error("GitHub App authentication failed.");
  }

  if (response.status === 403 || response.status === 429) {
    throw new Error("GitHub API rate limit exceeded.");
  }

  if (!response.ok) {
    return null;
  }

  const commits = await response.json();

  if (!commits.length) return null;

  const commit = commits[0];

  const date =
    commit.commit.author?.date ||
    commit.commit.committer?.date;

  if (!date || !Number.isFinite(Date.parse(date))) {
    return null;
  }

  return {
    sha: commit.sha,
    message: commit.commit.message.split("\n")[0],
    date,
    url: commit.html_url,
  };
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

export async function getRecentRepositoryActivity(repositories) {
  const originalRepos = repositories
    .filter((repo) => !repo.fork)
    .slice(0, 10);

  if (!originalRepos.length) {
    return {
      score: null,
      sampledRepositories: 0,
      analyzedRepositories: 0,
      activeWithin90Days: 0,
      activeWithin365Days: 0,
      latestCommits: [],
    };
  }

  const results = await mapWithConcurrency(
    originalRepos,
    3,
    async (repo) => {
      try {
        const commit = await getLatestCommit(
          repo.owner.login,
          repo.name
        );

        return commit
          ? {
              repository: repo.full_name,
              ...commit,
            }
          : null;
      } catch (error) {
        if (error.message.includes("rate limit")) {
          throw error;
        }

        return null;
      }
    }
  );

  const latestCommits = results.filter(Boolean);

  if (!latestCommits.length) {
    return {
      score: null,
      sampledRepositories: originalRepos.length,
      analyzedRepositories: 0,
      activeWithin90Days: 0,
      activeWithin365Days: 0,
      latestCommits: [],
    };
  }

  const now = Date.now();

  const activeWithin90Days = latestCommits.filter((commit) => {
    const age = now - Date.parse(commit.date);
    return age >= 0 && age <= 90 * DAY;
  }).length;

  const activeWithin365Days = latestCommits.filter((commit) => {
    const age = now - Date.parse(commit.date);
    return age >= 0 && age <= 365 * DAY;
  }).length;

  const recentRatio = activeWithin90Days / latestCommits.length;
  const yearlyRatio = activeWithin365Days / latestCommits.length;

  const score = Math.round(
    (recentRatio * 70 + yearlyRatio * 30) * 100
  ) / 100;

  return {
    score,
    sampledRepositories: originalRepos.length,
    analyzedRepositories: latestCommits.length,
    activeWithin90Days,
    activeWithin365Days,
    latestCommits,
  };
}
