import { MixpanelEvent } from './const';
import { TopUpEventProps } from './types';
import { track } from './utils/track';

export interface TopUpTrackingParams {
  address?: string;
  hasPremium?: boolean;
  isAllowanceConfirmed?: boolean;
  isTopUpAccepted?: boolean;
  isTopUpSuccessful?: boolean;
  isTransactionConfirmed?: boolean;
  walletName?: string;
}

const event = MixpanelEvent.TOP_UP_BALANCE_FLOW;

export const trackTopUp = ({
  address: wallet_public_address,
  hasPremium: billing = false,
  isAllowanceConfirmed: confirm_transaction = false,
  isTopUpAccepted: accept_and_proceed = false,
  isTopUpSuccessful: done_button = false,
  isTransactionConfirmed: confirm_and_sign = false,
  walletName: wallet_type,
}: TopUpTrackingParams) =>
  track<TopUpEventProps>({
    event,
    properties: {
      accept_and_proceed,
      billing,
      confirm_and_sign,
      confirm_transaction,
      done_button,
      top_up_button: true,
      wallet_public_address,
      wallet_type,
    },
  });
