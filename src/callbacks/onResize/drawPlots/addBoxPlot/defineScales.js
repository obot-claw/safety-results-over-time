import { scale } from 'd3';

export default function defineScales(subgroup) {
    subgroup.boxplot.x = scale.linear().range([0, this.x.rangeBand()]);
    subgroup.boxplot.left = subgroup.boxplot.x(0.5 - subgroup.boxplot.boxPlotWidth / 2);
    subgroup.boxplot.right = subgroup.boxplot.x(0.5 + subgroup.boxplot.boxPlotWidth / 2);
    subgroup.boxplot.y =
        this.config.y.type === 'linear'
            ? scale
                  .linear()
                  .range([this.plot_height, 0])
                  .domain(this.y.domain())
            : scale
                  .log()
                  .range([this.plot_height, 0])
                  .domain(this.y.domain());
}
