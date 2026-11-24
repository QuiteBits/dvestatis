export default function ResultsLoading() {
  return (
    <div className="mx-auto max-w-[1180px] px-6 lg:px-8" role="status">
      <span className="sr-only">Generating your DEVSTATIS report…</span>

      <div className="flex animate-pulse items-center justify-between gap-4">
        <div className="h-4 w-40 rounded bg-white/[0.06]" />
        <div className="h-7 w-44 rounded-full bg-white/[0.05]" />
      </div>

      <div className="mt-4 animate-pulse rounded-2xl border border-white/10 bg-card/50 p-6 sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row">
          <div className="h-[88px] w-[88px] rounded-2xl bg-white/[0.06]" />
          <div className="flex-1 space-y-3">
            <div className="h-3 w-28 rounded bg-white/[0.05]" />
            <div className="h-7 w-52 rounded bg-white/[0.07]" />
            <div className="h-3 w-full max-w-md rounded bg-white/[0.05]" />
            <div className="h-3 w-64 rounded bg-white/[0.04]" />
          </div>
          <div className="space-y-2">
            <div className="h-9 w-36 rounded-full bg-white/[0.05]" />
            <div className="h-9 w-36 rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid animate-pulse grid-cols-2 gap-3 sm:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/[0.07] bg-card/40 p-4"
          >
            <div className="h-8 w-8 rounded-lg bg-white/[0.06]" />
            <div className="mt-3 h-6 w-16 rounded bg-white/[0.07]" />
            <div className="mt-2 h-2.5 w-24 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>

      <div className="mt-5 grid animate-pulse gap-5 lg:grid-cols-[minmax(0,1.9fr)_minmax(290px,1fr)]">
        <div className="space-y-5">
          <div className="rounded-2xl border border-white/10 bg-card/50 p-6 sm:p-8">
            <div className="grid gap-7 md:grid-cols-[220px_1fr]">
              <div className="mx-auto h-[200px] w-[200px] rounded-full border-[10px] border-white/[0.05]" />
              <div className="space-y-3">
                <div className="h-3 w-24 rounded bg-white/[0.05]" />
                <div className="h-3 w-full rounded bg-white/[0.06]" />
                <div className="h-3 w-11/12 rounded bg-white/[0.05]" />
                <div className="h-3 w-10/12 rounded bg-white/[0.04]" />
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((item) => (
                    <div
                      key={item}
                      className="h-14 rounded-lg border border-white/[0.06] bg-black/20"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-card/50 p-6 sm:p-8">
            <div className="h-5 w-40 rounded bg-white/[0.06]" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-xl border border-white/[0.06] bg-white/[0.015]"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="h-56 rounded-2xl border border-white/[0.08] bg-card/50"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
