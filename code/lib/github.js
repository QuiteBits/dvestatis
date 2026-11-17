import { getGitHubToken } from "@/lib/github-auth";
const GITHUB_API = "https://api.github.com";

async function githubRequest(endpoint) {
  const token = await getGitHubToken();

  const response = await fetch(`${GITHUB_API}${endpoint}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user or resource not found.");
    }

    if (response.status === 401 || response.status === 403) {
      throw new Error("GitHub authentication failed or API limit exceeded.");
    }

    if (response.status === 429) {
      throw new Error("GitHub API rate limit exceeded. Try again later.");
    }

    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}
export async function getGitHubProfile(username) {
  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    throw new Error("Invalid GitHub username.");
  }

  return githubRequest(`/users/${encodeURIComponent(username)}`);
}

export async function getGitHubRepositories(username) {
  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    throw new Error("Invalid GitHub username.");
  }

  const repositories = [];

  // Fetch up to 300 public repositories.
  for (let page = 1; page <= 3; page++) {
    const data = await githubRequest(
      `/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&sort=updated`
    );

    repositories.push(...data);

    if (data.length < 100) break;
  }

  return repositories;
}

export async function getRepositoryLanguages(owner, repo) {
  return githubRequest(
    `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/languages`
  );
}

export async function getRepositoryReadme(owner, repo) {
  try {
    const data = await githubRequest(
      `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`
    );

    if (data.encoding !== "base64" || !data.content) {
      return null;
    }

    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch (error) {
    if (error.message === "GitHub user or resource not found.") {
      return null;
    }

    throw error;
  }
}
