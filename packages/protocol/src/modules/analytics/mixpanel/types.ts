import { EndpointType, TopUpCurrency } from './const';

interface Billingable {
  billing: boolean;
}

interface Walletable {
  wallet_type?: string;
  wallet_public_address?: string;
}

export interface AAPIClickEventProps extends Billingable, Walletable {}

export interface AddEmailEventProps extends Billingable, Walletable {
  add_your_email: boolean;
  email_address: string;
}

export interface AddNetworkInMMEventProps extends Billingable, Walletable {
  google_account?: string;
  is_logged_in: boolean;
  network: string;
  web2_connect?: boolean;
  web3_connect?: boolean;
}

export interface ChainTabSelectEventProps extends Billingable, Walletable {
  tab_name: string;
}

export interface DashboardClickEventProps extends Billingable, Walletable {}

export interface DocsClickEventProps extends Billingable, Walletable {
  docs_button: boolean;
}

export interface EndpointCopyEventProps extends Billingable, Walletable {
  click_copy_url: string;
  endpoints_type: EndpointType;
}

export interface SettingsClickEventProps extends Billingable, Walletable {
  settings_button: boolean;
}

export interface TopUpEventProps extends Billingable, Walletable {
  accept_and_proceed: boolean;
  confirm_and_sign: boolean;
  confirm_transaction: boolean;
  done_button: boolean;
  top_up_button: boolean;
}

export interface TopUpSubmitEventProps extends Billingable, Walletable {
  // displayed credits
  balance?: string;
  // credits on the balance after top up, for the first top up
  replenishment_balance?: number;
  token_amount: number;
  token_button: TopUpCurrency;
  // credits on the balance after top up, for the second and following top ups
  top_up_balance?: number;
}

export interface Web2SignUpEventProps extends Billingable {
  google_account?: string;
  web2_connect?: boolean;
}

export interface Web2SignUpTrackingParams {
  email?: string;
  hasPremium?: boolean;
}

export interface Web3SignUpEventProps extends Billingable, Walletable {
  web3_connect: boolean;
}
