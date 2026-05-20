import clone from '../../util/clone';
import { ascending } from 'd3';
import addBoxPlot from './drawPlots/addBoxPlot';
import addViolinPlot from './drawPlots/addViolinPlot';
import addSummaryStatistics from './drawPlots/addSummaryStatistics';

export default function drawPlots() {
    this.nested_measure_data
        .filter(visit => this.x_dom.indexOf(visit.key) > -1)
        .forEach(visit => {
            // iterate over groups
            //Sort [ config.color_by ] groups.
            visit.values = visit.values.sort((a, b) =>
                this.colorScale.domain().indexOf(a.key) < this.colorScale.domain().indexOf(b.key)
                    ? -1
                    : 1
            );

            //Define group object.
            const groupObject = {
                x: {
                    key: visit.key, // x-axis value
                    nGroups: this.colorScale.domain().length, // number of groups at x-axis value
                    width: this.x.rangeBand() // width of x-axis value
                },
                subgroups: []
            };
            groupObject.x.start = -(groupObject.x.nGroups / 2) + 0.5;
            groupObject.distance = groupObject.x.width / groupObject.x.nGroups;

            visit.values.forEach((group, i) => {
                //Iterate over visits.
                const subgroup = {
                    group: groupObject,
                    key: group.key,
                    offset: (groupObject.x.start + i) * groupObject.distance,
                    results: group.values
                };
                subgroup.svg = this.svg
                    .insert('g', '.point-supergroup')
                    .attr({
                        class: 'boxplot-wrap overlay-item',
                        transform:
                            'translate(' + (this.x(groupObject.x.key) + subgroup.offset) + ',0)'
                    })
                    .datum({ values: subgroup.results });
                groupObject.subgroups.push(subgroup);

                if (this.config.boxplots) addBoxPlot.call(this, subgroup);
                if (this.config.violins) addViolinPlot.call(this, subgroup);
                addSummaryStatistics.call(this, subgroup);

                //Offset outliers.
                this.marks
                    .filter(mark => mark.type === 'circle')
                    .forEach(mark => {
                        mark.groups
                            .filter(d => d.visit === visit.key && d.group === group.key)
                            .attr('transform', `translate(${subgroup.offset},0)`);
                    });
            });
        });
}
