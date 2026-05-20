export default function drawLeftSide(subgroup) {
    subgroup.violinPlot.gMinus = subgroup.violinPlot.container
        .append('g')
        .attr('transform', 'rotate(90,0,0) scale(1,-1)');
    subgroup.violinPlot.gMinus
        .append('path')
        .datum(subgroup.violinPlot.data)
        .attr({
            class: 'area',
            d: subgroup.violinPlot.area,
            fill: this.colorScale(subgroup.key),
            'fill-opacity': 0.75
        });
    subgroup.violinPlot.gMinus
        .append('path')
        .datum(subgroup.violinPlot.data)
        .attr({
            class: 'violin',
            d: subgroup.violinPlot.line,
            stroke: this.colorScale(subgroup.key),
            fill: 'none'
        });
}
