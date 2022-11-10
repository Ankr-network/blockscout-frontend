import {
  AvailableWriteProviders,
  EWalletId,
  getWalletName,
} from '@ankr.com/provider-core';
import { Box, ButtonBase, Grid, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import classNames from 'classnames';
import { Fragment, useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { AnyAction } from 'redux';
import { isMobile } from 'web3modal';

import {
  getIsCoin98Injected,
  getIsCoinbaseInjected,
  getIsMetamaskInjected,
  getIsOKXInjected,
} from '@ankr.com/provider';
import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';
import { t } from 'common';
import { DEFAULT_WALLET_NAME, PolkadotProvider } from 'polkadot';

import { featuresConfig } from 'modules/common/const';
import { Dialog } from 'uiKit/Dialog';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';
import { Tooltip } from 'uiKit/Tooltip';

import { connect, IConnect } from '../../actions/connect';

import { ReactComponent as Coin98Icon } from './assets/coin98.svg';
import { ReactComponent as CoinbaseIcon } from './assets/coinbase.svg';
import { ReactComponent as HuobiWalletIcon } from './assets/huobi-wallet-icon.svg';
import { ReactComponent as ImTokenWalletIcon } from './assets/imtoken-wallet-icon.svg';
import { ReactComponent as MathWalletIcon } from './assets/math-wallet-icon.svg';
import { ReactComponent as MetaMaskIcon } from './assets/metamask-icon.svg';
import { ReactComponent as OKXIcon } from './assets/okx-wallet-icon.svg';
import { ReactComponent as PolkadotIcon } from './assets/polkadot-icon.svg';
import { ReactComponent as TrustWalletIcon } from './assets/trust-wallet-icon.svg';
import { ReactComponent as WalletConnectIcon } from './assets/wallet-connect-icon.svg';
import { useConnectWalletsModalStyles } from './useConnectWalletsModalStyles';

type THref = string;
type TIsDisabled = boolean;
type TIsInjected = boolean;
type TProviderId = AvailableWriteProviders;
type TWalletId = EWalletId | string;

type TWallets = IWalletItem[][];

const isMetamaskInjected = getIsMetamaskInjected();
const isCoinbaseInjected = getIsCoinbaseInjected();
const isOKXInjected = getIsOKXInjected();
const isCoin98Injected = getIsCoin98Injected();

const isMetaMaskOverridedByCoin98 = !!(
  window.ethereum as { isCoin98: boolean } | undefined
)?.isCoin98;

const isMetaMaskDisabledByOtherWallets = isCoinbaseInjected && isOKXInjected;

const isMetaMaskDisabled =
  isMetaMaskDisabledByOtherWallets || isMetaMaskOverridedByCoin98;

const getMetaMaskTooltipKey = (): string | undefined => {
  if (isMetaMaskOverridedByCoin98) {
    return 'wallets.tooltips.metamask-coin98';
  }

  if (isMetaMaskDisabledByOtherWallets) {
    return 'wallets.tooltips.metamask-other';
  }

  return undefined;
};

interface IConnectWalletsModalProps {
  isOpen: boolean;
  walletsGroupTypes?: AvailableWriteProviders[];
  onClose: () => void;
}

interface IConnectData {
  action: AnyAction;
  data?: IConnect;
  error?: Error;
  isAborted?: boolean;
}

interface IWalletItem {
  href: THref;
  icon: JSX.Element;
  isDisabled: TIsDisabled;
  isHidden: boolean;
  isInjected: TIsInjected;
  providerId: TProviderId;
  title: string;
  tooltip: string | undefined;
  walletId: TWalletId;
}

interface IOnWalletItemClickArgs {
  href: THref;
  isDisabled: TIsDisabled;
  isInjected: TIsInjected;
  providerId: TProviderId;
  walletId: TWalletId;
}

const ETH_COMPATIBLE_WALLETS: TWallets = [
  [
    {
      href: 'https://metamask.io/download/',
      icon: <MetaMaskIcon />,
      isDisabled: isMetaMaskDisabled,
      isHidden: isMobile(),
      isInjected: isMetamaskInjected,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.injected),
      tooltip: getMetaMaskTooltipKey(),
      walletId: EWalletId.injected,
    },
    ...(featuresConfig.isCoin98SupportActive
      ? [
          {
            href: 'https://docs.coin98.com/products/coin98-super-app/extension#install-coin98-extension',
            icon: <Coin98Icon style={{ width: 64, height: 64 }} />,
            isDisabled: false,
            isHidden: isMobile(),
            isInjected: isCoin98Injected,
            providerId: AvailableWriteProviders.ethCompatible,
            title: getWalletName(EWalletId.coin98),
            tooltip: undefined,
            walletId: EWalletId.coin98,
          },
        ]
      : []),
    {
      href: 'https://www.coinbase.com/wallet',
      icon: <CoinbaseIcon />,
      isDisabled: false,
      isHidden: false,
      isInjected: isCoinbaseInjected,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.coinbase),
      tooltip: undefined,
      walletId: EWalletId.coinbase,
    },
    {
      href: '',
      icon: <WalletConnectIcon />,
      isDisabled: false,
      isHidden: false,
      isInjected: true,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.walletconnect),
      tooltip: undefined,
      walletId: EWalletId.walletconnect,
    },
    {
      href: '',
      icon: <ImTokenWalletIcon />,
      isDisabled: false,
      isHidden: false,
      isInjected: true,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.imtoken),
      tooltip: undefined,
      walletId: EWalletId.imtoken,
    },
  ],
  [
    {
      href: '',
      icon: <MathWalletIcon />,
      isDisabled: false,
      isHidden: false,
      isInjected: true,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.math),
      tooltip: undefined,
      walletId: EWalletId.math,
    },
    {
      href: '',
      icon: <TrustWalletIcon />,
      isDisabled: false,
      isHidden: false,
      isInjected: true,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.trust),
      tooltip: undefined,
      walletId: EWalletId.trust,
    },
    {
      href: '',
      icon: <HuobiWalletIcon />,
      isDisabled: false,
      isHidden: false,
      isInjected: true,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.huobi),
      tooltip: undefined,
      walletId: EWalletId.huobi,
    },
    {
      href: 'https://www.okx.com/wallet-docs/#download-guide',
      icon: <OKXIcon />,
      isDisabled: false,
      isHidden: isMobile(),
      isInjected: isOKXInjected,
      providerId: AvailableWriteProviders.ethCompatible,
      title: getWalletName(EWalletId.okxwallet),
      tooltip: undefined,
      walletId: EWalletId.okxwallet,
    },
  ],
];

