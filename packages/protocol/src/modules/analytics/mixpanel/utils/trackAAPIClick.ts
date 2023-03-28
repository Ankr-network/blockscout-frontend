import { ClickAAPIEvent } from '../types';
import { MixpanelEvent } from '../const';
import { track } from './track';

const event = MixpanelEvent.CLICK_AAPI;

export const trackAAPIClick = (properties: ClickAAPIEvent) =>
  track({ event, properties });
