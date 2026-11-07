import { TopicPage } from "../components/TopicPage";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { DonutChart } from "../components/charts/DonutChart";
import { ScatterChart } from "../components/charts/ScatterChart";
import { HBarChart } from "../components/charts/HBarChart";

export const topic = {
  id: "coffee",
  nav: "Coffee",
  title: "Coffee, Counted",
  lede: "A completely unscientific study of what happens when a small habit is written down. Spoiler: it becomes a bigger habit.",
  accent: "#8a5a35",
  palette: ["#8a5a35", "#c08a56", "#d8b582", "#6e7f68", "#b98b7a"]
};

export function CoffeePage() {
  return (
    <TopicPage topic={topic}>
      <BarChart
        title="Cups per weekday"
        sub="Daily average, shamefully precise"
        unit="CUPS / DAY"
        highlight="Thu"
        data={[
          { label: "Mon", value: 2.4 },
          { label: "Tue", value: 2.8 },
          { label: "Wed", value: 3.1 },
          { label: "Thu", value: 3.6 },
          { label: "Fri", value: 2.9 },
          { label: "Sat", value: 1.7 },
          { label: "Sun", value: 1.5 },
        ]}
        note="Thursday takes the crown at 3.6 cups, which feels less like a finding and more like a cry for help. Weekends settle around 1.6; the espresso machine gets a rest, and so do I."
      />

      <LineChart
        title="Focus vs. jitters"
        sub="Self-rated 1–10, hour by hour after the first cup"
        unit="SCORE / HOUR"
        x={["0h", "1h", "2h", "3h", "4h", "5h", "6h"]}
        series={[
          { name: "Focus", values: [2, 6, 8, 9, 7, 5, 3], color: "accent" },
          { name: "Jitters", values: [1, 2, 3, 4, 6, 7, 8], color: "muted" },
        ]}
        note="Focus climbs for about three hours, then falls off a small cliff. Jitters continue climbing after focus leaves, which explains a lot about the 4 p.m. meeting."
      />

      <DonutChart
        title="Where the caffeine came from"
        sub="Share of 78 cups by brew method"
        unit="SHARE OF CUPS"
        center={{ value: "78", label: "cups total" }}
        data={[
          { label: "V60", value: 38 },
          { label: "Espresso", value: 24 },
          { label: "French press", value: 21 },
          { label: "Cold brew", value: 17 },
        ]}
        note="Pour-over is almost two-fifths of the total, confirming that the slowest possible method is also the one I reach for when I am already late. Espresso is the efficient exception."
      />

      <ScatterChart
        title="Sleep vs. cups"
        sub="18 days · hours slept vs. cups drunk"
        unit="CUPS"
        xLabel="hours slept"
        xTicks={[
          { value: 5, label: "5h" },
          { value: 6, label: "6h" },
          { value: 7, label: "7h" },
          { value: 8, label: "8h" },
          { value: 9, label: "9h" },
        ]}
        xDomain={[4.5, 9.2]}
        yDomain={[0, 5]}
        data={[
          { x: 4.8, y: 4 },
          { x: 5.2, y: 4 },
          { x: 5.8, y: 3 },
          { x: 6, y: 4 },
          { x: 6.2, y: 3 },
          { x: 6.4, y: 2 },
          { x: 6.5, y: 3 },
          { x: 6.8, y: 2 },
          { x: 7, y: 3 },
          { x: 7.1, y: 2 },
          { x: 7.2, y: 2 },
          { x: 7.4, y: 2 },
          { x: 7.5, y: 1 },
          { x: 7.6, y: 2 },
          { x: 7.8, y: 1 },
          { x: 8, y: 1 },
          { x: 8.2, y: 2 },
          { x: 8.5, y: 1 },
        ]}
        note="Short nights lean toward more cups, but the cloud is wide. Sleep is not the only reason for the fourth coffee; sometimes the reason is simply that it is 3 p.m."
      />

      <HBarChart
        title="Why I made another"
        sub="Reasons logged across thirty days"
        unit="TIMES"
        highlight="Tired"
        data={[
          { label: "Tired", value: 18 },
          { label: "Habit", value: 14 },
          { label: "Deadline", value: 9 },
          { label: "Social", value: 6 },
          { label: "Because", value: 4 },
        ]}
        note="Being tired is the most common reason for a second cup, followed closely by habit. “Because” is doing a lot of quiet work in this chart."
      />
    </TopicPage>
  );
}
