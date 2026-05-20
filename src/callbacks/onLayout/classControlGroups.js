import { select } from 'd3';

export default function classControlGroups() {
    let nCheckboxes = 0;
    let checkboxOffset = 0;
    this.controls.wrap
        .style('position', 'relative')
        .selectAll('.control-group')
        .each(function(d, i) {
            const controlGroup = select(this);
            controlGroup.classed(
                `${d.type.toLowerCase().replace(' ', '-')} ${d.label
                    .toLowerCase()
                    .replace(' ', '-')}`,
                true
            );

            //Add y-axis class to group y-axis controls.
            if (d.grouping) controlGroup.classed(d.grouping, true);

            //Float all checkboxes right.
            if (d.type === 'checkbox') {
                controlGroup.style({
                    position: 'absolute',
                    top: `${checkboxOffset}px`,
                    right: 0,
                    margin: '0'
                });
                ++nCheckboxes;
                checkboxOffset += controlGroup.node().offsetHeight;
            }
        });
}
