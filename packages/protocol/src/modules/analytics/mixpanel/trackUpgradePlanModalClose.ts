import { MixpanelEvent } from './const';
import { UpgradePlanModalEventProps } from './types';
import { UpgradePlanDialogType } from 'modules/common/components/UpgradePlanDialog';
import { track } from './utils/track';

const event = MixpanelEvent.UPGRADE_PLAN_MODAL_CLOSED;

export const trackUpgradePlanModalClose = (type: UpgradePlanDialogType) =>
  track<UpgradePlanModalEventProps>({ event, properties: { type } });
