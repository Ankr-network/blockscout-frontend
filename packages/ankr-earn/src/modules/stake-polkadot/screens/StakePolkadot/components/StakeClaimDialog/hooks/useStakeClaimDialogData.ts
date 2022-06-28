import {
  useDispatchRequest,
  useMutation,
  useQuery,
} from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { useMemo } from 'react';

import { t } from 'common';
import { TPolkadotAddress } from 'polkadot';
import { AvailableWriteProviders, EEthereumNetworkId } from 'provider';

import { switchNetwork } from 'modules/auth/common/actions/switchNetwork';
import { useConnectedData } from 'modules/auth/common/hooks/useConnectedData';
import { useProviderEffect } from 'modules/auth/common/hooks/useProviderEffect';
import { useWalletsGroupTypes } from 'modules/auth/common/hooks/useWalletsGroupTypes';
import { isEVMCompatible } from 'modules/auth/eth/utils/isEVMCompatible';
import { DEFAULT_FIXED, isMainnet, ZERO } from 'modules/common/const';
import { useDialog } from 'modules/common/hooks/useDialog';
import { claim } from 'modules/stake-polkadot/actions/claim';
import { fetchETHTokenClaimableBalance } from 'modules/stake-polkadot/actions/fetchETHTokenClaimableBalance';
import {
  ETH_NETWORKS,
  ETH_WRITE_PROVIDER_ID,
  POLKADOT_WRITE_PROVIDER_ID,
} from 'modules/stake-polkadot/const';
import {
  EPolkadotNetworks,
  TPolkadotETHToken,
  TPolkadotToken,
} from 'modules/stake-polkadot/types';
import { getPolkadotRequestKey } from 'modules/stake-polkadot/utils/getPolkadotRequestKey';

export interface IFormPayload {
  isLedgerWallet?: boolean;
}

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
  isOpenedModal: boolean;
  isShowBottomItems: boolean;
  isValidETHNetwork: boolean;
  isWithClaimableTokens: boolean;
  polkadotAddress?: TPolkadotAddress;
  polkadotNetworkName: string;
  secondStepTitle: string;
  topBtnTxt: string;
  walletsGroupTypes?: AvailableWriteProviders[];
  onCloseModal: () => void;
  onFormSubmit: (data: IFormPayload) => Promise<void>;
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

  const {
    isOpened: isOpenedModal,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDialog();

  const { loading: isLoadingClaim } = useMutation({
    type: claim,
  });

  const { loading: isLoadingSwitchNetwork } = useMutation({
    type: switchNetwork,
  });

  const { data: claimableBalance, loading: isLoadingClaimableBalance } =
    useQuery({
      type: fetchETHTokenClaimableBalance,
      requestKey: getPolkadotRequestKey(network),
    });

  const { walletsGroupTypes, writeProviderData } = useWalletsGroupTypes({
    writeProviderId: ETH_WRITE_PROVIDER_ID,
  });

  const ethChainId: EEthereumNetworkId | undefined = isEVMCompatible(
    writeProviderData?.chainId,
  )
    ? writeProviderData?.chainId
    : undefined;

  const claimableTokensAmount = claimableBalance?.claimable ?? ZERO;

  const isConnectedETHWallet = writeProviderData?.isConnected ?? false;

  const isValidETHNetwork =
    isConnectedETHWallet &&
    isEVMCompatible(ethChainId) &&
    ETH_NETWORKS.includes(ethChainId);

  const isWithClaimableTokens =
    isValidETHNetwork && !claimableTokensAmount.isZero();

  const isLoadingTopBtn = isLoadingClaimableBalance || isLoadingSwitchNetwork;

  const isShowBottomItems =
    isWithClaimableTokens || (!isWithClaimableTokens && !isLoadingClaim);

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
      ? t('stake-polkadot.stake-claim-dialog.second-top-btn.claim')
      : t('stake-polkadot.stake-claim-dialog.second-top-btn.switch-network', {
          network: ethNetworkName,
        });
  }, [ethNetworkName, isConnectedETHWallet, isValidETHNetwork]);

  const onFormSubmit = async ({
    isLedgerWallet,
  }: IFormPayload): Promise<void> => {
    if (!isConnectedETHWallet) {
      onOpenModal();

      return;
    }

    if (!isValidETHNetwork) {
      await dispatchRequest(
        switchNetwork({
          chainId: FIRST_VALID_ETH_CHAIN_ID,
          providerId: ETH_WRITE_PROVIDER_ID,
        }),
      );

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
    isOpenedModal,
    isShowBottomItems,
    isValidETHNetwork,
    isWithClaimableTokens,
    polkadotAddress,
    polkadotNetworkName,
    secondStepTitle,
    topBtnTxt,
    walletsGroupTypes,
    onCloseModal,
    onFormSubmit,
  };
};
