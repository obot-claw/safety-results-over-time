export default function addContainer(subgroup) {
    subgroup.boxplot.container = subgroup.svg
        .append('g')
        .attr('class', 'boxplot')
        .datum({
            values: subgroup.results.values,
            probs: subgroup.boxplot.probs
        })
        .attr('clip-path', `url(#${this.id})`);
}
