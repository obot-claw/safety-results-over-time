import defineScales from './addBoxPlot/defineScales';
import addContainer from './addBoxPlot/addContainer';
import drawBox from './addBoxPlot/drawBox';
import drawHorizontalLines from './addBoxPlot/drawHorizontalLines';
import drawVerticalLines from './addBoxPlot/drawVerticalLines';
import drawOuterCircle from './addBoxPlot/drawOuterCircle';
import drawInnerCircle from './addBoxPlot/drawInnerCircle';

export default function addBoxPlot(subgroup) {
    //Attach needed stuff to subgroup object.
    subgroup.boxplot = {
        boxPlotWidth: 0.75 / this.colorScale.domain().length,
        boxColor: this.colorScale(subgroup.key),
        boxInsideColor: '#eee',
        probs: ['q5', 'q25', 'median', 'q75', 'q95'].map(prob => subgroup.results[prob])
    };

    //Draw box plot.
    defineScales.call(this, subgroup);
    addContainer.call(this, subgroup);
    drawBox.call(this, subgroup);
    drawHorizontalLines.call(this, subgroup);
    drawVerticalLines.call(this, subgroup);
    drawOuterCircle.call(this, subgroup);
    drawInnerCircle.call(this, subgroup);
}
