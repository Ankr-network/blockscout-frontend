import { EndpointType, TopUpCurrnecy } from './const';

interface Connectable {
  user_connected: boolean;
}

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

export interface ConnectWalletFlowEvent {
  sign_up: boolean;
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

export interface Web2ConnectEvent extends Connectable, Billingable {
  google_account?: string;
}

export interface Web2ConnectTrackingParams {
  email?: string;
  hasPremium?: boolean;
}

export interface Web3ConnectEvent
  extends Connectable,
    Billingable,
    Walletable {}

export enum BannerFreeToRegisterType {
  open = 'open',
  register = 'register',
  close = 'close',
}

export interface BannerFreeToRegisterEvent {
  type: BannerFreeToRegisterType;
}
