import { TopicPage } from "../components/TopicPage";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { DonutChart } from "../components/charts/DonutChart";
import { ScatterChart } from "../components/charts/ScatterChart";
import { HBarChart } from "../components/charts/HBarChart";

export const topic = {
  id: "screens",
  nav: "Screens",
  title: "A Month of Screens",
  lede: "Six weeks of screen time, gently recorded by an operating system that never once judged me. I have taken the liberty of judging myself instead.",
  accent: "#4b6f8a",
  palette: ["#4b6f8a", "#7c9bb0", "#c1a37a", "#8f7c8f", "#94a7a2"]
};

export function ScreensPage() {
  return (
    <TopicPage topic={topic}>
      <BarChart
        title="The week, in hours"
        sub="Daily screen time averaged by weekday"
        unit="HOURS / DAY"
        highlight="Sun"
        data={[
          { label: "Mon", value: 4.6 },
          { label: "Tue", value: 5.1 },
          { label: "Wed", value: 5.4 },
          { label: "Thu", value: 5.2 },
          { label: "Fri", value: 4.9 },
          { label: "Sat", value: 6.3 },
          { label: "Sun", value: 7.2 },
        ]}
        note="Weekdays hover around five hours; the weekend jumps to six and seven. Sunday is the outlier, possibly because “one quick episode” is a unit of time with no fixed length."
      />

      <LineChart
        title="The day, in pickups"
        sub="Average pickups by hour, across six weeks"
        unit="PICKUPS / HOUR"
        area={true}
        x={["6a", "9a", "12p", "3p", "6p", "9p", "12a"]}
        series={[
          { name: "Pickups", values: [4, 12, 9, 14, 18, 31, 15], color: "accent" },
        ]}
        note="Pickups spike at 9 p.m., after the day is officially over. The noon dip is real and lasts exactly as long as lunch."
      />

      <DonutChart
        title="Where the hours went"
        sub="Share of screen time by category"
        unit="SHARE OF HOURS"
        center={{ value: "31%", label: "social apps" }}
        data={[
          { label: "Social", value: 31 },
          { label: "Work", value: 24 },
          { label: "Video", value: 19 },
          { label: "Reading", value: 14 },
          { label: "Other", value: 12 },
        ]}
        note="Social apps take the largest slice, but work is not far behind. The category “other” is where the truly inexplicable minutes live."
      />

      <ScatterChart
        title="More screen, less sleep"
        sub="21 nights · screen hours vs. sleep hours"
        unit="HOURS SLEPT"
        xLabel="screen time"
        xTicks={[
          { value: 3, label: "3h" },
          { value: 4, label: "4h" },
          { value: 5, label: "5h" },
          { value: 6, label: "6h" },
          { value: 7, label: "7h" },
          { value: 8, label: "8h" },
        ]}
        xDomain={[3, 8.1]}
        yDomain={[4, 9]}
        data={[
          { x: 3.2, y: 8.3 },
          { x: 3.5, y: 8 },
          { x: 3.8, y: 7.7 },
          { x: 4, y: 8.1 },
          { x: 4.2, y: 7.2 },
          { x: 4.5, y: 7.8 },
          { x: 4.8, y: 7 },
          { x: 5, y: 7.5 },
          { x: 5.2, y: 6.7 },
          { x: 5.4, y: 7.1 },
          { x: 5.6, y: 6.5 },
          { x: 5.8, y: 7 },
          { x: 6, y: 6.6 },
          { x: 6.2, y: 6.1 },
          { x: 6.4, y: 6.9 },
          { x: 6.6, y: 6.3 },
          { x: 6.8, y: 5.9 },
          { x: 7, y: 6.4 },
          { x: 7.2, y: 5.8 },
          { x: 7.4, y: 6 },
          { x: 7.6, y: 5.4 },
        ]}
        note="The nights with more screen time tend to have less sleep, though the arrow points both ways. This is the chart equivalent of asking a mirror who started it."
      />

      <HBarChart
        title="Most-opened apps"
        sub="Opens logged over six weeks"
        unit="OPENS"
        highlight="Messages"
        data={[
          { label: "Messages", value: 142 },
          { label: "Mail", value: 88 },
          { label: "Maps", value: 51 },
          { label: "Photos", value: 37 },
          { label: "Calendar", value: 29 },
        ]}
        note="Messages is opened nearly twice as often as the next app, which is mostly a story about group chats. Calendar is opened the least, which is a story about optimism."
      />
    </TopicPage>
  );
}
