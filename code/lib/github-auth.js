import { createAppAuth } from "@octokit/auth-app";

export async function getGitHubToken() {
  const appId = process.env.GITHUB_APP_ID;
  const installationId = process.env.GITHUB_INSTALLATION_ID;

  const privateKey = process.env.GITHUB_PRIVATE_KEY?.replace(
    /\\n/g,
    "\n"
  );

  if (!appId || !installationId || !privateKey) {
    throw new Error("Missing GitHub App credentials.");
  }

  const auth = createAppAuth({
    appId,
    privateKey,
  });

  const installationAuth = await auth({
    type: "installation",
    installationId: Number(installationId),
  });

  return installationAuth.token;
}