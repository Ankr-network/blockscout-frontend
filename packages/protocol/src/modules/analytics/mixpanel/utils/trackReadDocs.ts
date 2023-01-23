import { MixpanelEvent } from '../const';
import { ReadDocsEvent } from '../types';
import { track } from './track';

const event = MixpanelEvent.READ_DOCS;

export const trackReadDocs = (properties: ReadDocsEvent) =>
  track({ event, properties });
