const commit = __COMMIT__;
const commitUrl = `${__REPO__}/commit/${commit}`;

export function Footer() {
  return (
    <footer class="notebook-footer page-pad mt-auto border-t border-ink/25 pt-4 pb-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
        <div class="max-w-[520px]">
          <p class="font-note text-[20px] italic leading-[1.35] text-ink-soft sm:text-[22px]">
            “In God we trust. All others must bring data.”
          </p>
          <p class="mt-1 font-mono text-[13px] leading-[1.4] text-ink-faint">
            W. Edwards Deming
          </p>
        </div>

        <div class="flex shrink-0 flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[13px] uppercase tracking-[0.1em] text-ink-faint sm:items-end">
          <span class="normal-case tracking-[0.03em]">
            Made with love (and coffee) by GrizzlyBears ʕ•ᴥ•ʔ
          </span>
          {commit === "dev" ? (
            <span class="font-mono text-[12px]">dev build</span>
          ) : (
            <a
              class="font-mono text-[12px] normal-case tracking-[0.03em] underline decoration-ink-faint/40 underline-offset-2 transition-colors hover:text-ink-soft"
              href={commitUrl}
              target="_blank"
              rel="noreferrer"
            >
              commit {commit}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
