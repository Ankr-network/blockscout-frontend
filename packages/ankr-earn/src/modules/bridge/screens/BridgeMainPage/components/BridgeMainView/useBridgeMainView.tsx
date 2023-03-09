import BigNumber from 'bignumber.js';
import { ReactText, useState } from 'react';

import { AvailableWriteProviders } from '@ankr.com/provider';

import { trackBridge } from 'modules/analytics/tracking-actions/trackBridge';
import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { getIsInjectedWallet } from 'modules/auth/eth/utils/walletTypeUtils';
import { useLazyGetBridgeBalanceQuery } from 'modules/bridge/actions/getBridgeBalance';
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
  isInjected: boolean;
  isActualNetwork: boolean;
  swapNetworkItem: ISwapNetworkItemState;
  balance?: BigNumber;
  isBalanceLoading: boolean;
  isSendButtonLoading: boolean;
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
  tokenValue: AvailableBridgeTokens;
  fromNetwork: SupportedChainIDS;
}

const SWITCH_DISABLED_TOKENS = [AvailableBridgeTokens.aETHb];

const findNetworkOption = (
  list: IBridgeBlockchainPanelItem[],
  option: SupportedChainIDS,
): boolean => {
  return list.some(item => item.value === option);
};

const getOtherNetworkOption = (
  list: IBridgeBlockchainPanelItem[],
  exclude: SupportedChainIDS,
): SupportedChainIDS | void => {
  return list.find(item => item.value !== exclude)?.value as SupportedChainIDS;
};

export const useBridgeMainView = (): IUseBridgeMainView => {
  const providerId = AvailableWriteProviders.ethCompatible;

  const {
    address,
    walletName,
    isConnected,
    chainId: chainNum,
  } = useConnectedData(AvailableWriteProviders.ethCompatible);

  const [getBalance, { data: balance, isFetching: isBalanceLoading }] =
    useLazyGetBridgeBalanceQuery();
  const networkAvailable = useBlockchainPanelOptions();

  const [tokenValue, setTokenValue] = useState<AvailableBridgeTokens>(
    AvailableBridgeTokens.aMATICb,
  );
  const [inputValue, setInputValue] = useState<string>();
  const [networksOptionsFrom, setNetworksOptionsFrom] = useState(
    networkAvailable[tokenValue].from || [],
  );
  const [networksOptionsTo, setNetworksOptionsTo] = useState(
    networkAvailable[tokenValue].to || [],
  );

  const [isSendAnother, setIsSendAnother] = useState(false);

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
      balance: balance ?? ZERO,
      from,
      to,
    });
  };

  const onChangeToken = (token: AvailableBridgeTokens) => {
    setSwapNetworkItem(getDefaultChains(token));
    setTokenValue(token);
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
    const isFromAvailable = findNetworkOption(
      networksOptionsFrom,
      swapNetworkItem.to,
    );
    const isToAvailable = findNetworkOption(
      networksOptionsTo,
      swapNetworkItem.from,
    );
    let from: SupportedChainIDS | void;
    let to: SupportedChainIDS | void;
    if (isToAvailable && isFromAvailable) {
      from = swapNetworkItem.to;
      to = swapNetworkItem.from;
    } else if (isToAvailable) {
      to = swapNetworkItem.from;
      from = getOtherNetworkOption(networksOptionsFrom, to);
    } else if (isFromAvailable) {
      from = swapNetworkItem.to;
      to = getOtherNetworkOption(networksOptionsTo, from);
    }
    if (from !== undefined && to !== undefined) {
      setSwapNetworkItem({
        from,
        to,
      });
    }
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
    onSendClick();
    sendAnalytics();
  };

  const isSwitchDisabled = SWITCH_DISABLED_TOKENS.includes(tokenValue);

  const isActualNetwork = swapNetworkItem.from === chainId;

  useProviderEffect(() => {
    if (!isConnected) {
      return;
    }

    getBalance({ token: tokenValue, network: swapNetworkItem.from });
  }, [tokenValue, isConnected, swapNetworkItem.from]);

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

  return {
    isConnected,
    isInjected,
    tokenName,
    isSendAnother,
    isActualNetwork,
    swapNetworkItem,
    balance,
    isBalanceLoading,
    isSendButtonLoading,
    isSwitchDisabled,
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
    tokenValue,
    fromNetwork: swapNetworkItem.from,
  };
};
