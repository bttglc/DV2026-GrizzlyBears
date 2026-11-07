import { TopicPage } from "../components/TopicPage";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { DonutChart } from "../components/charts/DonutChart";
import { ScatterChart } from "../components/charts/ScatterChart";
import { HBarChart } from "../components/charts/HBarChart";

export const topic = {
  id: "commute",
  nav: "Commute",
  title: "The Morning Commute",
  lede: "A month of leaving the house at roughly the same time and arriving at wildly different ones. The bus is a rumour; the bike is a promise.",
  accent: "#b9563d",
  palette: ["#b9563d", "#d58b5f", "#7e8b67", "#5c7883", "#e8c46a"]
};

export function CommutePage() {
  return (
    <TopicPage topic={topic}>
      <BarChart
        title="How long it actually took"
        sub="Door-to-door minutes, averaged by day"
        unit="MINUTES / DAY"
        highlight="Wed"
        data={[
          { label: "Mon", value: 24 },
          { label: "Tue", value: 26 },
          { label: "Wed", value: 34 },
          { label: "Thu", value: 28 },
          { label: "Fri", value: 25 },
          { label: "Sat", value: 19 },
          { label: "Sun", value: 16 },
        ]}
        note="A calm-looking seven-day average hides a very loud Wednesday. The 8:12 crossing adds eleven minutes all by itself — enough time to listen to an entire podcast intro."
      />

      <LineChart
        title="Bike vs. bus, week by week"
        sub="Average one-way trip across five weeks"
        unit="MINUTES / WEEK"
        x={["W1", "W2", "W3", "W4", "W5"]}
        series={[
          { name: "Bike", values: [22, 24, 23, 21, 22], color: "accent" },
          { name: "Bus", values: [36, 35, 41, 38, 40], color: "muted" },
        ]}
        note="By week five the bike was consistently quicker, even on the wet mornings. The bus line does not get better; I simply stopped taking it as often. That is less a transport insight than a confession."
      />

      <DonutChart
        title="How the miles add up"
        sub="Share of trips by mode"
        unit="SHARE OF TRIPS"
        center={{ value: "46%", label: "by bike" }}
        data={[
          { label: "Bike", value: 46 },
          { label: "Bus", value: 27 },
          { label: "Walk", value: 18 },
          { label: "Lift", value: 9 },
        ]}
        note="Almost half of all trips happened on two wheels, mostly because the bike lives by the door. The lift — technically four trips — remains the fastest way to travel if someone else is driving."
      />

      <ScatterChart
        title="Leave later, arrive later?"
        sub="14 mornings · departure time vs. trip length"
        unit="MINUTES"
        xLabel="leave time"
        xTicks={[
          { value: 7, label: "7:00" },
          { value: 7.5, label: "7:30" },
          { value: 8, label: "8:00" },
          { value: 8.5, label: "8:30" },
          { value: 9, label: "9:00" },
        ]}
        xDomain={[6.75, 9.15]}
        yDomain={[0, 48]}
        data={[
          { x: 7, y: 21 },
          { x: 7.05, y: 22 },
          { x: 7.15, y: 20 },
          { x: 7.25, y: 24 },
          { x: 7.3, y: 23 },
          { x: 7.4, y: 27 },
          { x: 7.45, y: 25 },
          { x: 7.5, y: 29 },
          { x: 7.6, y: 28 },
          { x: 7.7, y: 35 },
          { x: 7.8, y: 31 },
          { x: 7.9, y: 38 },
          { x: 8, y: 34 },
          { x: 8.1, y: 42 },
        ]}
        note="Leaving after 7:45 reliably costs 10–15 minutes. The relationship is noisy, but the direction is clear: the later the departure, the more the city has already woken up."
      />

      <HBarChart
        title="The usual suspects"
        sub="Minutes lost, by cause, over the month"
        unit="MINUTES LOST"
        highlight="Traffic"
        data={[
          { label: "Traffic", value: 112 },
          { label: "Red lights", value: 74 },
          { label: "Rain", value: 51 },
          { label: "Lift queue", value: 38 },
          { label: "Coffee queue", value: 26 },
        ]}
        note="Traffic and red lights account for nearly two-thirds of the lost time. The coffee queue is small, which is the only result in this notebook I refuse to accept."
      />
    </TopicPage>
  );
}
