import { useDispatchRequest } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useState } from 'react';

import {
  AvailableWriteProviders,
  EEthereumNetworkId,
} from '@ankr.com/provider';

import { trackBridge } from 'modules/analytics/tracking-actions/trackBridge';
import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { getIsInjectedWallet } from 'modules/auth/eth/utils/walletTypeUtils';
import { fetchBalance } from 'modules/bridge/actions/fetchBalance';
import { useBalance } from 'modules/bridge/hooks/useBalance';
import { useBlockchainPanelOptions } from 'modules/bridge/hooks/useBlockchainPanelOptions';
import {
  AvailableBridgeTokens,
  IBridgeBlockchainPanelItem,
} from 'modules/bridge/types';
import { SupportedChainIDS, ZERO } from 'modules/common/const';
import {
  TUseValidateAmount,
  useValidateAmount,
} from 'modules/common/hooks/useValidateAmount';
import { getTokenName } from 'modules/common/utils/getTokenName';

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
  tokenName: string;
  isSendAnother: boolean;
  isConnected: boolean;
  isApproved: boolean;
  isInjected: boolean;
  isActualNetwork: boolean;
  swapNetworkItem: ISwapNetworkItemState;
  balance?: BigNumber;
  isBalanceLoading: boolean;
  isSendButtonLoading: boolean;
  isApproveButtonLoading: boolean;
  networksOptionsFrom: IBridgeBlockchainPanelItem[];
  networksOptionsTo: IBridgeBlockchainPanelItem[];
  onChangeToken: (token: AvailableBridgeTokens) => void;
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
  isSwitchDisabled: boolean;
}

const SWITCH_DISABLED_TOKENS = [
  AvailableBridgeTokens.aMATICb,
  AvailableBridgeTokens.aETHb,
];

export const useBridgeMainView = (): IUseBridgeMainView => {
  const providerId = AvailableWriteProviders.ethCompatible;

  const {
    address,
    walletName,
    isConnected,
    chainId: chainNum,
  } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const { balance, isBalanceLoading } = useBalance();
  const networkAvailable = useBlockchainPanelOptions();

  const [tokenValue, setTokenValue] = useState(AvailableBridgeTokens.aMATICb);
  const [inputValue, setInputValue] = useState<string>();
  const [networksOptionsFrom, setNetworksOptionsFrom] = useState(
    networkAvailable[tokenValue].from || [],
  );
  const [networksOptionsTo, setNetworksOptionsTo] = useState(
    networkAvailable[tokenValue].to || [],
  );

  const [isSendAnother, setIsSendAnother] = useState(false);
  const dispatchRequest = useDispatchRequest();

  const [switchNetwork] = useSwitchNetworkMutation();

  const chainId = isEVMCompatible(chainNum) ? chainNum : undefined;
  const isInjected = getIsInjectedWallet(walletName);

  const getDefaultChains = (token: AvailableBridgeTokens) => {
    const from = networkAvailable[token].from[0].value as SupportedChainIDS;
    const toNetworks = networkAvailable[token].to;
    const to = (toNetworks.find(toChain => toChain.value !== from)?.value ||
      toNetworks[0].value) as SupportedChainIDS;
    return { from, to };
  };

  // TODO: bind by <env> to default value
  const [swapNetworkItem, setSwapNetworkItem] = useState<{
    from: SupportedChainIDS;
    to: SupportedChainIDS;
  }>(getDefaultChains(tokenValue));

  const [isActualNetwork, setActualNetwork] = useState<boolean>(
    swapNetworkItem.from === chainId,
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

  const tokenName = getTokenName(tokenValue);

  const sendAnalytics = async () => {
    const from = networksOptionsFrom.find(
      option => option.value === swapNetworkItem.from,
    )?.label;
    const to = networksOptionsTo.find(
      option => option.value === swapNetworkItem.to,
    )?.label;

    trackBridge({
      address,
      walletType: walletName,
      token: tokenValue,
      amount: inputValue ? new BigNumber(inputValue) : ZERO,
      balance,
      from,
      to,
    });
  };

  const onChangeToken = (token: AvailableBridgeTokens) => {
    setSwapNetworkItem(getDefaultChains(token));
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

  const validateAmount = useValidateAmount({ balance });

  const onAddrCheckboxClick = () => setIsSendAnother(s => !s);

  const onSwitchNetworkClick = () => {
    switchNetwork({
      providerId,
      chainId: swapNetworkItem.from as number,
    });
  };

  const onSubmit = () => {
    if (isApproved) {
      onSendClick();
      sendAnalytics();
    } else {
      onApproveClick();
    }
  };

  const isSwitchDisabled = SWITCH_DISABLED_TOKENS.includes(tokenValue);

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
    const newNetworksFrom = networkAvailable[tokenValue].from || [];
    const newNetworksTo = networkAvailable[tokenValue].to || [];

    setNetworksOptionsFrom(
      [...newNetworksFrom].map(item => {
        item.disabled = item.value === swapNetworkItem.to;
        return { ...item };
      }),
    );

    setNetworksOptionsTo(
      [...newNetworksTo].map(item => {
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
    isInjected,
    tokenName,
    isSendAnother,
    isApproved,
    isActualNetwork,
    swapNetworkItem,
    balance,
    isBalanceLoading,
    isSendButtonLoading,
    isSwitchDisabled,
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
