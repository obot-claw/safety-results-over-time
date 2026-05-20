import { format } from 'd3';

export default function addSummaryStatistics(subgroup) {
    const format0 = format(`.${this.config.y.precision + 0}f`);
    const format1 = format(`.${this.config.y.precision + 1}f`);
    const format2 = format(`.${this.config.y.precision + 2}f`);
    subgroup.svg
        .selectAll('g')
        .append('title')
        .html(
            d =>
                `${subgroup.key} at ${subgroup.group.x.key}:\n&nbsp;&nbsp;&nbsp;&nbsp;N = ${
                    subgroup.results.n
                }\n&nbsp;&nbsp;&nbsp;&nbsp;Min = ${format0(
                    subgroup.results.min
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;5th % = ${format1(
                    subgroup.results.q5
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;Q1 = ${format1(
                    subgroup.results.q25
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;Median = ${format1(
                    subgroup.results.median
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;Q3 = ${format1(
                    subgroup.results.q75
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;95th % = ${format1(
                    subgroup.results.q95
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;Max = ${format0(
                    subgroup.results.max
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;Mean = ${format1(
                    subgroup.results.mean
                )}\n&nbsp;&nbsp;&nbsp;&nbsp;StDev = ${format2(subgroup.results.deviation)}`
        );
}
