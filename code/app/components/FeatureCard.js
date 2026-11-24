export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <article className="group rounded-xl border border-white/[0.07] bg-card/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.9),0_0_30px_rgba(180,244,62,0.06)]">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 bg-primary/[0.07] text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/[0.11]">
        <Icon size={18} />
      </div>
      <h3 className="mt-3.5 text-[13px] font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
        {description}
      </p>
    </article>
  );
}
