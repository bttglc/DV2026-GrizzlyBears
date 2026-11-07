import { TopicPage } from "../components/TopicPage";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { DonutChart } from "../components/charts/DonutChart";
import { ScatterChart } from "../components/charts/ScatterChart";
import { HBarChart } from "../components/charts/HBarChart";

export const topic = {
  id: "weather",
  nav: "Weather",
  title: "Weather, Mostly",
  lede: "A summer of writing down the sky and my mood, then drawing both until they looked related. They are. Sort of.",
  accent: "#b68a2e",
  palette: ["#b68a2e", "#d8b75c", "#7f9aa5", "#9b7660", "#b5a482"]
};

export function WeatherPage() {
  return (
    <TopicPage topic={topic}>
      <BarChart
        title="Mood by forecast"
        sub="Average mood score, 1–10, by weather"
        unit="MOOD / 10"
        highlight="Sun"
        data={[
          { label: "Sun", value: 8.4 },
          { label: "Partly", value: 7.8 },
          { label: "Cloud", value: 6.9 },
          { label: "Rain", value: 6.2 },
          { label: "Storm", value: 5.4 },
        ]}
        note="Sunny days average 8.4 out of 10; storms average 5.4. This is not a complicated finding, but it is nice to have the receipts."
      />

      <LineChart
        title="Sunshine vs. mood"
        sub="Weekly averages, rescaled to 1–10"
        unit="WEEKLY SCORE"
        x={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]}
        series={[
          { name: "Sunshine", values: [5, 6, 4, 7, 8, 6, 9, 7], color: "accent" },
          { name: "Mood", values: [6, 6.5, 5.5, 7, 8.2, 6.8, 8.5, 7.4], color: "muted" },
        ]}
        note="Sunshine and mood rise and fall together for most of the season. Week seven breaks the pattern, perhaps because holidays are their own kind of weather."
      />

      <DonutChart
        title="A season in weather"
        sub="92 days by dominant sky"
        unit="DAYS RECORDED"
        center={{ value: "92", label: "days recorded" }}
        data={[
          { label: "Cloudy", value: 34 },
          { label: "Sunny", value: 28 },
          { label: "Rain", value: 20 },
          { label: "Weird", value: 10 },
        ]}
        note="Cloudy days were the most common, which feels right for a study that was mostly conducted from a window. “Weird” includes one day of simultaneous sun and hail."
      />

      <ScatterChart
        title="Temperature vs. mood"
        sub="30 days · afternoon °C vs. mood score"
        unit="MOOD / 10"
        xLabel="afternoon °C"
        xTicks={[
          { value: 12, label: "12°" },
          { value: 16, label: "16°" },
          { value: 20, label: "20°" },
          { value: 24, label: "24°" },
          { value: 28, label: "28°" },
          { value: 32, label: "32°" },
        ]}
        xDomain={[10, 34]}
        yDomain={[2, 10]}
        data={[
          { x: 11, y: 4.5 },
          { x: 12, y: 5 },
          { x: 13, y: 4.8 },
          { x: 14, y: 5.4 },
          { x: 15, y: 6 },
          { x: 16, y: 5.6 },
          { x: 17, y: 6.2 },
          { x: 18, y: 6.8 },
          { x: 19, y: 6.4 },
          { x: 20, y: 7.1 },
          { x: 21, y: 6.9 },
          { x: 22, y: 7.4 },
          { x: 23, y: 7.8 },
          { x: 24, y: 7.2 },
          { x: 25, y: 8.1 },
          { x: 26, y: 7.9 },
          { x: 27, y: 8.4 },
          { x: 28, y: 8 },
          { x: 29, y: 8.6 },
          { x: 30, y: 8.2 },
          { x: 31, y: 7.6 },
          { x: 32, y: 7.9 },
          { x: 33, y: 7.2 },
          { x: 10.5, y: 4.2 },
          { x: 19.5, y: 6 },
          { x: 22.5, y: 7 },
          { x: 24.5, y: 6.6 },
          { x: 26.5, y: 7.3 },
          { x: 28.5, y: 7.1 },
          { x: 30.5, y: 6.8 },
        ]}
        note="Warmer afternoons trend toward better moods, but the spread is generous. A 28°C day can still be a 4 if the trains are broken."
      />

      <HBarChart
        title="What I did about it"
        sub="Recorded responses to bad weather"
        unit="TIMES"
        highlight="Walked"
        data={[
          { label: "Walked", value: 31 },
          { label: "Cooked", value: 18 },
          { label: "Napped", value: 14 },
          { label: "Complained", value: 11 },
          { label: "Puddle-jumped", value: 4 },
        ]}
        note="Walking was the most common response to bad weather, followed by cooking. Complaining ranks fourth, which is lower than I would have guessed."
      />
    </TopicPage>
  );
}
