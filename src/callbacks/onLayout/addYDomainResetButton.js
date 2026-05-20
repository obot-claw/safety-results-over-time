import { extent } from 'd3';

export default function addYDomainResetButton() {
    const context = this,
        resetContainer = this.controls.wrap
            .insert('div', '.lower')
            .classed('control-group y-axis', true)
            .datum({
                type: 'button',
                option: 'y.domain',
                label: 'Limits'
            }),
        resetLabel = resetContainer
            .append('span')
            .attr('class', 'wc-control-label')
            .text('Limits'),
        resetButton = resetContainer
            .append('button')
            .style('padding', '0px 5px')
            .text('Reset')
            .on('click', function() {
                const measure_data = context.raw_data.filter(
                    d => d.srot_measure === context.currentMeasure
                );
                context.config.y.domain = extent(measure_data, d => +d[context.config.value_col]); //reset axis to full range

                context.controls.wrap
                    .selectAll('.control-group')
                    .filter(f => f.option === 'y.domain[0]')
                    .select('input')
                    .property('value', context.config.y.domain[0]);

                context.controls.wrap
                    .selectAll('.control-group')
                    .filter(f => f.option === 'y.domain[1]')
                    .select('input')
                    .property('value', context.config.y.domain[1]);

                context.draw();
            });
}
