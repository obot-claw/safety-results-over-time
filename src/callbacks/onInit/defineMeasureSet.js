import { set } from 'd3';

export default function defineMeasureSet() {
    this.measures = set(this.initial_data.map(d => d[this.config.measure_col]))
        .values()
        .sort();
    this.srot_measures = set(this.initial_data.map(d => d.srot_measure))
        .values()
        .sort();
}
