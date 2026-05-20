export default function customizeGroupControl() {
    const context = this;

    //Select group control.
    const groupControl = this.controls.wrap
        .selectAll('.control-group')
        .filter(d => d.type === 'dropdown' && d.label === 'Group');

    //Hide group control when settings specify no groups.
    groupControl.style('display', d =>
        d.values.length === 1 ? 'none' : groupControl.style('display')
    );

    //Customize group control event listener.
    const groupSelect = groupControl.selectAll('select');
    groupSelect
        .selectAll('option')
        .property(
            'selected',
            d =>
                d ===
                this.config.groups.find(group => group.value_col === this.config.color_by).label
        );
    groupSelect.on('change', function(d) {
        const label = d3
            .select(this)
            .selectAll('option:checked')
            .text();
        const value_col = d.value_cols[d.labels.indexOf(label)];
        context.config.color_by = value_col;
        context.draw();
    });
}
