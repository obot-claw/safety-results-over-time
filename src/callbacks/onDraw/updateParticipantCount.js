import { set, format, select } from 'd3';

export default function updateParticipantCount() {
    this.populationCountContainer.selectAll('*').remove();
    const subpopulationCount = set(this.filtered_data.map(d => d[this.config.id_col])).values()
        .length;
    const percentage = format('0.1%')(subpopulationCount / this.populationCount);
    this.populationCountContainer.html(
        `\n${subpopulationCount} of ${this.populationCount} participants  shown (${percentage})`
    );
}
