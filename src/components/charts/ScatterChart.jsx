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
  niceValue,
} from "./primitives";

/** Scatter with a least-squares trend line, drawn as a dashed pencil stroke. */
export function ScatterChart({ topic, index, ...spec }) {
  return (
    <ChartShell spec={spec} topic={topic} index={index}>
      {({ chart, width, height, animate }) => (
        <ScatterMarks
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

function ScatterMarks({ chart, topic, width, height, animate }) {
  const layerRef = useRef(null);

  useLayoutEffect(() => {
    const layer = d3.select(layerRef.current);
    layer.selectAll("*").remove();
    drawScatter(layer, chart, topic, width, height, animate);
  }, [chart, topic, width, height, animate]);

  return (
    <svg {...chartFrame(chart, width, height)}>
      <g ref={layerRef} />
    </svg>
  );
}

function drawScatter(svg, chart, topic, width, height, animate) {
  const compact = width < 380;
  const margin = {
    top: compact ? 45 : 48,
    right: compact ? 14 : 20,
    bottom: compact ? 52 : 56,
    left: compact ? 48 : 57,
  };
  const left = margin.left;
  const right = width - margin.right;
  const top = margin.top;
  const bottom = height - margin.bottom;
  const accent = topic.accent;
  const xExtent = d3.extent(chart.data, (d) => d.x);
  const yExtent = d3.extent(chart.data, (d) => d.y);
  const xDomain = chart.xDomain || [
    xExtent[0] - (xExtent[1] - xExtent[0]) * 0.06,
    xExtent[1] + (xExtent[1] - xExtent[0]) * 0.06,
  ];
  const yDomain = chart.yDomain || [
    0,
    yExtent[1] + (yExtent[1] - yExtent[0]) * 0.12,
  ];

  const x = d3.scaleLinear().domain(xDomain).range([left, right]);
  const y = d3.scaleLinear().domain(yDomain).range([bottom, top]);

  addTopLabels(svg, chart, left);

  const yTicks = y.ticks(4);
  addYAxis(svg, {
    ticks: yTicks,
    y,
    left,
    right,
    top,
    bottom,
    compact,
  });

  const xTicks =
    chart.xTicks ||
    x.ticks(4).map((value) => ({ value, label: niceValue(value) }));

  addXAxis(svg, xTicks, (tick) => x(tick.value), bottom, {
    compact,
    mono: true,
    fontSize: compact ? 12 : 12.5,
    label: (tick) => tick.label,
  });

  if (chart.xLabel) {
    svg
      .append("text")
      .attr("x", right)
      .attr("y", height - (compact ? 4 : 6))
      .attr("text-anchor", "end")
      .style("font-family", "var(--font-mono)")
      .style("font-size", compact ? "11px" : "12px")
      .style("letter-spacing", "0.08em")
      .style("text-transform", "uppercase")
      .style("fill", "#8a8d80")
      .text(chart.xLabel);
  }

  // Least-squares trend, drawn as a dashed pencil line.
  const meanX = d3.mean(chart.data, (d) => d.x);
  const meanY = d3.mean(chart.data, (d) => d.y);
  const denominator = d3.sum(chart.data, (d) => (d.x - meanX) ** 2);

  if (denominator > 0) {
    const slope =
      d3.sum(chart.data, (d) => (d.x - meanX) * (d.y - meanY)) / denominator;
    const intercept = meanY - slope * meanX;
    const [x0, x1] = x.domain();

    svg
      .append("line")
      .attr("class", "trend-line rough")
      .attr("x1", x(x0))
      .attr("y1", y(intercept + slope * x0))
      .attr("x2", x(x1))
      .attr("y2", y(intercept + slope * x1))
      .attr("stroke", alpha(ink, 0.4))
      .attr("stroke-width", 1.4)
      .attr("stroke-dasharray", "5 5")
      .attr("stroke-linecap", "round");
  }

  const dots = svg
    .append("g")
    .selectAll("circle")
    .data(chart.data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", (d) => x(d.x))
    .attr("cy", (d) => y(d.y))
    .attr("r", animate ? 0 : compact ? 3.8 : 4.5)
    .attr("fill", alpha(accent, 0.58))
    .attr("stroke", alpha(ink, 0.52))
    .attr("stroke-width", 0.8);

  dots
    .append("title")
    .text(
      (d) =>
        chart.xLabel +
        ": " +
        niceValue(d.x) +
        " · " +
        chart.unit +
        ": " +
        niceValue(d.y),
    );

  if (animate) {
    dots
      .transition()
      .delay((d, i) => i * 22)
      .duration(280)
      .ease(d3.easeBackOut.overshoot(1.4))
      .attr("r", compact ? 3.8 : 4.5);
  }
}
