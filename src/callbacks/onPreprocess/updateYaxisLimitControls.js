export default function updateYaxisLimitControls() {
    //Update y-axis limit controls.
    const step = Math.pow(10, -this.config.y.precision);
    const yDomain = this.config.y.domain.map(limit => this.config.y.d3_format(limit));
    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[0]')
        .select('input')
        .attr('step', step)
        .property('value', yDomain[0]);
    this.controls.wrap
        .selectAll('.control-group')
        .filter(f => f.option === 'y.domain[1]')
        .select('input')
        .attr('step', step)
        .property('value', yDomain[1]);
}
