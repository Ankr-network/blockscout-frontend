import { MixpanelEvent } from './const';
import { track } from './utils/track';

const event = MixpanelEvent.UPGRADE_PLAN_MODAL_CLOSED;

export const trackUpgradePlanModalClose = () => track({ event });
