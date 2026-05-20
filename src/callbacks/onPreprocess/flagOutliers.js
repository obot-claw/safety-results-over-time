export default function flagOutliers() {
    this.quantileMap = new Map();
    this.nested_measure_data.forEach(visit => {
        visit.values.forEach(group => {
            this.quantileMap.set(
                `${visit.key}|${group.key}`, // key
                [group.values.q5, group.values.q95] // value
            );
        });
    });
    this.filtered_measure_data.forEach(d => {
        const quantiles = this.quantileMap.get(
            `${d[this.config.x.column]}|${d[this.config.color_by]}`
        );
        d.srot_outlier = this.config.outliers
            ? d[this.config.y.column] < quantiles[0] || quantiles[1] < d[this.config.y.column]
            : false;
    });
}
