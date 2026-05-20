export default function fixFloatingPointIssues() {
    this.svg
        .selectAll('.y.axis .tick text')
        .filter(d => /^\d*\.0*[1-9]0{5,}[1-9]$/.test(d)) // floating point issues, e.g. .2 + .1 !== .3
        .remove();
}
