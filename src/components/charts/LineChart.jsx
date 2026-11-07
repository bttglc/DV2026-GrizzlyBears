import { useLayoutEffect, useRef } from "preact/hooks";
import * as d3 from "d3";
import { ChartShell } from "./ChartShell";
import {
  addTopLabels,
  addXAxis,
  addYAxis,
  alpha,
  chartFrame,
  niceValue,
  paper,
  seriesColor,
} from "./primitives";

// Clip-path ids must be unique per mounted chart.
let clipCounter = 0;

/** Line chart with an optional area fill and a dashed comparison series. */
export function LineChart({ topic, index, ...spec }) {
  return (
    <ChartShell spec={spec} topic={topic} index={index}>
      {({ chart, width, height, animate }) => (
        <LineMarks
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

function LineMarks({ chart, topic, width, height, animate }) {
  const layerRef = useRef(null);

  useLayoutEffect(() => {
    const layer = d3.select(layerRef.current);
    layer.selectAll("*").remove();
    drawLine(layer, chart, topic, width, height, animate);
  }, [chart, topic, width, height, animate]);

  return (
    <svg {...chartFrame(chart, width, height)}>
      <g ref={layerRef} />
    </svg>
  );
}

function drawLine(svg, chart, topic, width, height, animate) {
  const compact = width < 380;
  const hasLegend = chart.series.length > 1;
  const margin = {
    top: compact ? (hasLegend ? 59 : 45) : hasLegend ? 65 : 49,
    right: compact ? 14 : 20,
    bottom: compact ? 41 : 45,
    left: compact ? 44 : 52,
  };
  const left = margin.left;
  const right = width - margin.right;
  const top = margin.top;
  const bottom = height - margin.bottom;
  const iw = right - left;
  const ih = bottom - top;
  const allValues = chart.series.flatMap((series) => series.values);
  const yMax = d3.max(allValues) * 1.16 || 1;
  const y = d3.scaleLinear().domain([0, yMax]).nice(4).range([bottom, top]);
  const x = d3
    .scalePoint()
    .domain(chart.x)
    .range([left + 4, right - 4])
    .padding(0.2);

  addTopLabels(svg, chart, left);

  const ticks = y.ticks(4);
  addYAxis(svg, { ticks, y, left, right, top, bottom, compact });

  addXAxis(svg, chart.x, (label) => x(label), bottom, { compact });

  if (hasLegend) {
    const legend = svg
      .append("g")
      .attr("transform", `translate(${left}, ${compact ? 47 : 39})`);
    let offset = 0;

    chart.series.forEach((series, index) => {
      const color = seriesColor(series, topic, index);

      legend
        .append("line")
        .attr("x1", offset)
        .attr("x2", offset + 15)
        .attr("y1", 0)
        .attr("y2", 0)
        .attr("stroke", color)
        .attr("stroke-width", 2.6)
        .attr("stroke-linecap", "round")
        .attr("stroke-dasharray", index === 1 ? "4 3" : null);

      legend
        .append("text")
        .attr("class", "axis-text")
        .attr("x", offset + 21)
        .attr("y", 3.5)
        .attr("font-size", compact ? 13.5 : 15)
        .text(series.name);

      offset += 31 + series.name.length * (compact ? 6.5 : 7.4);
    });
  }

  // Animate the marks by growing a clip rectangle from left to right.
  const clipId = "line-clip-" + ++clipCounter;
  const clipRect = svg
    .append("defs")
    .append("clipPath")
    .attr("id", clipId)
    .append("rect")
    .attr("x", left - 3)
    .attr("y", top - 8)
    .attr("width", animate ? 0 : iw + 8)
    .attr("height", ih + 18);

  const clipped = svg.append("g").attr("clip-path", `url(#${clipId})`);

  const line = d3
    .line()
    .x((d) => x(d.label))
    .y((d) => y(d.value))
    .curve(d3.curveCatmullRom.alpha(0.5));

  chart.series.forEach((series, index) => {
    const color = seriesColor(series, topic, index);
    const points = chart.x.map((label, i) => ({
      label,
      value: series.values[i],
    }));

    if (index === 0 && chart.area) {
      const area = d3
        .area()
        .x((d) => x(d.label))
        .y0(bottom)
        .y1((d) => y(d.value))
        .curve(d3.curveCatmullRom.alpha(0.5));

      clipped
        .append("path")
        .datum(points)
        .attr("d", area)
        .attr("fill", alpha(color, 0.13))
        .attr("stroke", "none");
    }

    clipped
      .append("path")
      .datum(points)
      .attr("class", "rough")
      .attr("d", line)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", index === 0 ? 2.6 : 2.1)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("stroke-dasharray", index === 1 ? "5 4" : null);
  });

  const dots = svg.append("g");

  chart.series.forEach((series, index) => {
    const color = seriesColor(series, topic, index);
    const points = chart.x.map((label, i) => ({
      label,
      value: series.values[i],
    }));

    dots
      .selectAll("circle.series-" + index)
      .data(points)
      .join("circle")
      .attr("class", "dot")
      .attr("cx", (d) => x(d.label))
      .attr("cy", (d) => y(d.value))
      .attr("r", animate ? 0 : compact ? 3.1 : 3.6)
      .attr("fill", paper)
      .attr("stroke", color)
      .attr("stroke-width", 2)
      .append("title")
      .text((d) => series.name + " · " + d.label + ": " + niceValue(d.value));
  });

  if (animate) {
    clipRect
      .transition()
      .duration(900)
      .ease(d3.easeCubicOut)
      .attr("width", iw + 8);

    dots
      .selectAll("circle")
      .transition()
      .delay((d, i) => 340 + i * 32)
      .duration(260)
      .attr("r", compact ? 3.1 : 3.6);
  }
}
