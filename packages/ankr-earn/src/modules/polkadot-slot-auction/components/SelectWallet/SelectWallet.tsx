import { Box, Link, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { FunctionComponent } from 'react';

import { t } from 'common';

import { ReactComponent as CloverWalletIcon } from './assets/cloverWallet.svg';
import { ReactComponent as PolkadotWalletIcon } from './assets/polkadotWallet.svg';
import { useSelectWalletStyles } from './useSelectWalletStyles';

const CLOVER_LINK =
  'https://chrome.google.com/webstore/detail/clover-wallet/nhnkbkgjikgcigadomkphalanndcapjk';
const POLKADOT_LINK = 'https://polkadot.js.org/extension/';

interface IWalletItemProps {
  Icon: FunctionComponent;
  walletName: string;
  preferable?: boolean;
  href?: string;
  onClick?: () => void;
}

function WalletItem({
  Icon,
  walletName,
  preferable,
  href,
  onClick,
}: IWalletItemProps): JSX.Element {
  const classes = useSelectWalletStyles();
  const RootComponent = href ? 'a' : 'div';

  return (
    <RootComponent
      className={classNames(classes.walletItem, classes.link)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      onClick={onClick}
    >
      {preferable && (
        <div className={classes.preferable}>
          {t('polkadot-slot-auction.select-wallet.preferred')}
        </div>
      )}

      <Box component={Icon} mb={2} />

      <Typography
        className={classes.walletName}
        color="textPrimary"
        variant="subtitle1"
      >
        {walletName}
      </Typography>

      {href && (
        <Link className={classes.action} component="div">
          {t('polkadot-slot-auction.select-wallet.install')}
        </Link>
      )}
    </RootComponent>
  );
}

interface ISelectWalletProps {
  isCloverWalletAvailable: boolean;
  isPolkadotWalletAvailable: boolean;
  handleConnect: () => void;
}

export const SelectWallet = ({
  isCloverWalletAvailable,
  isPolkadotWalletAvailable,
  handleConnect,
}: ISelectWalletProps): JSX.Element => {
  return (
    <Box pt={2} textAlign="center">
      <Box maxWidth={500} mb={7.5} ml="auto" mr="auto">
        {isCloverWalletAvailable || isPolkadotWalletAvailable ? (
          <Typography variant="h3">
            {t('polkadot-slot-auction.select-wallet.title-select')}
          </Typography>
        ) : (
          <Typography variant="h3">
            {t('polkadot-slot-auction.select-wallet.title-install')}
          </Typography>
        )}
      </Box>

      <Box
        alignItems="center"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-around"
        mb={10}
      >
        <WalletItem
          preferable
          href={!isCloverWalletAvailable ? CLOVER_LINK : undefined}
          Icon={CloverWalletIcon}
          walletName={t('polkadot-slot-auction.select-wallet.wallet.clover')}
        />

        <WalletItem
          href={!isPolkadotWalletAvailable ? POLKADOT_LINK : undefined}
          Icon={PolkadotWalletIcon}
          walletName={t('polkadot-slot-auction.select-wallet.wallet.polkadot')}
          onClick={isPolkadotWalletAvailable ? handleConnect : undefined}
        />
      </Box>
    </Box>
  );
};
