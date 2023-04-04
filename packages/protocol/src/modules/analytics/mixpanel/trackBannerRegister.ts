import { BannerFreeToRegisterEventProps } from './types';
import { BannerFreeToRegisterType, MixpanelEvent } from './const';
import { track } from './utils/track';

const event = MixpanelEvent.BANNER_FREE_TO_REGISTER;

export const trackBannerRegister = (type: BannerFreeToRegisterType) =>
  track<BannerFreeToRegisterEventProps>({ event, properties: { type } });
