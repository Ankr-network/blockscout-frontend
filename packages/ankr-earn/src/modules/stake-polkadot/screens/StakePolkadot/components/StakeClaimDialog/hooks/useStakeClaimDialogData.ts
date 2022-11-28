import { t } from '@ankr.com/common';
import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { TPolkadotAddress } from 'polkadot';

import { useSwitchNetworkMutation } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import {
  DEFAULT_FIXED,
  featuresConfig,
  isMainnet,
  ZERO,
} from 'modules/common/const';
import { EKnownDialogs, useDialog } from 'modules/dialogs';
import { claim } from 'modules/stake-polkadot/actions/claim';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import {
  ETH_NETWORKS,
  ETH_WRITE_PROVIDER_ID,
  POLKADOT_WRITE_PROVIDER_ID,
} from 'modules/stake-polkadot/const';
import {
  EPolkadotNetworks,
  IPolkadotClaimFormPayload,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

interface IUseStakeClaimDialogDataProps {
  ethToken: TPolkadotETHToken;
  network: EPolkadotNetworks;
  polkadotToken: TPolkadotToken;
  onSubmit: () => void;
}

interface IUseStakeClaimDialogData {
  claimableTokensAmount: BigNumber;
  ethAmountTxt: string | null;
  isLoadingClaim: boolean;
  isLoadingTopBtn: boolean;
  isShowBottomItems: boolean;
  isValidETHNetwork: boolean;
  isWithClaimableTokens: boolean;
  polkadotAddress?: TPolkadotAddress;
  polkadotNetworkName: string;
  secondStepTitle: string;
  topBtnTxt: string;
  onFormSubmit: (data: IPolkadotClaimFormPayload) => Promise<void>;
}

const FIRST_VALID_ETH_CHAIN_ID = ETH_NETWORKS[0];

export const useStakeClaimDialogData = ({
  ethToken,
  network,
  polkadotToken,
  onSubmit,
}: IUseStakeClaimDialogDataProps): IUseStakeClaimDialogData => {
  const dispatchRequest = useDispatchRequest();

  const { address: polkadotAddress } = useConnectedData(
    POLKADOT_WRITE_PROVIDER_ID,
  );

  const { handleOpen: onOpenModal } = useDialog(EKnownDialogs.connect);

  const { loading: isLoadingClaim } = useMutation({
    type: claim,
  });

  const [switchNetwork, { isLoading: isLoadingSwitchNetwork }] =
    useSwitchNetworkMutation();

  const { data: claimableBalance, loading: isLoadingClaimableBalance } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(network),
    });

  const { chainId: ethChainId, isConnected: isConnectedETHWallet } =
    useConnectedData(ETH_WRITE_PROVIDER_ID);

  const claimableTokensAmount = claimableBalance?.claimable ?? ZERO;

  const isValidETHNetwork =
    isConnectedETHWallet &&
    isEVMCompatible(ethChainId) &&
    ETH_NETWORKS.includes(ethChainId);

  const isWithClaimableTokens =
    isValidETHNetwork && !claimableTokensAmount.isZero();

  const isLoadingTopBtn = isLoadingClaimableBalance || isLoadingSwitchNetwork;

  const isShowBottomItems =
    isWithClaimableTokens ||
    (!isWithClaimableTokens &&
      !isLoadingClaim &&
      featuresConfig.isActivePolkadotLedgerNanoX);

  const ethAmountTxt = useMemo(
    () =>
      isValidETHNetwork
        ? claimableTokensAmount.decimalPlaces(DEFAULT_FIXED).toFormat()
        : null,
    [claimableTokensAmount, isValidETHNetwork],
  );

  const ethNetworkName = isMainnet
    ? t('connect.networks.ethereum-mainnet')
    : t('connect.networks.ethereum-goerli');

  const polkadotNetworkName = useMemo(
    () => t(`stake-polkadot.networks.${polkadotToken}`),
    [polkadotToken],
  );

  const secondStepTitle = useMemo(
    () =>
      isValidETHNetwork &&
      !isWithClaimableTokens &&
      typeof ethAmountTxt === 'string'
        ? t('stake-polkadot.stake-claim-dialog.second-title.amount', {
            value: ethAmountTxt,
            token: ethToken,
          })
        : t('stake-polkadot.stake-claim-dialog.second-title.default', {
            token: ethToken,
          }),
    [ethAmountTxt, ethToken, isValidETHNetwork, isWithClaimableTokens],
  );

  const topBtnTxt = useMemo(() => {
    if (!isConnectedETHWallet) {
      return t('stake-polkadot.stake-claim-dialog.second-top-btn.connect');
    }

    return isValidETHNetwork
      ? t('stake-polkadot.claim.claim-btn')
      : t('stake-polkadot.stake-claim-dialog.second-top-btn.switch-network', {
          network: ethNetworkName,
        });
  }, [ethNetworkName, isConnectedETHWallet, isValidETHNetwork]);

  const onFormSubmit = async ({
    isLedgerWallet,
  }: IPolkadotClaimFormPayload): Promise<void> => {
    if (!isConnectedETHWallet) {
      onOpenModal();

      return;
    }

    if (!isValidETHNetwork) {
      await switchNetwork({
        chainId: FIRST_VALID_ETH_CHAIN_ID,
        providerId: ETH_WRITE_PROVIDER_ID,
      });

      return;
    }

    if (claimableTokensAmount.isLessThanOrEqualTo(0)) {
      return;
    }

    const { error } = await dispatchRequest(
      claim({
        claimableAmount: claimableTokensAmount,
        isLedgerWallet,
        network,
      }),
    );

    if (!(error instanceof Error)) {
      onSubmit();
    }
  };

  useProviderEffect(
    () => {
      if (typeof polkadotAddress !== 'string') {
        return;
      }

      dispatchRequest(
        fetchETHTokenClaimableBalance({
          address: polkadotAddress,
          network,
        }),
      );
    },
    [dispatchRequest, fetchETHTokenClaimableBalance, network, polkadotAddress],
    POLKADOT_WRITE_PROVIDER_ID,
  );

  return {
    claimableTokensAmount,
    ethAmountTxt,
    isLoadingClaim,
    isLoadingTopBtn,
    isShowBottomItems,
    isValidETHNetwork,
    isWithClaimableTokens,
    polkadotAddress,
    polkadotNetworkName,
    secondStepTitle,
    topBtnTxt,
    onFormSubmit,
  };
};
