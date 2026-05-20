export default function drawRightSide(subgroup) {
    subgroup.violinPlot.gPlus = subgroup.violinPlot.container
        .append('g')
        .attr('transform', 'rotate(90,0,0) translate(0,-' + subgroup.violinPlot.width + ')');
    subgroup.violinPlot.gPlus
        .append('path')
        .datum(subgroup.violinPlot.data)
        .attr({
            class: 'area',
            d: subgroup.violinPlot.area,
            fill: this.colorScale(subgroup.key),
            'fill-opacity': 0.75
        });
    subgroup.violinPlot.gPlus
        .append('path')
        .datum(subgroup.violinPlot.data)
        .attr({
            class: 'violin',
            d: subgroup.violinPlot.line,
            stroke: this.colorScale(subgroup.key),
            fill: 'none'
        });
}
