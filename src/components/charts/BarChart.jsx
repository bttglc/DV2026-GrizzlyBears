import { useLayoutEffect, useRef } from "preact/hooks";
import * as d3 from "d3";
import { ChartShell } from "./ChartShell";
import {
  addTopLabels,
  addXAxis,
  addYAxis,
  alpha,
  chartFrame,
  ink,
  muted,
  niceValue,
} from "./primitives";

/** Vertical bars, one per category, with a highlighted bar. */
export function BarChart({ topic, index, ...spec }) {
  return (
    <ChartShell spec={spec} topic={topic} index={index}>
      {({ chart, width, height, animate }) => (
        <BarMarks
          chart={chart}
          topic={topic}
          width={width}
          height={height}
          animate={animate}
        />
      )}
    </ChartShell>
  );
}

function BarMarks({ chart, topic, width, height, animate }) {
  const layerRef = useRef(null);

  useLayoutEffect(() => {
    const layer = d3.select(layerRef.current);
    layer.selectAll("*").remove();
    drawBar(layer, chart, topic, width, height, animate);
  }, [chart, topic, width, height, animate]);

  return (
    <svg {...chartFrame(chart, width, height)}>
      <g ref={layerRef} />
    </svg>
  );
}

function drawBar(svg, chart, topic, width, height, animate) {
  const compact = width < 380;
  const margin = {
    top: compact ? 44 : 47,
    right: compact ? 14 : 20,
    bottom: compact ? 40 : 44,
    left: compact ? 44 : 53,
  };
  const left = margin.left;
  const right = width - margin.right;
  const top = margin.top;
  const bottom = height - margin.bottom;
  const accent = topic.accent;
  const values = chart.data.map((d) => d.value);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(values) * 1.18])
    .nice(4)
    .range([bottom, top]);
  const x = d3
    .scaleBand()
    .domain(chart.data.map((d) => d.label))
    .range([left, right])
    .paddingInner(0.38)
    .paddingOuter(0.12);

  addTopLabels(svg, chart, left);

  const ticks = y.ticks(4);
  addYAxis(svg, { ticks, y, left, right, top, bottom, compact });

  addXAxis(
    svg,
    chart.data.map((d) => d.label),
    (label) => x(label) + x.bandwidth() / 2,
    bottom,
    { compact, fontSize: compact ? 13.5 : 15, labelOffset: compact ? 18 : 21 },
  );

  const bars = svg
    .append("g")
    .attr("class", "rough")
    .selectAll("rect")
    .data(chart.data)
    .join("rect")
    .attr("class", "bar-mark")
    .attr("x", (d) => x(d.label))
    .attr("width", x.bandwidth())
    .attr("rx", 3)
    .attr("fill", (d) =>
      d.label === chart.highlight ? accent : alpha(accent, 0.48),
    )
    .attr("stroke", (d) =>
      d.label === chart.highlight ? alpha(ink, 0.55) : "none",
    )
    .attr("stroke-width", 0.8)
    .attr("y", (d) => (animate ? bottom : y(d.value)))
    .attr("height", (d) => (animate ? 0 : bottom - y(d.value)));

  bars.append("title").text((d) => d.label + ": " + niceValue(d.value));

  const valueLabels = svg
    .append("g")
    .selectAll("text")
    .data(chart.data)
    .join("text")
    .attr("class", "axis-text")
    .attr("x", (d) => x(d.label) + x.bandwidth() / 2)
    .attr("y", (d) => y(d.value) - (compact ? 5 : 6))
    .attr("text-anchor", "middle")
    .attr("font-size", compact ? 12.5 : 14)
    .attr("fill", muted)
    .attr("opacity", animate ? 0 : 1)
    .text((d) => niceValue(d.value));

  if (animate) {
    bars
      .transition()
      .duration(640)
      .delay((d, i) => i * 55)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => bottom - y(d.value));

    valueLabels
      .transition()
      .delay((d, i) => 220 + i * 55)
      .duration(320)
      .attr("opacity", 1);
  }
}
