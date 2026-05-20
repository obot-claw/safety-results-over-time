import { quantile } from 'd3';

export default function handleEmptyAxis() {
    //Manually draw y-axis ticks when none exist.
    if (this.svg.selectAll('.y .tick').size() < 2) {
        //Define quantiles of current measure results.
        const probs = [
            { probability: 0.1 },
            { probability: 0.3 },
            { probability: 0.5 },
            { probability: 0.7 },
            { probability: 0.9 }
        ];

        for (let i = 0; i < probs.length; i++) {
            probs[i].quantile = quantile(
                this.measure_data.map(d => +d[this.config.y.column]).sort((a, b) => a - b),
                probs[i].probability
            );
        }

        const ticks = probs.map(prob => prob.quantile);

        //Manually define y-axis tick values.
        this.yAxis.tickValues(ticks);

        //Transition the y-axis to draw the ticks.
        this.svg
            .select('g.y.axis')
            .transition()
            .call(this.yAxis);

        //Draw the gridlines.
        this.drawGridlines();
    }
}
