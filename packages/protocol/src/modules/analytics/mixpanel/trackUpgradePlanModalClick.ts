import { MixpanelEvent } from './const';
import { UpgradePlanModalEventProps } from './types';
import { track } from './utils/track';

const event = MixpanelEvent.UPGRADE_PLAN_MODAL_CLICKED;

type Properties = Required<UpgradePlanModalEventProps>;

export const trackUpgradePlanModalClick = (properties: Properties) =>
  track<Properties>({ event, properties });
