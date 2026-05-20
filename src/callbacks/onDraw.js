import updateParticipantCount from './onDraw/updateParticipantCount';
import removeUnscheduledVisits from './onDraw/removeUnscheduledVisits';
import clearCanvas from './onDraw/clearCanvas';
import updateMarkData from './onDraw/updateMarkData';

export default function onDraw() {
    updateParticipantCount.call(this);
    clearCanvas.call(this);
    removeUnscheduledVisits.call(this);
    updateMarkData.call(this);
}
