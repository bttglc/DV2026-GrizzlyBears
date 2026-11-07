import { useEffect, useRef, useState } from "preact/hooks";

/**
 * Card chrome and container measurement shared by every chart component.
 *
 * A chart component passes its spec through `spec` and renders its `<svg>` with
 * the `children` render prop, which receives the measured `width`, `height` and
 * a one-shot `animate` flag. This keeps title, note and sizing in one place so
 * topic pages can instantiate charts directly.
 */
export function ChartShell({ spec, topic, index, children }) {
  const hero = index === 0;
  const titleId = `chart-${topic.id}-${index}`;
  const wrapRef = useRef(null);
  const lastWidth = useRef(0);
  const hasDrawn = useRef(false);
  const [size, setSize] = useState({ width: 0, height: 0, animate: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frame = 0;
    lastWidth.current = 0;
    hasDrawn.current = false;

    function measure() {
      const width = Math.round(wrap.clientWidth);
      if (width < 40) return;
      if (Math.abs(width - lastWidth.current) < 3) return;

      lastWidth.current = width;
      const animate = !hasDrawn.current && !reduceMotion;
      hasDrawn.current = true;

      setSize({
        width,
        height: Math.round(Math.max(240, Math.min(380, width * 0.66))),
        animate,
      });
    }

    function scheduleMeasure() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(measure);
    }

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(wrap);
    scheduleMeasure();

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [spec, topic]);

  return (
    <article
      class={`group min-w-0 rounded-[4px] border border-stone-500/20 bg-card p-4 shadow-[0_1px_2px_rgba(58,49,36,0.035)] transition-colors hover:border-stone-500/40 sm:p-5 lg:p-[22px] ${
        hero ? "md:col-span-2" : ""
      }`}
      aria-labelledby={titleId}
    >
      <header class="min-w-0">
        <h3
          id={titleId}
          class="font-hand text-[32px] font-semibold leading-[0.96] tracking-[-0.008em] text-ink sm:text-[34px]"
        >
          {spec.title}
        </h3>
        <p class="mt-0.5 font-mono text-[13.5px] leading-[1.45] text-ink-faint">
          {spec.sub}
        </p>
      </header>

      <div
        class={`mt-2 ${
          hero
            ? "grid items-stretch gap-3 md:grid-cols-[minmax(0,1.55fr)_minmax(190px,0.6fr)] md:gap-[22px]"
            : ""
        }`}
      >
        <div
          ref={wrapRef}
          class={`chart-wrap relative w-full ${
            hero ? "min-h-[280px]" : "min-h-[235px]"
          }`}
          style={size.height ? { height: `${size.height}px` } : undefined}
          aria-busy={size.width ? "false" : "true"}
        >
          {size.width > 0 &&
            children({
              chart: spec,
              topic,
              width: size.width,
              height: size.height,
              animate: size.animate,
              hero,
            })}
        </div>

        <div
          class={`border-t border-ink/15 pt-3 ${
            hero
              ? "md:flex md:flex-col md:justify-center md:border-t-0 md:border-l md:border-ink/20 md:pl-6"
              : "mt-2"
          }`}
        >
          <p class="mb-1 font-mono text-[12.5px] font-bold uppercase tracking-[0.14em] text-[var(--accent)]">
            What it says
          </p>
          <p
            class={`m-0 text-[19.5px] leading-[1.4] text-ink-soft sm:text-[20px] ${
              hero ? "md:text-[21px] md:leading-[1.45]" : ""
            }`}
          >
            {spec.note}
          </p>
        </div>
      </div>
    </article>
  );
}
