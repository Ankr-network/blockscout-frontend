import { useDispatchRequest, useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { ReactText, useCallback, useState } from 'react';
import { useHistory } from 'react-router';

import { AvailableWriteProviders, BlockchainNetworkId } from 'provider';

import { switchNetwork } from 'modules/auth/actions/switchNetwork';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { useProviderEffect } from 'modules/auth/hooks/useProviderEffect';
import { approve } from 'modules/bridge/actions/approve';
import { deposit } from 'modules/bridge/actions/deposit';
import { fetchBalance } from 'modules/bridge/actions/fetchBalance';
import {
  IBridgeBlockchainPanelItem,
  IBridgeBlockchainPanelProps,
} from 'modules/bridge/components/BridgeBlockchainPanel';
import { useBalance } from 'modules/bridge/hooks/useBalance';
import { useBlockchainPanelOptions } from 'modules/bridge/hooks/useBlockchainPanelOptions';
import { AvailableBridgeTokens } from 'modules/bridge/types';
import { isMainnet, SupportedChainIDS } from 'modules/common/const';
import {
  TUseValidateAmount,
  useValidateAmount,
} from 'modules/common/hooks/useAmountValidation';

import { getWithdrawalQuery } from '../../../../utils/getWithdrawalQuery';

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
  isSendButtonLoading: boolean;
  isApproveButtonLoading: boolean;
  networksOptionsFrom: IBridgeBlockchainPanelItem[];
  networksOptionsTo: IBridgeBlockchainPanelItem[];
  onChangeToken: (token: string) => void;
  onChangeNetwork: (
    networkItem: IBridgeBlockchainPanelItem,
    direction: IBridgeBlockchainPanelProps['direction'],
  ) => void;
  onChangeInputValue: (value: ReactText) => void;
  onSwapClick: () => void;
  onSubmit: () => void;
  onSwitchNetworkClick: () => void;
  onAddrCheckboxClick: () => void;
  dispatchConnect: () => void;
  validateAmount: TUseValidateAmount;
}

const defaultFrom = isMainnet
  ? SupportedChainIDS.MAINNET
  : SupportedChainIDS.GOERLI;

const defaultTo = isMainnet
  ? SupportedChainIDS.POLYGON
  : SupportedChainIDS.BSC_TESTNET;

export const useBridgeMainView = (): IUseBridgeMainView => {
  const balance = useBalance();
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
  const history = useHistory();
  const { dispatchConnect, isConnected, chainId, isMetaMask } = useAuth(
    AvailableWriteProviders.ethCompatible,
  );

  const { data: approveData, loading: isApproveButtonLoading } = useQuery({
    type: approve,
  });

  const { loading: isSendButtonLoading } = useQuery({
    type: deposit,
  });

  // TODO: bind by <env> to default value
  const [swapNetworkItem, setSwapNetworkItem] = useState<{
    from: SupportedChainIDS;
    to: SupportedChainIDS;
  }>({
    from: defaultFrom,
    to: defaultTo,
  });

  const [isActualNetwork, setActualNetwork] = useState<boolean>(
    (swapNetworkItem.from as unknown as BlockchainNetworkId) === chainId,
  );

  const isApproved = !!approveData;

  const onChangeToken = (token: string) => {
    setTokenValue(token as AvailableBridgeTokens);
    setSwapNetworkItem({ from: defaultFrom, to: defaultTo });
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

  const onApproveClick = () => {
    if (!inputValue) {
      return;
    }

    const amount = new BigNumber(inputValue);

    dispatchRequest(approve(amount, tokenValue, swapNetworkItem.from));
  };

  const onSuccessDeposit = useCallback(
    (transactionHash: string) => {
      history.push({
        search: `?${getWithdrawalQuery(
          {
            tx: transactionHash,
            amount: `${inputValue}`,
            token: tokenValue,
            chainIdFrom: swapNetworkItem.from,
            chainIdTo: swapNetworkItem.to,
          },
          document.location.search,
        )}`,
      });
    },
    [history, inputValue, swapNetworkItem, tokenValue],
  );

  const onSendClick = () => {
    if (!inputValue) {
      return;
    }

    dispatchRequest(
      deposit({
        fromChainId: swapNetworkItem.from,
        toChainId: swapNetworkItem.to,
        amount: new BigNumber(inputValue),
        token: tokenValue,
      }),
    ).then(data => {
      if (data.data) {
        onSuccessDeposit(data.data.transactionHash);
      }
    });
  };

  const onAddrCheckboxClick = () => setIsSendAnother(s => !s);

  const onSwitchNetworkClick = () => {
    dispatchRequest(
      switchNetwork({
        providerId: AvailableWriteProviders.ethCompatible,
        chainId: swapNetworkItem.from,
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
      dispatchRequest(fetchBalance({ token: tokenValue, network: chainId }));
    }
  }, [dispatchRequest, tokenValue, isConnected, isActualNetwork, chainId]);

  useProviderEffect(() => {
    const newNetworks = networkAvailable[tokenValue];

    setNetworksOptionsFrom(newNetworks || []);
    setNetworksOptionsTo(newNetworks || []);
  }, [tokenValue]);

  useProviderEffect(() => {
    setNetworksOptionsFrom(
      networksOptionsFrom.map(item => {
        item.disabled = item.value === swapNetworkItem.to;
        return { ...item };
      }),
    );

    setNetworksOptionsTo(
      networksOptionsTo.map(item => {
        item.disabled = item.value === swapNetworkItem.from;
        return { ...item };
      }),
    );
  }, [swapNetworkItem]);

  useProviderEffect(() => {
    setActualNetwork(
      (swapNetworkItem.from as unknown as BlockchainNetworkId) === chainId,
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
    dispatchConnect,
  };
};
