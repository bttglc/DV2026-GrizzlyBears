import { useLayoutEffect, useRef } from "preact/hooks";
import * as d3 from "d3";
import { ChartShell } from "./ChartShell";
import { addTopLabels, chartFrame, ink, muted, paper } from "./primitives";

/** Donut with a centre note and a value legend on the right. */
export function DonutChart({ topic, index, ...spec }) {
  return (
    <ChartShell spec={spec} topic={topic} index={index}>
      {({ chart, width, height, animate }) => (
        <DonutMarks
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

function DonutMarks({ chart, topic, width, height, animate }) {
  const layerRef = useRef(null);

  useLayoutEffect(() => {
    const layer = d3.select(layerRef.current);
    layer.selectAll("*").remove();
    drawDonut(layer, chart, topic, width, height, animate);
  }, [chart, topic, width, height, animate]);

  return (
    <svg {...chartFrame(chart, width, height)}>
      <g ref={layerRef} />
    </svg>
  );
}

function drawDonut(svg, chart, topic, width, height, animate) {
  const compact = width < 380;
  const outer = compact
    ? Math.min(width * 0.2, height * 0.3, 62)
    : Math.min(width * 0.185, height * 0.3, 92);
  const cx = compact ? width * 0.29 : width * 0.285;
  const cy = height * 0.53;
  const inner = outer * 0.56;
  const legendX = Math.max(cx + outer + (compact ? 26 : 40), width * 0.52);
  const rowHeight = compact ? 30 : Math.min(38, height * 0.11);
  const legendStart = cy - ((chart.data.length - 1) * rowHeight) / 2;

  addTopLabels(svg, chart, compact ? 14 : 18);

  const pie = d3
    .pie()
    .value((d) => d.value)
    .sort(null)
    .padAngle(0.026);
  const arcs = pie(chart.data);
  const arc = d3
    .arc()
    .innerRadius(inner)
    .outerRadius(outer)
    .cornerRadius(4)
    .padAngle(0.026);

  const paths = svg
    .append("g")
    .attr("transform", `translate(${cx}, ${cy})`)
    .selectAll("path")
    .data(arcs)
    .join("path")
    .attr("class", "slice")
    .attr("fill", (d, i) => topic.palette[i % topic.palette.length])
    .attr("stroke", paper)
    .attr("stroke-width", 1.4)
    .attr("d", arc);

  paths.append("title").text((d) => d.data.label + ": " + d.data.value + "%");

  if (animate) {
    paths.each(function (d) {
      const path = d3.select(this);
      path.attr("opacity", 0.3);
      path
        .attr("d", arc({ ...d, endAngle: d.startAngle }))
        .transition()
        .duration(680)
        .delay((d, i) => i * 75)
        .ease(d3.easeCubicOut)
        .attrTween("d", () => {
          const interpolate = d3.interpolate(d.startAngle, d.endAngle);
          return (t) => arc({ ...d, endAngle: interpolate(t) });
        })
        .attr("opacity", 1);
    });
  }

  // Centre note.
  const centre = svg.append("g").attr("opacity", animate ? 0 : 1);
  centre
    .append("text")
    .attr("x", cx)
    .attr("y", cy + (compact ? 4 : 7))
    .attr("text-anchor", "middle")
    .style("font-family", "var(--font-hand)")
    .style("font-size", (compact ? 32 : 40) + "px")
    .style("font-weight", 700)
    .style("fill", ink)
    .text(chart.center.value);

  centre
    .append("text")
    .attr("x", cx)
    .attr("y", cy + (compact ? 19 : 26))
    .attr("text-anchor", "middle")
    .style("font-family", "var(--font-mono)")
    .style("font-size", compact ? "11px" : "12px")
    .style("letter-spacing", "0.1em")
    .style("text-transform", "uppercase")
    .style("fill", muted)
    .text(chart.center.label);

  if (animate) {
    centre.transition().delay(330).duration(320).attr("opacity", 1);
  }

  // Legend.
  const legend = svg.append("g").attr("opacity", animate ? 0 : 1);

  chart.data.forEach((item, index) => {
    const y = legendStart + index * rowHeight;

    legend
      .append("circle")
      .attr("cx", legendX)
      .attr("cy", y)
      .attr("r", compact ? 4.2 : 4.8)
      .attr("fill", topic.palette[index % topic.palette.length]);

    legend
      .append("text")
      .attr("class", "axis-text")
      .attr("x", legendX + (compact ? 11 : 14))
      .attr("y", y + 4)
      .attr("font-size", compact ? 15 : 17)
      .text(item.label);

    legend
      .append("text")
      .attr("class", "axis-text mono-text")
      .attr("x", width - (compact ? 12 : 18))
      .attr("y", y + 3.5)
      .attr("text-anchor", "end")
      .attr("font-size", compact ? 12 : 13)
      .attr("fill", muted)
      .text(item.value + "%");
  });

  if (animate) {
    legend.transition().delay(250).duration(420).attr("opacity", 1);
  }
}
