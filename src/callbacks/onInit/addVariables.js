export default function addVariables() {
    this.raw_data.forEach(d => {
        //Convert results to numeric
        d[this.config.y.column] = parseFloat(d[this.config.y.column]);

        //Concatenate unit to measure if provided.
        d.srot_measure = d.hasOwnProperty(this.config.unit_col)
            ? `${d[this.config.measure_col]} (${d[this.config.unit_col]})`
            : d[this.config.measure_col];

        //Add placeholder variable for non-grouped comparisons.
        d.srot_none = 'All Participants';

        //Add placeholder variable for outliers.
        d.srot_outlier = null;
    });
    this.variables = Object.keys(this.raw_data[0]);
}
