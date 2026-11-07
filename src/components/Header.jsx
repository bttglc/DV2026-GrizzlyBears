import { useLocation } from "preact-iso";
import { topics } from "../topics";
import { base } from "../config";

export function Header({ activeId }) {
  const { route } = useLocation();

  function handleClick(event, link) {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    route(`${base}topic/${link.id}/`);
  }

  return (
    <div class="page-pad sticky top-0 z-40 border-b border-ink/20 bg-paper/95 pt-4 pb-3 backdrop-blur-sm sm:pt-5">
      <div class="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
        <a
          href={base}
          class="shrink-0 pb-1 text-[14px] font-bold uppercase tracking-[0.13em] text-ink decoration-[var(--accent)] decoration-2 underline-offset-[6px] transition-colors hover:text-[var(--accent)] hover:underline lg:pb-[11px]"
        >
          Mapping the impact of AI through data
        </a>
        <nav
          class="flex min-w-0 flex-col gap-1.5 lg:ml-auto lg:flex-row lg:items-end lg:gap-[18px]"
          aria-label="Notebook contents"
        >
          <div class="flex min-w-0 flex-wrap items-baseline gap-x-4 gap-y-1.5 lg:flex-nowrap lg:gap-x-[clamp(16px,2.2vw,30px)]">
            {topics.map((link) => {
              const active = link.id === activeId;

              return (
                <a
                  href={`${base}topic/${link.id}/`}
                  aria-current={active ? "page" : undefined}
                  onClick={(event) => handleClick(event, link)}
                  style={{ "--tab-accent": link.accent }}
                  class={`flex shrink-0 items-baseline border-b-2 pb-2 font-note text-[18px] leading-none transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-[var(--tab-accent)] sm:text-[19px] ${
                    active
                      ? "border-[var(--tab-accent)] text-ink"
                      : "border-transparent text-ink-soft hover:border-[var(--tab-accent)]/55 hover:text-[var(--tab-accent)]"
                  }`}
                >
                  <span>{link.nav}</span>
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
