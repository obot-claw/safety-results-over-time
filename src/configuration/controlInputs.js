export default function controlInputs() {
    return [
        {
            type: 'subsetter',
            label: 'Measure',
            value_col: 'srot_measure', // set in syncControlInputs()
            start: null // set in ../callbacks/onInit/setInitialMeasure.js
        },
        {
            type: 'dropdown',
            label: 'Group by',
            options: ['marks.0.per.0', 'color_by'],
            start: null, // set in ./syncControlInputs.js
            values: null, // set in ./syncControlInputs.js
            require: true
        },
        {
            type: 'number',
            label: 'Lower',
            grouping: 'y-axis',
            option: 'y.domain[0]',
            require: true
        },
        {
            type: 'number',
            label: 'Upper',
            grouping: 'y-axis',
            option: 'y.domain[1]',
            require: true
        },
        {
            type: 'radio',
            option: 'y.type',
            grouping: 'y-axis',
            values: ['linear', 'log'],
            label: 'Scale'
        },
        {
            type: 'checkbox',
            inline: true,
            option: 'visits_without_data',
            label: 'Visits without data'
        },
        {
            type: 'checkbox',
            inline: true,
            option: 'unscheduled_visits',
            label: 'Unscheduled visits'
        },
        { type: 'checkbox', inline: true, option: 'boxplots', label: 'Box plots' },
        { type: 'checkbox', inline: true, option: 'violins', label: 'Violin plots' },
        { type: 'checkbox', inline: true, option: 'outliers', label: 'Outliers' }
    ];
}