const POLKADOT_COMPATIBLE_WALLETS: TWallets = [
  [
    {
      href: 'https://polkadot.js.org/extension/',
      icon: <PolkadotIcon />,
      get isDisabled() {
        const providerManager = ProviderManagerSingleton.getInstance();
        const ethProvider = providerManager.getWriteProviderById(
          AvailableWriteProviders.ethCompatible,
        );

        return !ethProvider?.isConnected();
      },
      isHidden: false,
      get isInjected() {
        return PolkadotProvider.isInjected();
      },
      providerId: AvailableWriteProviders.polkadotCompatible,
      title: DEFAULT_WALLET_NAME,
      tooltip: 'wallets.tooltips.polkadot',
      walletId: 'polkadot',
    },
  ],
];

export const AVAILABLE_WALLETS_GROUP_TYPES = [
  AvailableWriteProviders.ethCompatible,
  AvailableWriteProviders.polkadotCompatible,
];

// todo: it is necessary to decompose the component
export const ConnectWalletsModal = ({
  isOpen = false,
  walletsGroupTypes,
  onClose,
}: IConnectWalletsModalProps): JSX.Element => {
  const classes = useConnectWalletsModalStyles();
  const dispatchRequest = useDispatchRequest();

  const [isLoading, setIsLoading] = useState(false);

  const availableWallets = useMemo(() => {
    if (!walletsGroupTypes?.length) {
      return [...ETH_COMPATIBLE_WALLETS, ...POLKADOT_COMPATIBLE_WALLETS];
    }

    const resultAvailableWallets: TWallets = [];

    for (let i = 0; i < walletsGroupTypes.length; i += 1) {
      const walletsGroupType = walletsGroupTypes[i];

      switch (walletsGroupType) {
        case AvailableWriteProviders.ethCompatible:
          resultAvailableWallets.push(...ETH_COMPATIBLE_WALLETS);
          break;

        case AvailableWriteProviders.polkadotCompatible:
          resultAvailableWallets.push(...POLKADOT_COMPATIBLE_WALLETS);
          break;

        default:
          break;
      }
    }

    return resultAvailableWallets;
  }, [walletsGroupTypes]);

  const onWalletItemClick =
    ({
      href,
      isDisabled,
      isInjected,
      providerId,
      walletId,
    }: IOnWalletItemClickArgs) =>
    async (): Promise<void> => {
      if (!isInjected) {
        window.open(href, '_blank', 'noopener, noreferrer');

        return;
      }

      if (isDisabled) {
        return;
      }

      setIsLoading(true);

      const connectData: IConnectData = await dispatchRequest(
        connect(providerId, walletId, onClose),
      );

      if (connectData?.error) {
        setIsLoading(false);
      }
    };

  return (
    <Dialog
      className={classes.root}
      isHiddenCloseBtn={isLoading}
      open={isOpen}
      onClose={onClose}
    >
      <Box width="100%">
        <Typography className={classes.title} variant="h3">
          {t('wallets.modal-title')}
        </Typography>

        {isLoading && (
          <Box className={classes.loading}>
            <QueryLoadingAbsolute />
          </Box>
        )}

        {!isLoading && (
          <Grid container spacing={2}>
            {availableWallets.map(
              (walletsGroup): JSX.Element => (
                <Fragment key={uid(walletsGroup)}>
                  {walletsGroup.map(
                    (walletItem: IWalletItem): JSX.Element | null => {
                      const {
                        href,
                        icon,
                        isDisabled,
                        isHidden,
                        isInjected,
                        providerId,
                        title,
                        tooltip,
                        walletId,
                      } = walletItem;

                      if (isHidden) {
                        return null;
                      }

                      return (
                        <Grid key={uid(walletItem)} item sm={4} xs={12}>
                          <Tooltip
                            arrow
                            title={isDisabled && tooltip ? t(tooltip) : ''}
                          >
                            <ButtonBase
                              className={classNames(
                                classes.walletItem,
                                isDisabled && classes.walletItemDisabled,
                                isDisabled &&
                                  isInjected &&
                                  classes.walletItemDisabledCursor,
                              )}
                              onClick={onWalletItemClick({
                                href,
                                isDisabled,
                                isInjected,
                                providerId,
                                walletId,
                              })}
                            >
                              {icon}

                              <Typography
                                className={classes.walletItemTitle}
                                variant="h5"
                              >
                                {title}
                              </Typography>

                              {!isInjected && (
                                <Typography
                                  className={classes.walletItemInstall}
                                  variant="subtitle2"
                                >
                                  {t('wallets.wallet-install')}
                                </Typography>
                              )}
                            </ButtonBase>
                          </Tooltip>
                        </Grid>
                      );
                    },
                  )}
                </Fragment>
              ),
            )}
          </Grid>
        )}
      </Box>
    </Dialog>
  );
};
