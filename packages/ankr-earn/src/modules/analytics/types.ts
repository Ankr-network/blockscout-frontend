import { Web3Address } from 'modules/common/types';

export interface IBaseWaletData {
  walletType:
    | 'MetaMask'
    | 'Trust Wallet'
    | 'Math Wallet'
    | 'Clover'
    | string
    | undefined;
  walletPublicAddress?: Web3Address;
}

export enum AnalyticsEvents {
  EnterBridgeFlow = 'enter_bridge_flow',
  ClickMaxStaking = 'click_max_staking',
  ClickTrade = 'click_trade',
  ConnectWallet = 'connect_wallet',
  EnterStakingFlow = 'enter_staking_flow',
  GetTokenDiscount = 'get_token_discount',
  StakeTokens = 'stake_tokens',
  SwitchToken = 'switch_token',
  UnstakeTokens = 'unstake_tokens',
}
