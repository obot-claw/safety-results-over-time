import { scale, max } from 'd3';

export default function defineScales(subgroup) {
    subgroup.violinPlot.width = this.x.rangeBand();
    subgroup.violinPlot.x =
        this.config.y.type === 'linear'
            ? scale
                  .linear()
                  .domain(this.y.domain())
                  .range([this.plot_height, 0])
            : scale
                  .log()
                  .domain(this.y.domain())
                  .range([this.plot_height, 0]);
    subgroup.violinPlot.y = scale
        .linear()
        .domain([
            0,
            Math.max(1 - 1 / subgroup.group.x.nGroups, max(subgroup.violinPlot.data, d => d.y))
        ])
        .range([subgroup.violinPlot.width / 2, 0]);
}
