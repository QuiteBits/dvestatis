const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(process.cwd(), "data");
const REPORTS_FILE = path.join(DATA_DIR, "reports.json");

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readReports() {
  ensureDataDir();
  try {
    const data = fs.readFileSync(REPORTS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { reports: [] };
  }
}

function writeReports(reports) {
  ensureDataDir();
  fs.writeFileSync(REPORTS_FILE, JSON.stringify(reports, null, 2));
}

function findReports(query) {
  const reports = readReports().reports;
  return reports.filter((r) => Object.entries(query).every(([key, value]) => r[key] === value));
}

export async function getReportsCollection() {
  return {
    find: (query) => findReports(query),
    sort: (criteria) => {
      const reports = readReports().reports;
      return [...reports].sort((a, b) => {
        const aVal = a[criteria];
        const bVal = b[criteria];
        if (typeof aVal === "string" && typeof bVal === "string") {
          return aVal.localeCompare(bVal);
        }
        return Number(bVal || 0) - Number(aVal || 0);
      });
    },
    toArray: () => readReports().reports,
    insertOne: async (doc) => {
      const data = readReports();
      data.reports.push(doc);
      writeReports(data.reports);
    },
    deleteOne: async (query) => {
      const data = readReports();
      const before = data.reports.length;
      data.reports = data.reports.filter(
        (r) => !Object.entries(query).every(([key, value]) => r[key] === value)
      );
      writeReports(data.reports);
      return { deletedCount: before - data.reports.length };
    },
  };
}

export async function saveReportToDatabase({ login, data, username }) {
  const reportsCollection = await getReportsCollection();

  // Check for existing report with same username to avoid duplicates
  const existing = await reportsCollection.findOne({
    login,
    "profile.username": username,
  });

  if (existing) {
    // Update existing report
    await reportsCollection.updateOne(
      { login, "profile.username": username },
      {
        $set: {
          profile: data.profile,
          statistics: data.statistics,
          score: data.score,
          breakdown: data.breakdown,
          scoringMethod: data.scoringMethod,
          coverage: data.coverage,
          aiAvailable: data.aiAvailable,
          insights: data.insights,
          repositories: data.repositories,
          generatedAt: new Date().toISOString(),
        },
      }
    );
  } else {
    await reportsCollection.insertOne({
      login,
      profile: data.profile,
      statistics: data.statistics,
      score: data.score,
      breakdown: data.breakdown,
      scoringMethod: data.scoringMethod,
      coverage: data.coverage,
      aiAvailable: data.aiAvailable,
      insights: data.insights,
      repositories: data.repositories,
      generatedAt: new Date().toISOString(),
    });
  }
}