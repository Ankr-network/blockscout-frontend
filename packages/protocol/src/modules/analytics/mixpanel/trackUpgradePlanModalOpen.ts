import { UpgradePlanDialogType } from 'modules/common/components/UpgradePlanDialog';

import { MixpanelEvent } from './const';
import { UpgradePlanModalEventProps } from './types';
import { track } from './utils/track';

const event = MixpanelEvent.UPGRADE_PLAN_MODAL_OPENED;

export const trackUpgradePlanModalOpen = (type: UpgradePlanDialogType) =>
  track<UpgradePlanModalEventProps>({ event, properties: { type } });
