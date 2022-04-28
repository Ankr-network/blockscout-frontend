import { Token } from 'modules/common/types/token';
import { EPolkadotNetworks } from 'modules/stake-polkadot/types';

import { IUseStakedPolkadotDataProps } from './hooks/Polkadot/useStakedPolkadotData';
import { IUseClaimedPolkadotDataProps } from './hooks/Polkadot/useUnclaimedPolkadotData';

export const DOT_PROPS: IUseClaimedPolkadotDataProps &
  IUseStakedPolkadotDataProps = {
  ethToken: Token.aDOTb,
  network: EPolkadotNetworks.DOT,
  polkadotToken: Token.DOT,
};

export const KSM_PROPS: IUseClaimedPolkadotDataProps &
  IUseStakedPolkadotDataProps = {
  ethToken: Token.aKSMb,
  network: EPolkadotNetworks.KSM,
  polkadotToken: Token.KSM,
};

export const WND_PROPS: IUseClaimedPolkadotDataProps &
  IUseStakedPolkadotDataProps = {
  ethToken: Token.aWNDb,
  network: EPolkadotNetworks.WND,
  polkadotToken: Token.WND,
};
