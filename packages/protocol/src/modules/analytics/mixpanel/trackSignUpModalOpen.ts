import { MixpanelEvent } from './const';
import { track } from './utils/track';

const event = MixpanelEvent.SIGN_UP_MODAL_OPENED;

export const trackSignUpModalOpen = () => track({ event });
