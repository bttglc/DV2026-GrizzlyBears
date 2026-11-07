import { useLayoutEffect, useRef } from "preact/hooks";
import * as d3 from "d3";
import { ChartShell } from "./ChartShell";
import {
  addTopLabels,
  addXAxis,
  alpha,
  chartFrame,
  ink,
  muted,
  niceValue,
} from "./primitives";

/** Horizontal ranked bars: long category labels, values out at the tip. */
export function HBarChart({ topic, index, ...spec }) {
  return (
    <ChartShell spec={spec} topic={topic} index={index}>
      {({ chart, width, height, animate }) => (
        <HBarMarks
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

function HBarMarks({ chart, topic, width, height, animate }) {
  const layerRef = useRef(null);

  useLayoutEffect(() => {
    const layer = d3.select(layerRef.current);
    layer.selectAll("*").remove();
    drawHBar(layer, chart, topic, width, height, animate);
  }, [chart, topic, width, height, animate]);

  return (
    <svg {...chartFrame(chart, width, height)}>
      <g ref={layerRef} />
    </svg>
  );
}

function drawHBar(svg, chart, topic, width, height, animate) {
  const compact = width < 380;
  const longest = d3.max(chart.data, (d) => d.label.length);
  const left = Math.min(
    Math.max(compact ? 86 : 102, longest * (compact ? 7.9 : 8.6) + 16),
    Math.min(compact ? 128 : 168, width * 0.42),
  );
  const margin = {
    top: compact ? 46 : 50,
    right: compact ? 44 : 60,
    bottom: compact ? 38 : 42,
  };
  const right = width - margin.right;
  const top = margin.top;
  const bottom = height - margin.bottom;
  const accent = topic.accent;
  const maxValue = d3.max(chart.data, (d) => d.value);
  const x = d3
    .scaleLinear()
    .domain([0, maxValue * 1.18])
    .nice(3)
    .range([left, right]);
  const y = d3
    .scaleBand()
    .domain(chart.data.map((d) => d.label))
    .range([top, bottom])
    .paddingInner(0.33)
    .paddingOuter(0.08);

  addTopLabels(svg, chart, 18);

  const ticks = x.ticks(3);

  svg
    .append("g")
    .selectAll("line")
    .data(ticks)
    .join("line")
    .attr("class", "grid-line")
    .attr("x1", (d) => x(d))
    .attr("x2", (d) => x(d))
    .attr("y1", top)
    .attr("y2", bottom);

  addXAxis(svg, ticks, (value) => x(value), bottom, {
    compact,
    mono: true,
    fontSize: compact ? 11.5 : 12,
    labelOffset: compact ? 19 : 21,
    label: (value) => niceValue(value),
  });

  const bars = svg
    .append("g")
    .attr("class", "rough")
    .selectAll("rect")
    .data(chart.data)
    .join("rect")
    .attr("class", "bar-mark")
    .attr("x", left)
    .attr("y", (d) => y(d.label))
    .attr("height", y.bandwidth())
    .attr("width", animate ? 0 : (d) => x(d.value) - left)
    .attr("rx", 3)
    .attr("fill", (d) =>
      d.label === chart.highlight ? accent : alpha(accent, 0.5),
    )
    .attr("stroke", (d) =>
      d.label === chart.highlight ? alpha(ink, 0.55) : "none",
    )
    .attr("stroke-width", 0.8);

  bars.append("title").text((d) => d.label + ": " + niceValue(d.value));

  svg
    .append("g")
    .selectAll("text")
    .data(chart.data)
    .join("text")
    .attr("class", "axis-text")
    .attr("x", left - 12)
    .attr("y", (d) => y(d.label) + y.bandwidth() / 2 + 5)
    .attr("text-anchor", "end")
    .attr("font-size", compact ? 14.5 : 16)
    .text((d) => d.label);

  const values = svg
    .append("g")
    .selectAll("text")
    .data(chart.data)
    .join("text")
    .attr("class", "axis-text mono-text")
    .attr("x", (d) => (animate ? left : x(d.value)) + 7)
    .attr("y", (d) => y(d.label) + y.bandwidth() / 2 + 4.5)
    .attr("font-size", compact ? 12 : 12.5)
    .attr("fill", muted)
    .attr("opacity", animate ? 0 : 1)
    .text((d) => niceValue(d.value));

  if (animate) {
    bars
      .transition()
      .duration(720)
      .delay((d, i) => i * 65)
      .ease(d3.easeCubicOut)
      .attr("width", (d) => x(d.value) - left);

    values
      .transition()
      .delay((d, i) => 250 + i * 65)
      .duration(300)
      .attr("x", (d) => x(d.value) + 6)
      .attr("opacity", 1);
  }
}
