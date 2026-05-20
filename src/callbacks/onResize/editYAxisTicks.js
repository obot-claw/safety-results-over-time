import drawLogAxis from './editYAxisTicks/drawLogAxis';
import handleEmptyAxis from './editYAxisTicks/handleEmptyAxis';
import removeDuplicateTickLabels from './editYAxisTicks/removeDuplicateTickLabels';
import fixFloatingPointIssues from './editYAxisTicks/fixFloatingPointIssues';

export default function editYAxisTicks() {
    drawLogAxis.call(this);
    handleEmptyAxis.call(this);
    removeDuplicateTickLabels.call(this);
    fixFloatingPointIssues.call(this);
}
