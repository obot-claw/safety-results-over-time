The Safety Results Over Time accepts [JSON](https://en.wikipedia.org/wiki/JSON) data of the format returned by [`d3.csv()`](https://github.com/d3/d3-3.x-api-reference/blob/master/CSV.md). The renderer visualizes clinical medical signs data with **one row per participant per visit per medical sign** plus the required variables specified below.

## Data structure
one record per participant per visit per medical sign

## Data specification
required and optional variables:

| Setting | Default | Data Type | Description | Required? |
|:--------|:--------|:----------|:------------|:---------:|
|`id_col`|_USUBJID_|**character**|unique identifier of participant|**Yes**|
|`time_settings.value_col`|_VISIT_|**character**|visit name|**Yes**|
|`time_settings.order_col`|_VISITNUM_|**numeric**|visit order||
|`measure_col`|_TEST_|**character**|measure name|**Yes**|
|`unit_col`|_STRESU_|**character**|measure unit||
|`value_col`|_STRESN_|**numeric**|measure result|**Yes**|
|`normal_col_low`|_STNRLO_|**numeric**|LLN of measure||
|`normal_col_high`|_STNRHI_|**numeric**|ULN of measure||
|`filters[]`||**either**|an array of filter variables and associated metadata||
|`groups[]`||**either**|an array of grouping variables and associated metadata||
|`color_by`||**character**|grouping; defaults to first item in `groups` setting; set to `'srot_none'` to display chart without grouping on initialization||