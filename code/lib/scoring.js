
const OBJECTIVE_RATIO = 0.4;
const AI_RATIO = 0.6;

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

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

function calculateRepositoryQuality(repositories) {
  const originalRepos = repositories.filter(
    (repo) => !repo.fork
  );

  if (!originalRepos.length) return null;

  const descriptionRatio =
    originalRepos.filter(
      (repo) => repo.description?.trim()
    ).length / originalRepos.length;

  const topicsRatio =
    originalRepos.filter(
      (repo) => repo.topics?.length > 0
    ).length / originalRepos.length;

  const licenseRatio =
    originalRepos.filter(
      (repo) => Boolean(repo.license?.spdx_id)
    ).length / originalRepos.length;

  return clamp(
    descriptionRatio * 40 +
      topicsRatio * 35 +
      licenseRatio * 25
  );
}

function calculateDocumentationQuality(
  repositories,
  readmes
) {
  if (!readmes || typeof readmes !== "object") {
    return null;
  }

  const inspectedRepos = repositories.filter(
    (repo) =>
      !repo.fork &&
      Object.prototype.hasOwnProperty.call(
        readmes,
        repo.full_name
      )
  );

  if (!inspectedRepos.length) return null;

  const scores = inspectedRepos.map((repo) => {
    const readme = readmes[repo.full_name];

    if (!readme || typeof readme !== "string") {
      return 0;
    }

    const headings = (
      readme.match(/^#{1,6}\s+.+/gm) || []
    ).length;

    const hasInstallation =
      /installation|install|getting started|setup/i.test(
        readme
      );

    const hasUsage =
      /usage|example|how to use|run/i.test(readme);

    const hasDescription =
      readme.trim().length >= 150;

    return clamp(
      (Math.min(readme.length / 1500, 1) * 35) +
        (Math.min(headings / 5, 1) * 30) +
        (hasInstallation ? 15 : 0) +
        (hasUsage ? 10 : 0) +
        (hasDescription ? 10 : 0)
    );
  });

  return average(scores);
}

function calculateTechDiversity(languages) {
  if (!Array.isArray(languages) || !languages.length) {
    return null;
  }

  const validLanguages = languages.filter(
    (language) =>
      typeof language.name === "string" &&
      Number.isFinite(language.bytes) &&
      language.bytes > 0
  );

  if (!validLanguages.length) return null;

  const totalBytes = validLanguages.reduce(
    (sum, language) => sum + language.bytes,
    0
  );

  if (!totalBytes) return null;

  const shares = validLanguages.map(
    (language) => language.bytes / totalBytes
  );

  // Shannon entropy measures distribution rather than
  // simply rewarding a large number of languages.
  const entropy = -shares.reduce(
    (sum, share) => sum + share * Math.log(share),
    0
  );

  const normalizedEntropy =
    validLanguages.length > 1
      ? entropy / Math.log(validLanguages.length)
      : 0;

  const breadthScore = clamp(
    (validLanguages.length / 5) * 100
  );

  return clamp(
    breadthScore * 0.4 +
      normalizedEntropy * 100 * 0.6
  );
}

function calculateDevelopmentActivity(activity) {
  if (
    !activity ||
    !Number.isFinite(activity.score) ||
    activity.analyzedRepositories <= 0
  ) {
    return null;
  }

  return clamp(activity.score);
}

function calculateCommunityEngagement(
  profile,
  repositories
) {
  if (
    !profile ||
    !Array.isArray(repositories) ||
    !repositories.length
  ) {
    return null;
  }

  // This is a visibility metric, not a measurement
  // of programming skill.
  const stars = repositories.reduce(
    (total, repo) =>
      total + (repo.stargazers_count || 0),
    0
  );

  const forks = repositories.reduce(
    (total, repo) =>
      total + (repo.forks_count || 0),
    0
  );

  const followers = profile.followers || 0;

  const starScore = clamp(
    (Math.log10(stars + 1) / 3) * 100
  );

  const forkScore = clamp(
    (Math.log10(forks + 1) / 2.5) * 100
  );

  const followerScore = clamp(
    (Math.log10(followers + 1) / 3) * 100
  );

  return (
    starScore * 0.5 +
    forkScore * 0.2 +
    followerScore * 0.3
  );
}

function calculateProfileCompleteness(profile) {
  if (!profile) return null;

  const fields = [
    profile.name,
    profile.bio,
    profile.company,
    profile.location,
    profile.blog,
  ];

  const completed = fields.filter(
    (field) =>
      typeof field === "string" &&
      field.trim().length > 0
  ).length;

  return (completed / fields.length) * 100;
}

export function calculateDeveloperScore(
  profile,
  repositories,
  readmes,
  activity,
  languages,
  aiEvaluation
) {
  const objectiveScores = {
    repositoryQuality:
      calculateRepositoryQuality(repositories),

    documentationQuality:
      calculateDocumentationQuality(
        repositories,
        readmes
      ),

    techDiversity:
      calculateTechDiversity(languages),

    developmentActivity:
      calculateDevelopmentActivity(activity),

    communityEngagement:
      calculateCommunityEngagement(
        profile,
        repositories
      ),

    profileCompleteness:
      calculateProfileCompleteness(profile),
  };

  const breakdown = {};

  let earnedPoints = 0;
  let availableWeight = 0;

  for (const [category, weight] of Object.entries(
    WEIGHTS
  )) {
    const objectiveScore = objectiveScores[category];

    const aiScore =
      aiEvaluation?.categoryInsights?.[category]
        ?.score;

    const objectiveAvailable =
      Number.isFinite(objectiveScore);

    const aiAvailable =
      Number.isInteger(aiScore) &&
      aiScore >= 0 &&
      aiScore <= 100;

    let finalScore = null;

    if (objectiveAvailable && aiAvailable) {
      finalScore =
        objectiveScore * OBJECTIVE_RATIO +
        aiScore * AI_RATIO;
    } else if (aiAvailable) {
      finalScore = aiScore;
    } else if (objectiveAvailable) {
      finalScore = objectiveScore;
    }

    const available =
      objectiveAvailable || aiAvailable;

    const categoryPoints =
      available && finalScore !== null
        ? (finalScore * weight) / 100
        : null;

    breakdown[category] = {
      score:
        finalScore === null
          ? null
          : Math.round(finalScore),

      objectiveScore:
        objectiveAvailable
          ? Math.round(objectiveScore)
          : null,

      aiScore: aiAvailable ? aiScore : null,

      weight,

      objectiveAvailable,
      aiAvailable,
      available,

      points:
        categoryPoints === null
          ? null
          : Number(categoryPoints.toFixed(2)),
    };

    if (available && finalScore !== null) {
      earnedPoints += categoryPoints;
      availableWeight += weight;
    }
  }

  return {
    overallScore:
      availableWeight === 0
        ? null
        : Math.round(
            (earnedPoints / availableWeight) * 100
          ),

    availableWeight,
    totalWeight: 100,

    coverage: availableWeight,

    scoringMethod: {
      objectivePercentage: OBJECTIVE_RATIO * 100,
      aiPercentage: AI_RATIO * 100,
    },

    breakdown,
  };
}
