export default function rendererSettings() {
    return {
        id_col: 'USUBJID',
        time_settings: {
            value_col: 'VISIT',
            label: 'Visit',
            order_col: 'VISITNUM',
            order: null,
            rotate_tick_labels: true,
            vertical_space: 100
        },
        measure_col: 'TEST',
        value_col: 'STRESN',
        unit_col: 'STRESU',
        normal_col_low: 'STNRLO',
        normal_col_high: 'STNRHI',
        start_value: null,
        filters: null,
        groups: null,
        color_by: null,
        boxplots: true,
        outliers: true,
        violins: false,
        missingValues: ['', 'NA', 'N/A'],
        visits_without_data: false,
        unscheduled_visits: false,
        unscheduled_visit_pattern: '/unscheduled|early termination/i',
        unscheduled_visit_values: null // takes precedence over unscheduled_visit_pattern
    };
}
