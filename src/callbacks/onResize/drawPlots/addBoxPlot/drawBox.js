export default function drawBox(subgroup) {
    subgroup.boxplot.container
        .append('rect')
        .attr({
            class: 'boxplot fill',
            x: subgroup.boxplot.left,
            width: subgroup.boxplot.right - subgroup.boxplot.left,
            y: subgroup.boxplot.y(subgroup.boxplot.probs[3]),
            height:
                subgroup.boxplot.y(subgroup.boxplot.probs[1]) -
                subgroup.boxplot.y(subgroup.boxplot.probs[3])
        })
        .style('fill', subgroup.boxplot.boxColor);
}
