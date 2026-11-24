import FeatureCard from "./FeatureCard";
import { BarChartIcon, BoltIcon, CodeIcon, PieIcon } from "./icons";

const features = [
  {
    icon: BarChartIcon,
    title: "Profile Analytics",
    description:
      "Get a comprehensive overview of your GitHub profile.",
  },
  {
    icon: CodeIcon,
    title: "Repository Intelligence",
    description: "Explore your projects and technologies.",
  },
  {
    icon: PieIcon,
    title: "Language Insights",
    description: "Understand the languages you work with.",
  },
  {
    icon: BoltIcon,
    title: "Contribution Patterns",
    description: "Discover your coding habits and consistency.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative pb-10 pt-14 sm:pb-14 sm:pt-16 lg:pb-10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.01em] text-foreground sm:text-4xl">
            Understand more than your commit history.
          </h2>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
