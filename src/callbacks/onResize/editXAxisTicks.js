export default function editXAxisTicks() {
    //Rotate x-axis tick labels.
    if (this.config.time_settings.rotate_tick_labels)
        this.svg
            .selectAll('.x.axis .tick text')
            .attr({
                transform: 'rotate(-45)',
                dx: -10,
                dy: 10
            })
            .style('text-anchor', 'end');
}
