The most straightforward way to customize the Safety Results Over Time is by using a configuration object whose properties describe the behavior and appearance of the chart. Since the Safety Results Over Time is a Webcharts `chart` object, many default Webcharts settings are set in the [defaultSettings.js file](https://github.com/RhoInc/safety-results-over-time/blob/master/src/defaultSettings.js) as [described below](#webcharts-settings). Refer to the [Webcharts documentation](https://github.com/RhoInc/Webcharts/wiki/Chart-Configuration) for more details on these settings.

In addition to the standard Webcharts settings several custom settings not available in the base Webcharts library have been added to the Safety Results Over Time to facilitate data mapping and other custom functionality. These custom settings are described in detail below. All defaults can be overwritten by users.

# Renderer-specific settings
The sections below describe each safety-results-over-time setting as of version 2.3.2.

## settings.id_col
`string`

name of variable that captures unique identifier of participant

**default:** `"USUBJID"`



## settings.time_settings
`object`

visit metadata

### settings.time_settings.value_col
`string`

name of variable that captures visit name

**default:** `"VISIT"`

### settings.time_settings.label
`string`

Visit variable label

**default:** `"Visit"`

### settings.time_settings.order_col
`string`

name of variable that captures visit order

**default:** `"VISITNUM"`

### settings.time_settings.order
`array`

Visit order

**default:** none

### settings.time_settings.rotate_tick_labels
`boolean`

Rotate tick labels 45 degrees?

**default:** `true`

### settings.time_settings.vertical_space
`number`

Rotated tick label spacing

**default:** `100`



## settings.measure_col
`string`

name of variable that captures measure name

**default:** `"TEST"`



## settings.unit_col
`string`

name of variable that captures measure unit

**default:** `"STRESU"`



## settings.value_col
`string`

name of variable that captures measure result

**default:** `"STRESN"`



## settings.normal_col_low
`string`

name of variable that captures LLN of measure

**default:** `"STNRLO"`



## settings.normal_col_high
`string`

name of variable that captures ULN of measure

**default:** `"STNRHI"`



## settings.start_value
`string`

value of measure to display initially

**default:** none



## settings.filters
`array`

an array of filter variables and associated metadata

**default:** none

### settings.filters[].value_col
`string`

Variable name

**default:** none

### settings.filters[].label
`string`

Variable label

**default:** none



## settings.groups
`array`

an array of grouping variables and associated metadata

**default:** none

### settings.groups[].value_col
`string`

Variable name

**default:** none

### settings.groups[].label
`string`

Variable label

**default:** none



## settings.color_by
`string`

name of variable that captures grouping; defaults to first item in `groups` setting; set to `'srot_none'` to display chart without grouping on initialization

**default:** none



## settings.boxplots
`boolean`

controls initial display of box plots

**default:** `true`



## settings.outliers
`boolean`

controls initial display of outliers outside the 5th and 95th percentiles

**default:** `true`



## settings.violins
`boolean`

controls initial display of violin plots

**default:** `false`



## settings.missingValues
`array`

an array of strings that identify missing values in both the measure and result variables

**default:** none



## settings.visits_without_data
`boolean`

controls display of visits without data for the current measure

**default:** `false`



## settings.unscheduled_visits
`boolean`

controls display of unscheduled visits

**default:** `false`



## settings.unscheduled_visit_pattern
`string`

a regular expression that identifies unscheduled visits

**default:** `"/unscheduled|early termination/i"`



## settings.unscheduled_visit_values
`array`

an array of strings that identify unscheduled visits; overrides unscheduled_visit_pattern

**default:** none

# Webcharts settings
The object below contains Webcharts settings as of version 2.3.2 of the Safety Results Over Time.

```
{
    "x": {
        "column": null,
        "type": "ordinal",
        "label": null,
        "behavior": "flex",
        "sort": "alphabetical-ascending",
        "tickAttr": null
    },
    "y": {
        "column": null,
        "type": "linear",
        "label": null,
        "behavior": "flex",
        "stat": "mean",
        "format": null
    },
    "marks": [
        {
            "type": "line",
            "per": null,
            "attributes": {
                "stroke-width": 2,
                "stroke-opacity": 1,
                "display": "none"
            }
        },
        {
            "type": "circle",
            "per": null,
            "attributes": {
                "stroke": "black",
                "stroke-opacity": 0,
                "fill-opacity": 0
            },
            "values": {
                "srot_outlier": [
                    true
                ]
            },
            "radius": null,
            "tooltip": null,
            "hidden": true
        },
        {
            "type": "circle",
            "per": null,
            "attributes": {
                "stroke": "black",
                "stroke-opacity": 1,
                "fill-opacity": 1
            },
            "values": {
                "srot_outlier": [
                    true
                ]
            },
            "radius": 1.75,
            "tooltip": null,
            "hidden": false
        }
    ],
    "legend": {
        "mark": "square"
    },
    "color_by": null,
    "resizable": true,
    "gridlines": "y",
    "aspect": 3
}
```