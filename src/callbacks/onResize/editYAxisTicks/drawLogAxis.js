import { svg } from 'd3';

export default function drawLogAxis() {
    //Draw custom y-axis given a log scale.
    if (this.config.y.type === 'log') {
        const logYAxis = svg
            .axis()
            .scale(this.y)
            .orient('left')
            .ticks(8, `,${this.config.y.format}`)
            .tickSize(6, 0);
        this.svg.select('g.y.axis').call(logYAxis);
    }
}
