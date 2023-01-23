import { EnterEndpointsFlowEvent } from '../types';
import { MixpanelEvent } from '../const';
import { track } from './track';

const event = MixpanelEvent.ENTER_ENDPOINTS_FLOW;

export const trackEnterEndpointsFlow = (properties: EnterEndpointsFlowEvent) =>
  track({ event, properties });
