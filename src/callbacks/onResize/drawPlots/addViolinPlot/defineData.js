import { layout } from 'd3';

export default function defineData(subgroup) {
    //Define histogram data.
    subgroup.violinPlot = {
        histogram: layout
            .histogram()
            .bins(10)
            .frequency(0)
    };
    (subgroup.violinPlot.data = subgroup.violinPlot.histogram(subgroup.results.values)),
        subgroup.violinPlot.data.unshift({
            x: subgroup.results.min,
            dx: 0,
            y: subgroup.violinPlot.data[0].y
        });
    subgroup.violinPlot.data.push({
        x: subgroup.results.max,
        dx: 0,
        y: subgroup.violinPlot.data[subgroup.violinPlot.data.length - 1].y
    });
}
