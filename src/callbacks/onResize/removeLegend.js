export default function removeLegend() {
    if (this.config.color_by === 'srot_none') this.wrap.select('.legend').remove();
}
