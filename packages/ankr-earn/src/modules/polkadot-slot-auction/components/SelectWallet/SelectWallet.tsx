import { Box, Link, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { t } from 'modules/i18n/utils/intl';
import React, { FunctionComponent } from 'react';
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
}: IWalletItemProps) {
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
        variant="subtitle1"
        color="textPrimary"
        className={classes.walletName}
      >
        {walletName}
      </Typography>
      {href && (
        <Link component="div" className={classes.action}>
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
}: ISelectWalletProps) => {
  return (
    <Box pt={2} textAlign="center">
      <Box mb={7.5} ml="auto" mr="auto" maxWidth={500}>
        {isCloverWalletAvailable || isPolkadotWalletAvailable ? (
          <Typography variant="h4">
            {t('polkadot-slot-auction.select-wallet.title-select')}
          </Typography>
        ) : (
          <Typography variant="h4">
            {t('polkadot-slot-auction.select-wallet.title-install')}
          </Typography>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mb={10}>
        <WalletItem
          Icon={CloverWalletIcon}
          walletName={t('polkadot-slot-auction.select-wallet.wallet.clover')}
          preferable={true}
          href={!isCloverWalletAvailable ? CLOVER_LINK : undefined}
        />
        <WalletItem
          Icon={PolkadotWalletIcon}
          walletName={t('polkadot-slot-auction.select-wallet.wallet.polkadot')}
          href={!isPolkadotWalletAvailable ? POLKADOT_LINK : undefined}
          onClick={isPolkadotWalletAvailable ? handleConnect : undefined}
        />
      </Box>
    </Box>
  );
};
