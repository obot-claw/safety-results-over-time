export default function drawInnerCircle(subgroup) {
    subgroup.boxplot.container
        .append('circle')
        .attr({
            class: 'boxplot mean',
            cx: subgroup.boxplot.x(0.5),
            cy: subgroup.boxplot.y(subgroup.results.mean),
            r: Math.min(subgroup.boxplot.x(subgroup.boxplot.boxPlotWidth / 6), 5)
        })
        .style({
            fill: subgroup.boxplot.boxColor,
            stroke: 'none'
        });
}
