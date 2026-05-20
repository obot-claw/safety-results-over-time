import { select } from 'd3';

export default function addMouseoverToOutliers() {
    this.marks
        .filter(mark => mark.type === 'circle')
        .forEach(mark => {
            mark.groups
                .each(function(d, i) {
                    select(this).classed(`hidden-${d.hidden} ${d.id}`, true);
                })
                .on('mouseover', d => {
                    this.svg.select(`.hidden-true.${d.id} circle`).attr({
                        'fill-opacity': 1,
                        'stroke-opacity': 1
                    });
                })
                .on('mouseout', d => {
                    this.svg.select(`.hidden-true.${d.id} circle`).attr({
                        'fill-opacity': 0,
                        'stroke-opacity': 0
                    });
                });
        });
}
