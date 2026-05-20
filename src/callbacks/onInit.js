import countParticipants from './onInit/countParticipants';
import cleanData from './onInit/cleanData';
import addVariables from './onInit/addVariables';
import defineVisitOrder from './onInit/defineVisitOrder';
import checkFilters from './onInit/checkFilters';
import checkGroupByVariables from './onInit/checkGroupByVariables';
import defineMeasureSet from './onInit/defineMeasureSet';
import setInitialMeasure from './onInit/setInitialMeasure';

export default function onInit() {
    // 1. Count total participants prior to data cleaning.
    countParticipants.call(this);

    // 2. Drop missing values and remove measures with any non-numeric results.
    cleanData.call(this);

    // 3a Define additional variables.
    addVariables.call(this);

    // 3b Define ordered x-axis domain with visit order variable.
    defineVisitOrder.call(this);

    // 3c Remove filters for nonexistent or single-level variables.
    checkFilters.call(this);

    // 3d Remove group-by options for nonexistent variables.
    checkGroupByVariables.call(this);

    // 4. Define set of measures.
    defineMeasureSet.call(this);

    // 5. Set the start value of the Measure filter.
    setInitialMeasure.call(this);
}
