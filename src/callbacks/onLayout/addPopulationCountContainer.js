export default function addPopulationCountContainer() {
    this.populationCountContainer = this.controls.wrap
        .append('div')
        .classed('population-count', true)
        .style('font-style', 'italic');
}
