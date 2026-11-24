import { languageColor } from "@/lib/format";
import { PieIcon } from "../icons";

export default function LanguageCard({ languages = [] }) {
  const visible = languages.slice(0, 6);
  const top = visible.slice(0, 5);
  const visibleTotal = visible.reduce(
    (total, language) => total + language.percentage,
    0
  );
  const other = Math.max(0, 100 - visibleTotal);

  return (
    <section className="rounded-2xl border border-white/[0.08] bg-card/50 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-[13px] font-semibold text-foreground">
          <PieIcon size={15} className="text-primary" />
          Language mix
        </h2>
        <span className="text-[10px] text-subtle">
          {languages.length} detected
        </span>
      </div>

      {visible.length > 0 ? (
        <>
          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full bg-white/[0.05]">
            {visible.map((language) => (
              <span
                key={language.name}
                title={`${language.name} ${language.percentage}%`}
                style={{
                  width: `${Math.max(language.percentage, 1)}%`,
                  backgroundColor: languageColor(language.name),
                }}
                className="h-full first:rounded-l-full last:rounded-r-full"
              />
            ))}
          </div>

          <ul className="mt-4 space-y-2.5">
            {top.map((language) => (
              <li key={language.name}>
                <div className="flex items-center justify-between gap-3 text-[11px]">
                  <span className="flex min-w-0 items-center gap-2 text-muted">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{
                        backgroundColor: languageColor(language.name),
                      }}
                    />
                    <span className="truncate">{language.name}</span>
                  </span>
                  <span className="shrink-0 font-medium text-foreground">
                    {language.percentage.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(language.percentage, 100)}%`,
                      backgroundColor: languageColor(language.name),
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>

          {other > 0.5 && (
            <p className="mt-3 text-[10px] text-subtle">
              +{other.toFixed(1)}% across other languages
            </p>
          )}

          <p className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] leading-relaxed text-subtle">
            Calculated from language bytes in original repositories.
          </p>
        </>
      ) : (
        <p className="mt-4 text-[11.5px] leading-relaxed text-muted">
          No original repository language data was available.
        </p>
      )}
    </section>
  );
}
