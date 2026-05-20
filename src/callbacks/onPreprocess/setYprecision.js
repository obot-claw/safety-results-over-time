import { format } from 'd3';

export default function setYprecision() {
    //Calculate range of current measure and the log10 of the range to choose an appropriate precision.
    this.config.y.range = this.config.y.domain[1] - this.config.y.domain[0];
    this.config.y.log10range = Math.log10(this.config.y.range);
    this.config.y.roundedLog10range = Math.round(this.config.y.log10range);
    this.config.y.precision1 = -1 * (this.config.y.roundedLog10range - 1);
    this.config.y.precision2 = -1 * (this.config.y.roundedLog10range - 2);

    //Define the format of the y-axis tick labels and y-domain controls.
    this.config.y.precision = this.config.y.log10range > 0.5 ? 0 : this.config.y.precision1;
    this.config.y.format = this.config.y.log10range > 0.5 ? '1f' : `.${this.config.y.precision1}f`;
    this.config.y.d3_format = format(this.config.y.format);
    this.config.y.formatted_domain = this.config.y.domain.map(d => this.config.y.d3_format(d));

    //Define the bin format: one less than the y-axis format.
    this.config.y.format1 = this.config.y.log10range > 5 ? '1f' : `.${this.config.y.precision2}f`;
    this.config.y.d3_format1 = format(this.config.y.format1);
}
