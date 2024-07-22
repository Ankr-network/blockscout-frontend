import { MixpanelEvent } from './const';
import { track } from './utils/track';

const event = MixpanelEvent.UPGRADE_PLAN_MODAL_OPENED;

export const trackUpgradePlanModalOpen = () => track({ event });
