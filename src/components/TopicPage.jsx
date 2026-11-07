import { cloneElement, toChildArray } from "preact";
import { useEffect } from "preact/hooks";

export function TopicPage({ topic, children }) {
  useEffect(() => {
    document.title = `${topic.title} — Mapping the impact of AI through data`;
  }, [topic]);

  return (
    <section
      id="topic"
      class="scroll-mt-24 lg:scroll-mt-[72px]"
      style={{ "--accent": topic.accent }}
    >
      <div class="page-pad min-w-0 pt-2">
        <h2 class="max-w-[850px] font-hand text-[clamp(38px,10.5vw,48px)] leading-[0.9] font-bold tracking-[-0.012em] text-ink md:text-[clamp(42px,8vw,56px)] xl:text-[clamp(48px,4.6vw,62px)]">
          {topic.title}
        </h2>
        <p class="mt-2 max-w-[850px] text-[21px] leading-[1.42] text-ink-soft md:text-[22px] xl:text-[23px]">
          {topic.lede}
        </p>
      </div>

      <div class="page-pad grid grid-cols-1 gap-7 pt-7 pb-14 md:grid-cols-2 md:gap-8 lg:pt-7 lg:pb-[56px]">
        {toChildArray(children).map((child, index) =>
          cloneElement(child, {
            key: child.key ?? child.props.title,
            topic,
            index,
          }),
        )}
      </div>
    </section>
  );
}
