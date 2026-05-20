export default function updateMarkData() {
    this.marks.forEach((mark, i) => {
        mark.hidden = this.config.marks[i].hidden;
    });
    this.marks
        .filter(mark => mark.type === 'circle')
        .forEach(mark => {
            mark.data.forEach((d, i) => {
                d.id = `outlier-${i}`;
                d.hidden = mark.hidden;
                d.visit = d.values.x;
                d.group = d.values.raw[0][this.config.color_by];
            });
        });
}
