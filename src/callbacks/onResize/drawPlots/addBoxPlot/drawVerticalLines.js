export default function drawVerticalLines(subgroup) {
    const iS = [[0, 1], [3, 4]];
    for (var i = 0; i < iS.length; i++) {
        subgroup.boxplot.container
            .append('line')
            .attr({
                class: 'boxplot',
                x1: subgroup.boxplot.x(0.5),
                x2: subgroup.boxplot.x(0.5),
                y1: subgroup.boxplot.y(subgroup.boxplot.probs[iS[i][0]]),
                y2: subgroup.boxplot.y(subgroup.boxplot.probs[iS[i][1]])
            })
            .style('stroke', subgroup.boxplot.boxColor);
    }
}
