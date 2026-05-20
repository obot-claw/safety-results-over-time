import { set } from 'd3';

export default function syncSettings(settings) {
    //x-axis
    settings.x.column = settings.time_settings.value_col;
    settings.x.label = settings.time_settings.label;
    settings.x.behavior = settings.visits_without_data ? 'raw' : 'flex';

    //y-axis
    settings.y.column = settings.value_col;

    //handle a string arguments to array settings
    const array_settings = ['filters', 'groups', 'missingValues'];
    array_settings.forEach(function(s) {
        if (!(settings[s] instanceof Array))
            settings[s] = typeof settings[s] === 'string' ? [settings[s]] : [];
    });

    //stratification
    const defaultGroup = { value_col: 'srot_none', label: 'None' };
    if (!(settings.groups instanceof Array && settings.groups.length))
        settings.groups = [defaultGroup];
    else
        settings.groups = [defaultGroup].concat(
            settings.groups.map(group => {
                return {
                    value_col: group.value_col || group,
                    label: group.label || group.value_col || group
                };
            })
        );

    //Remove duplicate values.
    settings.groups = set(settings.groups.map(group => group.value_col))
        .values()
        .map(value => {
            return {
                value_col: value,
                label: settings.groups.find(group => group.value_col === value).label
            };
        });

    //Set initial group-by variable.
    settings.color_by = settings.color_by
        ? settings.color_by
        : settings.groups.length > 1
        ? settings.groups[1].value_col
        : defaultGroup.value_col;

    //Set initial group-by label.
    settings.legend.label = settings.groups.find(
        group => group.value_col === settings.color_by
    ).label;

    //marks
    const lines = settings.marks.find(mark => mark.type === 'line');
    const hiddenOutliers = settings.marks.find(mark => mark.type === 'circle' && mark.hidden);
    const visibleOutliers = settings.marks.find(mark => mark.type === 'circle' && !mark.hidden);
    lines.per = [settings.color_by];
    hiddenOutliers.radius = visibleOutliers.radius * 4;
    settings.marks
        .filter(mark => mark.type === 'circle')
        .forEach(mark => {
            mark.per = [settings.id_col, settings.time_settings.value_col, settings.value_col];
            mark.tooltip = `[${settings.id_col}] at [${settings.x.column}]: [${
                settings.value_col
            }]`;
        });

    //miscellany
    settings.margin = settings.margin || { bottom: settings.time_settings.vertical_space };

    //Convert unscheduled_visit_pattern from string to regular expression.
    if (
        typeof settings.unscheduled_visit_pattern === 'string' &&
        settings.unscheduled_visit_pattern !== ''
    ) {
        const flags = settings.unscheduled_visit_pattern.replace(/.*?\/([gimy]*)$/, '$1'),
            pattern = settings.unscheduled_visit_pattern.replace(
                new RegExp('^/(.*?)/' + flags + '$'),
                '$1'
            );
        settings.unscheduled_visit_regex = new RegExp(pattern, flags);
    }

    return settings;
}
