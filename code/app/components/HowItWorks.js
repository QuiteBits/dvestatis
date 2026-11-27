import { BarChartIcon, FileIcon, GithubIcon } from "./icons";

const steps = [
  {
    number: "01",
    icon: GithubIcon,
    title: "Connect your GitHub account",
    description: "Secure and easy authentication.",
  },
  {
    number: "02",
    icon: BarChartIcon,
    title: "Analyze your profile",
    description: "Let us crunch the numbers.",
  },
  {
    number: "03",
    icon: FileIcon,
    title: "Explore your statistics",
    description: "Gain valuable insights.",
  },
];

function StepArrow() {
  return (
    <div className="hidden items-start pt-3.5 lg:flex" aria-hidden="true">
      <svg
        width="30"
        height="16"
        viewBox="0 0 30 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-subtle"
      >
        <path d="M1 8h26" />
        <path d="m23 3 5 5-5 5" />
      </svg>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-12 lg:pb-6 lg:pt-8">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-14">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
          How it works
        </p>

        <div className="mx-auto mt-8 grid max-w-[1120px] gap-8 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-6">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const delayClass = index === 0 ? "opacity-100" : index <= 1 ? "opacity-80" : "opacity-50";
            const transformClass = index === 0 ? "translate-y-0" : index <= 1 ? "translate-y-[-4px]" : "translate-y-[-8px]";
            return (
              <div
                key={step.number}
                className={`relative flex items-start gap-3.5 transition-opacity duration-500 ${delayClass}` }
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-foreground"
                  >
                    <StepIcon size={19} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-[10px] font-bold tracking-wide text-primary">
                        {step.number}
                      </span>
                      <h3 className="text-[13px] font-semibold leading-snug text-foreground">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && <StepArrow />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}