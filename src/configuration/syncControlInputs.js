export default function syncControlInputs(controlInputs, settings) {
    //Sync group control.
    const groupControl = controlInputs.find(controlInput => controlInput.label === 'Group by');
    groupControl.start = settings.groups.find(group => group.value_col === settings.color_by).label;
    groupControl.values = settings.groups.map(group => group.label);

    //Add custom filters to control inputs.
    if (settings.filters) {
        settings.filters.reverse().forEach(function(filter) {
            const thisFilter = {
                type: 'subsetter',
                value_col: filter.value_col ? filter.value_col : filter,
                label: filter.label ? filter.label : filter.value_col ? filter.value_col : filter,
                description: 'filter'
            };

            //add the filter to the control inputs (as long as it's not already there)
            var current_value_cols = controlInputs
                .filter(f => f.type == 'subsetter')
                .map(m => m.value_col);
            if (current_value_cols.indexOf(thisFilter.value_col) == -1)
                controlInputs.splice(1, 0, thisFilter);
        });
    }

    //Remove unscheduled visit control if unscheduled visit pattern is unscpecified.
    if (!settings.unscheduled_visit_regex)
        controlInputs.splice(
            controlInputs.map(controlInput => controlInput.label).indexOf('Unscheduled visits'),
            1
        );

    return controlInputs;
}
