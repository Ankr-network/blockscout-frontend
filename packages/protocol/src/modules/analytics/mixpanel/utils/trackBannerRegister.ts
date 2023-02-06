import { MixpanelEvent } from '../const';
import { BannerFreeToRegisterEvent } from '../types';
import { track } from './track';

const event = MixpanelEvent.BANNER_FREE_TO_REGISTER;

export const trackBannerRegister = (properties: BannerFreeToRegisterEvent) =>
  track({ event, properties });
