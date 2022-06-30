import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';
import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useState } from 'react';

import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import { getIsMetaMask } from 'modules/auth/eth/utils/getIsMetaMask';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { fetchBalance } from 'modules/bridge/actions/fetchBalance';
import { useBalance } from 'modules/bridge/hooks/useBalance';
import { useBlockchainPanelOptions } from 'modules/bridge/hooks/useBlockchainPanelOptions';
import {
  AvailableBridgeTokens,
  IBridgeBlockchainPanelItem,
} from 'modules/bridge/types';
import { isMainnet, SupportedChainIDS } from 'modules/common/const';
import {
  TUseValidateAmount,
  useValidateAmount,
} from 'modules/common/hooks/useValidateAmount';

import { useApprove } from './useApprove';
import { useDeposit } from './useDeposit';

interface ISwapNetworkItemState {
  from: SupportedChainIDS;
  to: SupportedChainIDS;
}

export interface IOnSuccessDepositArgs {
  chainIdFrom: SupportedChainIDS;
  chainIdTo: SupportedChainIDS;
  txn: string;
  amount: string;
  token: AvailableBridgeTokens;
}

interface IUseBridgeMainView {
  tokenValue: AvailableBridgeTokens;
  isSendAnother: boolean;
  isConnected: boolean;
  isApproved: boolean;
  isMetaMask: boolean;
  isActualNetwork: boolean;
  swapNetworkItem: ISwapNetworkItemState;
  balance?: BigNumber;
  isBalanceLoading: boolean;
  isSendButtonLoading: boolean;
  isApproveButtonLoading: boolean;
  networksOptionsFrom: IBridgeBlockchainPanelItem[];
  networksOptionsTo: IBridgeBlockchainPanelItem[];
  onChangeToken: (token: string) => void;
  onChangeNetwork: (
    networkItem: IBridgeBlockchainPanelItem,
    direction: 'from' | 'to',
  ) => void;
  onChangeInputValue: (value: ReactText) => void;
  onSwapClick: () => void;
  onSubmit: () => void;
  onSwitchNetworkClick: () => void;
  onAddrCheckboxClick: () => void;
  validateAmount: TUseValidateAmount;
}

const defaultFrom = isMainnet
  ? SupportedChainIDS.MAINNET
  : SupportedChainIDS.GOERLI;

const defaultTo = isMainnet
  ? SupportedChainIDS.BSC
  : SupportedChainIDS.BSC_TESTNET;

export const useBridgeMainView = (): IUseBridgeMainView => {
  const providerId = AvailableWriteProviders.ethCompatible;

  const { balance, isBalanceLoading } = useBalance();
  const networkAvailable = useBlockchainPanelOptions();

  const [tokenValue, setTokenValue] = useState(AvailableBridgeTokens.aMATICb);
  const [inputValue, setInputValue] = useState<string>();
  const [networksOptionsFrom, setNetworksOptionsFrom] = useState(
    networkAvailable[tokenValue] || [],
  );
  const [networksOptionsTo, setNetworksOptionsTo] = useState(
    networkAvailable[tokenValue] || [],
  );

  const [isSendAnother, setIsSendAnother] = useState(false);
  const dispatchRequest = useDispatchRequest();

  const { writeProviderData } = useWalletsGroupTypes({
    writeProviderId: providerId,
  });

  const chainId: EEthereumNetworkId | undefined = isEVMCompatible(
    writeProviderData?.chainId,
  )
    ? writeProviderData?.chainId
    : undefined;
  const isConnected = writeProviderData?.isConnected ?? false;
  const isMetaMask = getIsMetaMask(writeProviderData?.walletName);

  // TODO: bind by <env> to default value
  const [swapNetworkItem, setSwapNetworkItem] = useState<{
    from: SupportedChainIDS;
    to: SupportedChainIDS;
  }>({
    from: defaultFrom,
    to: defaultTo,
  });

  const [isActualNetwork, setActualNetwork] = useState<boolean>(
    (swapNetworkItem.from as unknown as EEthereumNetworkId) === chainId,
  );

  const {
    isApproved,
    onClick: onApproveClick,
    isLoading: isApproveButtonLoading,
  } = useApprove({
    token: tokenValue,
    chainId: swapNetworkItem.from,
    amount: inputValue ? new BigNumber(inputValue) : undefined,
  });

  const { onClick: onSendClick, isLoading: isSendButtonLoading } = useDeposit({
    amount: inputValue ? new BigNumber(inputValue) : undefined,
    fromChainId: swapNetworkItem.from,
    toChainId: swapNetworkItem.to,
    token: tokenValue,
  });

  const onChangeToken = (token: string) => {
    setSwapNetworkItem({ from: defaultFrom, to: defaultTo });
    setTokenValue(token as AvailableBridgeTokens);
  };

  const onChangeNetwork: IUseBridgeMainView['onChangeNetwork'] = (
    networkItem,
    direction,
  ) => {
    setSwapNetworkItem({ ...swapNetworkItem, [direction]: networkItem.value });
  };

  const onChangeInputValue = (value: ReactText) => {
    setInputValue(`${value}`);
  };

  const onSwapClick = () => {
    setSwapNetworkItem({
      from: swapNetworkItem.to,
      to: swapNetworkItem.from,
    });
  };

  const validateAmount = useValidateAmount(balance);

  const onAddrCheckboxClick = () => setIsSendAnother(s => !s);

  const onSwitchNetworkClick = () => {
    dispatchRequest(
      switchNetwork({
        providerId,
        chainId: swapNetworkItem.from as number,
      }),
    );
  };

  const onSubmit = () => {
    if (isApproved) {
      onSendClick();
    } else {
      onApproveClick();
    }
  };

  useProviderEffect(() => {
    if (!isConnected || !isActualNetwork) {
      return;
    }

    if (chainId) {
      dispatchRequest(
        fetchBalance({ token: tokenValue, network: chainId as number }),
      );
    }
  }, [dispatchRequest, tokenValue, isConnected, isActualNetwork, chainId]);

  useProviderEffect(() => {
    const newNetworks = networkAvailable[tokenValue] || [];

    setNetworksOptionsFrom(
      [...newNetworks].map(item => {
        item.disabled = item.value === swapNetworkItem.to;
        return { ...item };
      }),
    );

    setNetworksOptionsTo(
      [...newNetworks].map(item => {
        item.disabled = item.value === swapNetworkItem.from;
        return { ...item };
      }),
    );
  }, [tokenValue, swapNetworkItem]);

  useProviderEffect(() => {
    setActualNetwork(
      (swapNetworkItem.from as unknown as EEthereumNetworkId) === chainId,
    );
  }, [chainId, swapNetworkItem]);

  return {
    isConnected,
    isMetaMask,
    tokenValue,
    isSendAnother,
    isApproved,
    isActualNetwork,
    swapNetworkItem,
    balance,
    isBalanceLoading,
    isSendButtonLoading,
    isApproveButtonLoading,
    networksOptionsFrom,
    networksOptionsTo,
    onChangeNetwork,
    onChangeToken,
    validateAmount,
    onSubmit,
    onSwitchNetworkClick,
    onAddrCheckboxClick,
    onChangeInputValue,
    onSwapClick,
  };
};
