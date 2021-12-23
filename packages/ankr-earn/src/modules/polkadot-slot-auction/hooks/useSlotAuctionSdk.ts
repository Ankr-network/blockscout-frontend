import {
  DEVELOP_ROCOCO_CONFIG,
  DEVELOP_WESTEND_CONFIG,
  MAINNET_KUSAMA_CONFIG,
  MAINNET_POLKADOT_CONFIG,
  SlotAuctionSdk,
} from '@ankr.com/stakefi-polkadot';
import { useQuery } from '@redux-requests/react';
import { useParams } from 'react-router';
import { connect } from '../actions/connect';
import { initialize } from '../actions/initialize';

const configs = {
  ksm: MAINNET_KUSAMA_CONFIG,
  dot: MAINNET_POLKADOT_CONFIG,
  wnd: DEVELOP_WESTEND_CONFIG,
  roc: DEVELOP_ROCOCO_CONFIG,
};

export const useSlotAuctionSdk = () => {
  const { network } = useParams<{ network: keyof typeof configs }>();

  const config = configs[network];

  const { data: slotAuctionSdk } = useQuery<SlotAuctionSdk>({
    type: initialize.toString(),
    action: initialize,
    variables: [config],
    autoLoad: true,
  });

  const {
    data: { isConnected, polkadotAccount, networkType },
  } = useQuery({
    defaultData: {
      isConnected: false,
    },
    type: connect.toString(),
  });

  return {
    slotAuctionSdk,
    isConnected,
    polkadotAccount,
    networkType: networkType ?? network?.toUpperCase() ?? '',
  };
};
