export default function webchartsSettings() {
    return {
        x: {
            column: null, // set in syncSettings()
            type: 'ordinal',
            label: null,
            behavior: 'flex',
            sort: 'alphabetical-ascending',
            tickAttr: null
        },
        y: {
            column: null, // set in syncSettings()
            type: 'linear',
            label: null,
            behavior: 'flex',
            stat: 'mean',
            format: null // set in ./onPreprocess/setYprecision()
        },
        marks: [
            {
                type: 'line',
                per: null, // set in syncSettings()
                attributes: {
                    'stroke-width': 2,
                    'stroke-opacity': 1,
                    display: 'none'
                }
            },
            {
                type: 'circle',
                per: null, // set in syncSettings()
                attributes: {
                    stroke: 'black',
                    'stroke-opacity': 0,
                    'fill-opacity': 0
                },
                values: {
                    srot_outlier: [true]
                },
                radius: null, // set in syncSettings()
                tooltip: null, // set in syncSettings()
                hidden: true
            },
            {
                type: 'circle',
                per: null, // set in syncSettings()
                attributes: {
                    stroke: 'black',
                    'stroke-opacity': 1,
                    'fill-opacity': 1
                },
                values: {
                    srot_outlier: [true]
                },
                radius: 1.75,
                tooltip: null, // set in syncSettings()
                hidden: false
            }
        ],
        legend: {
            mark: 'square'
        },
        color_by: null, // set in syncSettings()
        resizable: true,
        gridlines: 'y',
        aspect: 3
    };
}
