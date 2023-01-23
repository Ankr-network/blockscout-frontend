import { AddEmailEvent } from '../types';
import { MixpanelEvent } from '../const';
import { track } from './track';

const event = MixpanelEvent.ADD_EMAIL;

export const trackAddEmail = (properties: AddEmailEvent) =>
  track({ event, properties });
