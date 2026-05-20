export default function clearCanvas() {
    this.svg.selectAll('.y.axis .tick').remove();
    this.svg.selectAll('.point').remove(); // mark data doesn't necessarily get updated (?)
    this.svg.selectAll('.boxplot-wrap').remove();
}
