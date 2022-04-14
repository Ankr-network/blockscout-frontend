import { Token } from 'modules/common/types/token';

import { IBaseWaletData } from '../types';
import { trackAnalyticEvent } from '../utils/trackAnalyticEvent';

interface ISwitchTokenEvent extends IBaseWaletData {
  inputToken: Token;
  inputTokenBalance: string;
  ouputToken: Token;
  inputAmount: string;
  serviceFee: string;
  outputAmount: string;
  switchProportion: string;
}

export const trackSwitchToken = (properties: ISwitchTokenEvent): void => {
  trackAnalyticEvent({ event: 'switch_token', properties });
};
