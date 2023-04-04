import { MixpanelEvent } from './const';
import { track } from './utils/track';

const event = MixpanelEvent.SIGN_UP_MODAL_CLOSED;

export const trackSignUpModalClose = () => track({ event });
