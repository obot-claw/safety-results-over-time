import editXAxisTicks from './onResize/editXAxisTicks';
import editYAxisTicks from './onResize/editYAxisTicks';
import clearCanvas from './onResize/clearCanvas';
import drawPlots from './onResize/drawPlots';
import addMouseoverToOutliers from './onResize/addMouseoverToOutliers';
import removeLegend from './onResize/removeLegend';

export default function onResize() {
    editXAxisTicks.call(this);
    editYAxisTicks.call(this);
    clearCanvas.call(this);
    drawPlots.call(this);
    addMouseoverToOutliers.call(this);
    removeLegend.call(this);
}
