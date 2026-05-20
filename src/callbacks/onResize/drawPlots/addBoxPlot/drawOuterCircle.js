export default function drawOuterCircle(subgroup) {
    subgroup.boxplot.container
        .append('circle')
        .attr({
            class: 'boxplot mean',
            cx: subgroup.boxplot.x(0.5),
            cy: subgroup.boxplot.y(subgroup.results.mean),
            r: Math.min(subgroup.boxplot.x(subgroup.boxplot.boxPlotWidth / 3), 10)
        })
        .style({
            fill: subgroup.boxplot.boxInsideColor,
            stroke: subgroup.boxplot.boxColor
        });
}
