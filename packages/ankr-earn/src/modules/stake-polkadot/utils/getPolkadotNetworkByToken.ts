import { Token } from 'modules/common/types/token';
import {
  EPolkadotNetworks,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';

export const getPolkadotNetworkByToken = (
  token: TPolkadotToken,
): EPolkadotNetworks => {
  switch (token) {
    case Token.KSM:
      return EPolkadotNetworks.KSM;

    case Token.WND:
      return EPolkadotNetworks.WND;

    default:
      return EPolkadotNetworks.DOT;
  }
};
