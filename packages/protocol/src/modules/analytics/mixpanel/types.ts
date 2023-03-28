import { EndpointType, TopUpCurrnecy } from './const';

interface Billingable {
  billing: boolean;
}

interface Walletable {
  wallet_type?: string;
  wallet_public_address?: string;
}

export interface AddEmailEvent extends Billingable, Walletable {
  add_your_email: boolean;
  email_address: string;
}

export interface ClickAAPIEvent extends Billingable, Walletable {}

export interface ConnectWalletFlowEvent extends Billingable, Walletable {
  google_account?: string;
  sign_up: boolean;
  web2_connect?: boolean;
  web3_connect?: boolean;
}

export interface EnterBillingFlowEvent extends Billingable, Walletable {
  // displayed credits
  balance?: string;
  // credits on the balance after top up, for the first top up
  replenishment_balance?: number;
  token_amount: number;
  token_button: TopUpCurrnecy;
  // credits on the balance after top up, for the second and following top ups
  top_up_balance?: number;
}

export interface EnterEndpointsFlowEvent extends Billingable, Walletable {
  click_copy_url: string;
  endpoints_type: EndpointType;
}

export interface EnterSettingsEvent extends Billingable, Walletable {
  settings_button: boolean;
}

export interface ReadDocsEvent extends Billingable, Walletable {
  docs_button: boolean;
}

export interface SelectChainTabEvent extends Billingable, Walletable {
  tab_name: string;
}

export interface TopUpBalanceFlowEvent extends Billingable, Walletable {
  accept_and_proceed: boolean;
  confirm_and_sign: boolean;
  confirm_transaction: boolean;
  done_button: boolean;
  top_up_button: boolean;
}

export interface Web2ConnectTrackingParams {
  email?: string;
  hasPremium?: boolean;
}

export enum BannerFreeToRegisterType {
  open = 'open',
  register = 'register',
  close = 'close',
}

export interface BannerFreeToRegisterEvent {
  type: BannerFreeToRegisterType;
}
