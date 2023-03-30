import { MixpanelEvent } from './const';
import { track } from './utils/track';

const event = MixpanelEvent.SIGN_OUT;

export const trackSignOut = () => track({ event });
