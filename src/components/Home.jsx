const base = import.meta.env.BASE_URL;

export function Home() {
  return (
    <section class="page-pad flex flex-1 flex-col py-[clamp(8px,1.5vh,20px)]">
      <div class="flex w-full justify-end text-right text-[14px] leading-[1.35] text-ink-soft sm:text-[15px]">
        <div>
          <p class="text-ink-faint">a project by:</p>
          <ul class="font-bold text-ink">
            <li>Gianluca Bottiglieri</li>
            <li>Roberto Castellotti</li>
            <li>Virginia Passalacqua</li>
            <li>Edoardo Siri</li>
          </ul>
          <p class="mt-0.5 text-ink-faint">assisted by Deepseek v4.1-flash</p>
        </div>
      </div>

      <div class="flex flex-1 flex-col items-center justify-center text-center">
        <h1 class="mt-[clamp(4px,1vh,12px)] font-hand text-[clamp(56px,min(10vw,12vh),152px)] leading-[0.78] font-bold tracking-[-0.028em] text-ink">
          Mapping the impact of AI{" "}
          <span class="notebook-marker">through data</span>
        </h1>

        <p class="mt-[clamp(8px,2vh,20px)] max-w-[950px] text-[clamp(19px,min(1.9vw,2.9vh),26px)] leading-[1.45] text-ink-soft">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since 1966, when designers at Letraset and James Mosley, the librarian
          at St Bride Printing Library in London, took a 1914 Cicero translation
          and scrambled it to make dummy text for Letraset's Body Type sheets.
        </p>

        <a
          href={`${base}topic/commute/`}
          class="mt-[clamp(12px,2vh,20px)] inline-block border-b-2 border-[var(--accent)] pb-1 font-note text-[clamp(20px,min(1.8vw,2.8vh),24px)] text-ink transition-colors hover:text-[var(--accent)]"
        >
          Open the notebook →
        </a>
      </div>
    </section>
  );
}
