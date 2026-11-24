import {
  BoltIcon,
  CodeIcon,
  FileIcon,
  FolderIcon,
  ShieldIcon,
  UsersIcon,
} from "../icons";

export const CATEGORIES = [
  {
    key: "repositoryQuality",
    label: "Repository quality",
    short: "Repos",
    description:
      "Original project depth, descriptions, topics, and licensing.",
    icon: FolderIcon,
  },
  {
    key: "documentationQuality",
    label: "Documentation",
    short: "Docs",
    description:
      "README clarity, setup guidance, structure, and usefulness.",
    icon: FileIcon,
  },
  {
    key: "techDiversity",
    label: "Tech diversity",
    short: "Tech range",
    description:
      "Breadth and balance of languages across original work.",
    icon: CodeIcon,
  },
  {
    key: "developmentActivity",
    label: "Activity",
    short: "Activity",
    description:
      "Commit recency, frequency, and consistency across recent work.",
    icon: BoltIcon,
  },
  {
    key: "communityEngagement",
    label: "Community",
    short: "Community",
    description:
      "Visibility signals such as stars, forks, and followers.",
    icon: UsersIcon,
  },
  {
    key: "profileCompleteness",
    label: "Profile",
    short: "Profile",
    description:
      "How clearly the profile communicates identity, work, and links.",
    icon: ShieldIcon,
  },
];

export const CATEGORY_MAP = Object.fromEntries(
  CATEGORIES.map((category) => [category.key, category])
);
