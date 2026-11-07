/*
 * Shared D3 helpers for the hand-drawn charts.
 *
 * Colour constants live here so every chart type draws the same ink, and the
 * axis furniture (grid, ticks, baselines) is generated in one place instead of
 * five. Each chart component imports what it needs and appends to the <g> layer
 * it owns inside its own <svg>.
 */
import * as d3 from "d3";
// d3 is marked side-effect-free, so production tree-shaking can otherwise drop
// the prototype augmentation that powers selection.transition().
import "d3-transition";

export const ink = "#3c423a";
export const muted = "#6c7368";
export const paper = "#fffdf6";

const mutedSeries = "#5f6d68";
const fmt = d3.format("~g");

export function alpha(color, value) {
  const parsed = d3.color(color);
  return parsed ? parsed.copy({ opacity: value }).formatRgb() : color;
}

export function niceValue(value) {
  if (value === null || value === undefined) return "";
  return Number.isInteger(value) ? String(value) : fmt(value);
}

/** Props shared by every chart <svg>: sized by its container, labelled for AT. */
export function chartFrame(chart, width, height) {
  return {
    class: "chart-svg",
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    height: "100%",
    role: "img",
    "aria-label": chart.title + ". " + chart.note,
    focusable: "false",
  };
}

export function addTopLabels(svg, chart, left) {
  svg
    .append("text")
    .attr("class", "chart-unit")
    .attr("x", left)
    .attr("y", 16)
    .text(chart.unit || "");
}

function addYGrid(svg, ticks, y, left, right) {
  svg
    .append("g")
    .selectAll("line")
    .data(ticks)
    .join("line")
    .attr("class", "grid-line")
    .attr("x1", left)
    .attr("x2", right)
    .attr("y1", (d) => y(d))
    .attr("y2", (d) => y(d));
}

function addYLabels(svg, ticks, y, left, compact) {
  svg
    .append("g")
    .selectAll("text")
    .data(ticks)
    .join("text")
    .attr("class", "axis-text mono-text")
    .attr("x", left - (compact ? 6 : 8))
    .attr("y", (d) => y(d) + 3)
    .attr("text-anchor", "end")
    .attr("font-size", compact ? 12 : 12.5)
    .text((d) => niceValue(d));
}

function addAxisBaseline(svg, left, right, y) {
  svg
    .append("line")
    .attr("class", "axis-line rough")
    .attr("x1", left)
    .attr("x2", right)
    .attr("y1", y)
    .attr("y2", y);
}

function addUnitAxis(svg, x, top, bottom) {
  svg
    .append("line")
    .attr("class", "axis-line rough")
    .attr("x1", x)
    .attr("x2", x)
    .attr("y1", top)
    .attr("y2", bottom);
}

/** The shared y furniture: grid, value labels, baseline and unit axis. */
export function addYAxis(svg, { ticks, y, left, right, top, bottom, compact }) {
  addYGrid(svg, ticks, y, left, right);
  addYLabels(svg, ticks, y, left, compact);
  addAxisBaseline(svg, left, right, bottom);
  addUnitAxis(svg, left, top, bottom);
}

/** X tick marks and their labels, centred under each tick position. */
export function addXAxis(
  svg,
  ticks,
  position,
  bottom,
  {
    compact = false,
    mono = false,
    fontSize,
    labelOffset,
    label = (tick) => tick,
  } = {}
) {
  svg
    .append("g")
    .selectAll("line")
    .data(ticks)
    .join("line")
    .attr("x1", position)
    .attr("x2", position)
    .attr("y1", bottom)
    .attr("y2", bottom + 4)
    .attr("stroke", ink)
    .attr("stroke-width", 0.9);

  svg
    .append("g")
    .selectAll("text")
    .data(ticks)
    .join("text")
    .attr("class", mono ? "axis-text mono-text" : "axis-text")
    .attr("x", position)
    .attr("y", bottom + (labelOffset ?? (compact ? 19 : 22)))
    .attr("text-anchor", "middle")
    .attr("font-size", fontSize ?? (compact ? 12.5 : 14))
    .text(label);
}

export function seriesColor(series, topic, index) {
  if (series.color === "accent") return topic.accent;
  if (series.color === "muted") return mutedSeries;
  if (series.color) return series.color;
  return topic.palette[index % topic.palette.length];
}
