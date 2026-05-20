import getCurrentMeasure from './onPreprocess/getCurrentMeasure';
import defineMeasureData from './onPreprocess/defineMeasureData';
import flagOutliers from './onPreprocess/flagOutliers';
import setXdomain from './onPreprocess/setXdomain';
import setYdomain from './onPreprocess/setYdomain';
import setYprecision from './onPreprocess/setYprecision';
import updateYaxisResetButton from './onPreprocess/updateYaxisResetButton';
import updateYaxisLimitControls from './onPreprocess/updateYaxisLimitControls';

export default function onPreprocess() {
    // 1. Capture currently selected measure.
    getCurrentMeasure.call(this);

    // 2. Filter data on currently selected measure.
    defineMeasureData.call(this);

    // 3a Flag outliers with quantiles calculated in defineMeasureData().
    flagOutliers.call(this);

    // 3a Set x-domain given current visit settings.
    setXdomain.call(this);

    // 3b Set y-domain given currently selected measure.
    setYdomain.call(this);

    // 4a Define precision of measure.
    setYprecision.call(this);

    // 4b Update y-axis reset button when measure changes.
    updateYaxisResetButton.call(this);

    // 4c Update y-axis limit controls to match y-axis domain.
    updateYaxisLimitControls.call(this);
}
