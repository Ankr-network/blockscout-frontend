import { Box, Grid, Typography } from '@material-ui/core';
import { useDispatchRequest } from '@redux-requests/react';
import React, { useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { AnyAction } from 'redux';

import { DEFAULT_WALLET_NAME, PolkadotProvider } from 'polkadot';
import {
  AvailableWriteProviders,
  EWalletId,
  Web3KeyReadProvider,
} from 'provider';

import { featuresConfig } from 'modules/common/const';
import { t } from 'modules/i18n/utils/intl';
import { Container } from 'uiKit/Container';
import { Dialog } from 'uiKit/Dialog';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { connect, IConnect } from '../../actions/connect';

import { ReactComponent as HuobiWalletIcon } from './assets/huobi-wallet-icon.svg';
import { ReactComponent as ImTokenWalletIcon } from './assets/imtoken-wallet-icon.svg';
import { ReactComponent as MathWalletIcon } from './assets/math-wallet-icon.svg';
import { ReactComponent as MetaMaskIcon } from './assets/metamask-icon.svg';
import { ReactComponent as PolkadotIcon } from './assets/polkadot-icon.svg';
import { ReactComponent as TrustWalletIcon } from './assets/trust-wallet-icon.svg';
import { ReactComponent as WalletConnectIcon } from './assets/wallet-connect-icon.svg';
import { useConnectWalletsModalStyles } from './useConnectWalletsModalStyles';

type TWallets = IWalletItem[][];

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
  icon: JSX.Element;
  isInjected: boolean;
  href: string;
  providerId: AvailableWriteProviders;
  title: string;
  walletId: EWalletId | string;
}

const ETH_COMPATIBLE_WALLETS: TWallets = [
  [
    {
      icon: <MetaMaskIcon />,
      get isInjected() {
        return Web3KeyReadProvider.isInjected();
      },
      href: 'https://metamask.io/download/',
      providerId: AvailableWriteProviders.ethCompatible,
      title: 'MetaMask',
      walletId: EWalletId.injected,
    },
    {
      icon: <WalletConnectIcon />,
      isInjected: true,
      href: '',
      providerId: AvailableWriteProviders.ethCompatible,
      title: 'WalletConnect',
      walletId: EWalletId.walletconnect,
    },
    {
      icon: <ImTokenWalletIcon />,
      isInjected: true,
      href: '',
      providerId: AvailableWriteProviders.ethCompatible,
      title: 'imToken',
      walletId: EWalletId.imtoken,
    },
  ],
  [
    {
      icon: <MathWalletIcon />,
      isInjected: true,
      href: '',
      providerId: AvailableWriteProviders.ethCompatible,
      title: 'Math Wallet',
      walletId: EWalletId.math,
    },
    {
      icon: <TrustWalletIcon />,
      isInjected: true,
      href: '',
      providerId: AvailableWriteProviders.ethCompatible,
      title: 'Trust Wallet',
      walletId: EWalletId.trust,
    },
    {
      icon: <HuobiWalletIcon />,
      isInjected: true,
      href: '',
      providerId: AvailableWriteProviders.ethCompatible,
      title: 'Huobi Wallet',
      walletId: EWalletId.huobi,
    },
  ],
];

const POLKADOT_COMPATIBLE_WALLETS: TWallets = [
  [
    {
      icon: <PolkadotIcon />,
      get isInjected() {
        return PolkadotProvider.isInjected();
      },
      href: 'https://polkadot.js.org/extension/',
      providerId: AvailableWriteProviders.polkadotCompatible,
      title: DEFAULT_WALLET_NAME,
      walletId: 'polkadot',
    },
  ],
];

export const AVAILABLE_WALLETS_GROUP_TYPES =
  featuresConfig.isActivePolkadotWallet
    ? [
        AvailableWriteProviders.ethCompatible,
        AvailableWriteProviders.polkadotCompatible,
      ]
    : [AvailableWriteProviders.ethCompatible];

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
      return featuresConfig.isActivePolkadotWallet
        ? [...ETH_COMPATIBLE_WALLETS, ...POLKADOT_COMPATIBLE_WALLETS]
        : [...ETH_COMPATIBLE_WALLETS];
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
    (
      isInjected: boolean,
      href: string,
      providerId: AvailableWriteProviders,
      walletId: EWalletId | string,
    ) =>
    async (): Promise<void> => {
      if (!isInjected) {
        window.open(href, '_blank', 'noopener, noreferrer');

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
      <Container className={classes.container}>
        <Typography className={classes.title} variant="h3">
          {t('wallets.modal-title')}
        </Typography>

        {isLoading && (
          <Box className={classes.loading}>
            <QueryLoadingAbsolute />
          </Box>
        )}

        {!isLoading && (
          <Grid container direction="column">
            {availableWallets.map(
              (walletsGroup): JSX.Element => (
                <Grid key={uid(walletsGroup)} container item xs direction="row">
                  {walletsGroup.map((walletItem): JSX.Element => {
                    const {
                      icon,
                      isInjected,
                      href,
                      providerId,
                      title,
                      walletId,
                    } = walletItem;

                    return (
                      <Grid
                        key={uid(walletItem)}
                        item
                        xs
                        className={classes.walletItem}
                        onClick={onWalletItemClick(
                          isInjected,
                          href,
                          providerId,
                          walletId,
                        )}
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
                      </Grid>
                    );
                  })}
                </Grid>
              ),
            )}
          </Grid>
        )}
      </Container>
    </Dialog>
  );
};
