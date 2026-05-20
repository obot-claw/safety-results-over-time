export default function checkGroupByVariables() {
    const groupByInput = this.controls.config.inputs.find(input => input.label === 'Group by');
    this.config.groups = this.config.groups.filter(group => {
        const groupByExists = this.variables.indexOf(group.value_col) > -1;
        if (!groupByExists)
            console.warn(
                `The [ ${
                    group.label
                } ] group-by option has been removed because the variable does not exist.`
            );
        return groupByExists;
    });
    groupByInput.values = this.config.groups.map(group => group.label);
}
