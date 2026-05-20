export default function drawHorizontalLines(subgroup) {
    const iS = [0, 2, 4];
    const iSclass = ['', 'median', ''];
    const iSColor = [
        subgroup.boxplot.boxColor,
        subgroup.boxplot.boxInsideColor,
        subgroup.boxplot.boxColor
    ];
    for (let i = 0; i < iS.length; i++) {
        subgroup.boxplot.container
            .append('line')
            .attr({
                class: 'boxplot ' + iSclass[i],
                x1: subgroup.boxplot.left,
                x2: subgroup.boxplot.right,
                y1: subgroup.boxplot.y(subgroup.boxplot.probs[iS[i]]),
                y2: subgroup.boxplot.y(subgroup.boxplot.probs[iS[i]])
            })
            .style({
                fill: iSColor[i],
                stroke: iSColor[i]
            });
    }
}
