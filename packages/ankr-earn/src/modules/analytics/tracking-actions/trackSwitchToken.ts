import { TSwapOption } from 'modules/switcher/types';

import { IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface ISwitchTokenEvent extends IBaseWaletData {
  inputToken: TSwapOption;
  inputTokenBalance: string;
  ouputToken: TSwapOption;
  inputAmount: string;
  serviceFee: string;
  outputAmount: string;
  switchProportion: string;
}

export const trackSwitchToken = (properties: ISwitchTokenEvent): void => {
  trackAnalyticEvent({ event: 'switch_token', properties });
};
