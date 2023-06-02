import { MixpanelEvent } from './const';
import { Web2SignUpEventProps, Web2SignUpTrackingParams } from './types';
import { track } from './utils/track';

const event = MixpanelEvent.SIGN_UP_FAILIED;

export const trackWeb2SignUpFailure = ({
  email: google_account,
  hasPremium: billing = false,
}: Web2SignUpTrackingParams) =>
  track<Web2SignUpEventProps>({
    event,
    properties: { billing, google_account, web2_connect: true },
  });