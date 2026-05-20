export default function removeUnscheduledVisits() {
    if (!this.config.unscheduled_visits)
        this.marks.forEach(mark => {
            if (mark.type === 'line')
                mark.data.forEach(d => {
                    d.values = d.values.filter(di => this.config.x.domain.indexOf(di.key) > -1);
                });
            else if (mark.type === 'circle')
                mark.data = mark.data.filter(d => this.config.x.domain.indexOf(d.values.x) > -1);
        });
}
