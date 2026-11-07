import { TopicPage } from "../components/TopicPage";
import { BarChart } from "../components/charts/BarChart";
import { LineChart } from "../components/charts/LineChart";
import { DonutChart } from "../components/charts/DonutChart";
import { ScatterChart } from "../components/charts/ScatterChart";
import { HBarChart } from "../components/charts/HBarChart";

export const topic = {
  id: "garden",
  nav: "Garden",
  title: "Notes from a Tiny Garden",
  lede: "The tomato plants do not care about my spreadsheet. They are, however, the only participants in this study that produced anything edible.",
  accent: "#5d7a4e",
  palette: ["#5d7a4e", "#91a66d", "#c9b06b", "#b36b4e", "#7d9c93"]
};

export function GardenPage() {
  return (
    <TopicPage topic={topic}>
      <BarChart
        title="Things that sprouted"
        sub="Cumulative seedlings, by week"
        unit="SEEDLINGS"
        highlight="W5"
        data={[
          { label: "W1", value: 0 },
          { label: "W2", value: 3 },
          { label: "W3", value: 7 },
          { label: "W4", value: 11 },
          { label: "W5", value: 14 },
          { label: "W6", value: 15 },
          { label: "W7", value: 15 },
        ]}
        note="Nothing happened for a week, and then everything happened at once. Fourteen seedlings made it above soil by week five; the fifteenth is still thinking about it."
      />

      <LineChart
        title="The ambitious tomatoes"
        sub="Plant height in centimetres, two varieties"
        unit="HEIGHT (CM)"
        x={["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"]}
        series={[
          { name: "Cherry", values: [2, 7, 15, 24, 38, 52, 66, 74], color: "accent" },
          { name: "Beefsteak", values: [2, 5, 11, 19, 28, 36, 43, 49], color: "muted" },
        ]}
        note="The cherry tomato doubled the beefsteak from week four onward. Both plants remain unimpressed by the chart, the ruler, or me."
      />

      <DonutChart
        title="What the balcony gave back"
        sub="Share of the 4.2 kg harvest"
        unit="SHARE OF HARVEST"
        center={{ value: "4.2", label: "kg harvested" }}
        data={[
          { label: "Tomatoes", value: 36 },
          { label: "Herbs", value: 28 },
          { label: "Lettuce", value: 22 },
          { label: "Peppers", value: 14 },
        ]}
        note="Tomatoes and herbs made up nearly two-thirds of the harvest. The lettuce is included despite being eaten on the balcony, directly from the pot."
      />

      <ScatterChart
        title="Sunlight vs. leaves"
        sub="12 plants · hours of sun vs. leaf pairs"
        unit="LEAF PAIRS"
        xLabel="hours of sun"
        xTicks={[
          { value: 2, label: "2h" },
          { value: 3, label: "3h" },
          { value: 4, label: "4h" },
          { value: 5, label: "5h" },
          { value: 6, label: "6h" },
          { value: 7, label: "7h" },
        ]}
        xDomain={[1.5, 7.4]}
        yDomain={[0, 18]}
        data={[
          { x: 2, y: 4 },
          { x: 2.4, y: 6 },
          { x: 2.8, y: 5 },
          { x: 3.2, y: 8 },
          { x: 3.6, y: 7 },
          { x: 4, y: 10 },
          { x: 4.4, y: 9 },
          { x: 4.8, y: 12 },
          { x: 5.2, y: 11 },
          { x: 5.6, y: 14 },
          { x: 6, y: 13 },
          { x: 6.4, y: 16 },
        ]}
        note="Plants with more sun generally had more leaves, with one dramatic exception in the shade. Correlation on a balcony is mostly a story about who gets the good corner."
      />

      <HBarChart
        title="The thirstiest pots"
        sub="Litres of water over twelve weeks"
        unit="LITRES"
        highlight="Tomatoes"
        data={[
          { label: "Tomatoes", value: 34 },
          { label: "Zucchini", value: 27 },
          { label: "Basil", value: 19 },
          { label: "Mint", value: 16 },
          { label: "Succulent", value: 2 },
        ]}
        note="The tomatoes drank 34 litres, which is more than the rest of the pots combined. The succulent had two litres and used one of them to judge me."
      />
    </TopicPage>
  );
}
