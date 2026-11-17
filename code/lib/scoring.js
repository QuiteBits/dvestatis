
const WEIGHTS = {
  repositoryQuality: 30,
  documentationQuality: 20,
  techDiversity: 15,
  developmentActivity: 15,
  communityEngagement: 10,
  profileCompleteness: 10,
};

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function average(values) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function calculateRepositoryQuality(repositories) {
  if (!repositories.length) return null;

  const originalRepos = repositories.filter((repo) => !repo.fork);

  if (!originalRepos.length) return 0;

  const descriptionScore =
    originalRepos.filter((repo) => repo.description?.trim()).length /
    originalRepos.length;

  const topicsScore =
    originalRepos.filter((repo) => repo.topics?.length > 0).length /
    originalRepos.length;

  const sizeScore =
    originalRepos.filter((repo) => repo.size > 0).length /
    originalRepos.length;

  const originalRatio = originalRepos.length / repositories.length;

  return clamp(
    (
      originalRatio * 40 +
      descriptionScore * 30 +
      topicsScore * 15 +
      sizeScore * 15
    )
  );
}


function calculateDocumentationQuality(repositories, readmes) {
  if (!readmes || typeof readmes !== "object") return null;

  const originalRepos = repositories.filter(
    (repo) =>
      !repo.fork &&
      Object.prototype.hasOwnProperty.call(readmes, repo.full_name)
  );

  if (!originalRepos.length) return null;

  const scores = originalRepos.map((repo) => {
    const readme = readmes[repo.full_name];

    if (!readme || typeof readme !== "string") return 0;

    const lengthScore = clamp((readme.length / 1500) * 100);

    const headings = (readme.match(/^#{1,6}\s+.+/gm) || []).length;
    const headingScore = clamp((headings / 5) * 100);

    return lengthScore * 0.6 + headingScore * 0.4;
  });

  return average(scores);
}


function calculateTechDiversity(repositories) {
  const languages = new Set(
    repositories.map((repo) => repo.language).filter(Boolean)
  );

  if (!languages.size) return null;

  return clamp((languages.size / 5) * 100);
}

function calculateDevelopmentActivity(repositories) {
  if (!repositories.length) return null;

  const now = Date.now();

  const updatedWithin90Days = repositories.filter((repo) => {
    const updatedAt = new Date(repo.updated_at).getTime();
    return Number.isFinite(updatedAt) &&
      now - updatedAt <= 90 * 24 * 60 * 60 * 1000;
  }).length;

  const updatedWithin365Days = repositories.filter((repo) => {
    const updatedAt = new Date(repo.updated_at).getTime();
    return Number.isFinite(updatedAt) &&
      now - updatedAt <= 365 * 24 * 60 * 60 * 1000;
  }).length;

  const recentRatio = updatedWithin90Days / repositories.length;
  const yearlyRatio = updatedWithin365Days / repositories.length;

  return clamp(recentRatio * 70 + yearlyRatio * 30);
}

function calculateCommunityEngagement(profile, repositories) {
  const stars = repositories.reduce(
    (total, repo) => total + (repo.stargazers_count || 0),
    0
  );

  const forks = repositories.reduce(
    (total, repo) => total + (repo.forks_count || 0),
    0
  );

  const followers = profile.followers || 0;

  const starScore = clamp((Math.log10(stars + 1) / 3) * 100);
  const forkScore = clamp((Math.log10(forks + 1) / 2.5) * 100);
  const followerScore = clamp((Math.log10(followers + 1) / 3) * 100);

  return starScore * 0.5 + forkScore * 0.2 + followerScore * 0.3;
}

function calculateProfileCompleteness(profile) {
  const fields = [
    profile.name,
    profile.bio,
    profile.company,
    profile.location,
    profile.blog,
  ];

  const completed = fields.filter(
    (field) => typeof field === "string" && field.trim().length > 0
  ).length;

  return (completed / fields.length) * 100;
}


export function calculateDeveloperScore(
  profile,
  repositories,
  readmes,
  activity
) {
  const categories = {
    repositoryQuality: calculateRepositoryQuality(repositories),
    documentationQuality: calculateDocumentationQuality(repositories, readmes),
    techDiversity: calculateTechDiversity(repositories),
    developmentActivity: activity?.score ?? null,
    communityEngagement: calculateCommunityEngagement(profile, repositories),
    profileCompleteness: calculateProfileCompleteness(profile)
  };

  let earnedPoints = 0;
  let availableWeight = 0;
  const breakdown = {};

  for (const [category, weight] of Object.entries(WEIGHTS)) {
    const score = categories[category];

    breakdown[category] = {
      score: score === null ? null : Math.round(score),
      weight,
      available: score !== null,
      points: score === null
        ? null
        : Number(((score * weight) / 100).toFixed(2)),
    };

    if (score !== null) {
      earnedPoints += (score * weight) / 100;
      availableWeight += weight;
    }
  }

  return {
    overallScore: availableWeight === 0
      ? null
      : Math.round((earnedPoints / availableWeight) * 100),
    availableWeight,
    totalWeight: 100,
    coverage: availableWeight,
    breakdown,
  };
}