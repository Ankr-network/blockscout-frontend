import { Callback } from 'mixpanel-browser';

import { EnterBillingFlowEvent } from '../types';
import { MixpanelEvent } from '../const';
import { track } from './track';

const event = MixpanelEvent.ENTER_BILLING_FLOW;

export const trackEnterBillingFlow = (
  properties: EnterBillingFlowEvent,
  callback: Callback,
) => track({ event, options: callback, properties });
