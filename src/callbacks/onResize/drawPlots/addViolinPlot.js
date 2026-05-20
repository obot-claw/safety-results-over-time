import defineData from './addViolinPlot/defineData';
import defineScales from './addViolinPlot/defineScales';
import addContainer from './addViolinPlot/addContainer';
import drawLeftSide from './addViolinPlot/drawLeftSide';
import drawRightSide from './addViolinPlot/drawRightSide';

export default function addViolinPlot(subgroup) {
    defineData.call(this, subgroup);
    defineScales.call(this, subgroup);
    addContainer.call(this, subgroup);
    drawLeftSide.call(this, subgroup);
    drawRightSide.call(this, subgroup);
}
