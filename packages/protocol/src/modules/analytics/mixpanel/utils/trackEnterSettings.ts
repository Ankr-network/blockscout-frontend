import { EnterSettingsEvent } from '../types';
import { MixpanelEvent } from '../const';
import { track } from './track';

const event = MixpanelEvent.ENTER_SETTINGS;

export const trackEnterSettings = (properties: EnterSettingsEvent) =>
  track({ event, properties });
