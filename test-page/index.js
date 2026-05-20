d3.csv(
    'https://raw.githubusercontent.com/RhoInc/data-library/master/data/clinical-trials/renderer-specific/adbds.csv',
    function(d) {
        return d;
    },
    function(data) {
        var instance = safetyResultsOverTime(
            '#container', // element
            {
                groups: [
                    {value_col: 'SEX', label: 'Sex'},
                    {value_col: 'ARM', label: 'Treatment Group'},
                    {value_col: 'RACE', label: 'Race'},
                    {value_col: 'SITEID', label: 'Site'},
                ],
                color_by: 'ARM',
            } // settings
        );
        instance.init(data);
    }
);
