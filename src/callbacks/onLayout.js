import classControlGroups from './onLayout/classControlGroups';
import customizeGroupByControl from './onLayout/customizeGroupByControl';
import addYDomainResetButton from './onLayout/addYDomainResetButton';
import groupYAxisControls from './onLayout/groupYAxisControls';
import addPopulationCountContainer from './onLayout/addPopulationCountContainer';
import addBorderAboveChart from './onLayout/addBorderAboveChart';

export default function onLayout() {
    classControlGroups.call(this);
    customizeGroupByControl.call(this);
    addYDomainResetButton.call(this);
    groupYAxisControls.call(this);
    addPopulationCountContainer.call(this);
    addBorderAboveChart.call(this);
}
