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
  ClickDefiAggregator = 'click_defi_aggregator',
  DelegatedStakingFlow = 'delegated_staking_flow',
  AnkrTokenStake = 'ankr_token_stake',
  EnterAnkrTokenManage = 'ankr_token_staking_manage',
  AnkrTokenUnstake = 'ankr_token_unstake',
  DelegatedStaking = 'delegated_staking',
  ClickClaimAllRewards = 'click_claim_all_rewards',
  ClickClaimRewards = 'click_claim_rewards',
  ClickClaimUnstake = 'click_claim_unstake',
  ClickClaimAll = 'click_claim_all',
  СlickGoToDashboard = 'click_go_to_dashboard',
}
