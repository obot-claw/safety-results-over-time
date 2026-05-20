import { svg } from 'd3';

export default function addContainer(subgroup) {
    //Define violin shapes.
    subgroup.violinPlot.area = svg
        .area()
        .interpolate('basis')
        .x(d => subgroup.violinPlot.x(d.x + d.dx / 2))
        .y0(subgroup.violinPlot.width / 2)
        .y1(d => subgroup.violinPlot.y(d.y));
    subgroup.violinPlot.line = svg
        .line()
        .interpolate('basis')
        .x(d => subgroup.violinPlot.x(d.x + d.dx / 2))
        .y(d => subgroup.violinPlot.y(d.y));
    subgroup.violinPlot.container = subgroup.svg
        .append('g')
        .attr('class', 'violinplot')
        .attr('clip-path', `url(#${this.id})`);
}
