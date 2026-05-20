export default function getCurrentMeasure() {
    this.previousMeasure = this.currentMeasure;
    this.currentMeasure = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.value_col && d.value_col === 'srot_measure')
        .selectAll('option:checked')
        .text();
    this.config.y.label = this.currentMeasure;
    this.previousYAxis = this.currentYAxis;
    this.currentYAxis = this.config.y.type;
}
