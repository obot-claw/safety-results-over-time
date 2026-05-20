import * as d3 from 'd3';

export default function defineMeasureData() {
    //Filter raw data on selected measure.
    this.measure_data = this.initial_data.filter(d => d.srot_measure === this.currentMeasure);

    //Remove nonpositive results given log y-axis.
    this.controls.wrap.select('.non-positive-results').remove();
    if (this.config.y.type === 'log') {
        const nResults = this.measure_data.length;
        this.measure_data = this.measure_data.filter(d => +d[this.config.value_col] > 0);
        const nonPositiveResults = nResults - this.measure_data.length;
        if (nonPositiveResults > 0)
            this.controls.wrap
                .selectAll('.axis-type .radio')
                .filter(function() {
                    return (
                        d3
                            .select(this)
                            .select('input')
                            .attr('value') === 'log'
                    );
                })
                .append('small')
                .classed('non-positive-results', true)
                .text(
                    `${nonPositiveResults} nonpositive result${
                        nonPositiveResults > 1 ? 's' : ''
                    } removed.`
                );
    }
    this.raw_data = this.measure_data;

    //Apply filter to measure data.
    this.filtered_measure_data = this.measure_data;
    this.filters.forEach(filter => {
        this.filtered_measure_data = this.filtered_measure_data.filter(d => {
            return Array.isArray(filter.val)
                ? filter.val.indexOf(d[filter.col]) > -1
                : filter.val === d[filter.col] || filter.val === 'All';
        });
    });

    //Nest data and calculate summary statistics for each visit-group combination.
    this.nested_measure_data = d3['nest']()
        .key(d => d[this.config.x.column])
        .key(d => d[this.config.color_by])
        .rollup(d => {
            const results = {
                values: d.map(m => +m[this.config.y.column]).sort(d3['ascending']),
                n: d.length
            };

            //Calculate summary statistics.
            [
                'min',
                ['quantile', 0.05],
                ['quantile', 0.25],
                'median',
                ['quantile', 0.75],
                ['quantile', 0.95],
                'max',
                'mean',
                'deviation'
            ].forEach(item => {
                const fx = Array.isArray(item) ? item[0] : item;
                const stat = Array.isArray(item) ? `${fx.substring(0, 1)}${item[1] * 100}` : fx;
                results[stat] = Array.isArray(item)
                    ? d3[fx](results.values, item[1])
                    : d3[fx](results.values);
            });

            return results;
        })
        .entries(this.filtered_measure_data);
}
