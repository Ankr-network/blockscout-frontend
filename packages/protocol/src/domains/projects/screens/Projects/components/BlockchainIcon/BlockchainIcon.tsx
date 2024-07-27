import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { getChainIcon } from 'uiKit/utils/getTokenIcon';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useBlockchainIconStyles } from './useBlockchainIconStyles';

interface BlockchainIconProps {
  blockchains: string[];
  moreLabelKey?: string;
  isPaddingLeftIgnored?: boolean;
}

const MAX_VISIBLE_ICONS_COUNT = 5;

export const BlockchainIcon = ({
  blockchains,
  isPaddingLeftIgnored,
  moreLabelKey = 'projects.new-project.checkout-step.more',
}: BlockchainIconProps) => {
  const { classes, cx } = useBlockchainIconStyles();

  const { isLightTheme } = useThemes();

  const blockchainsMapped = useMemo(() => {
    const allBlockchains = blockchains.map(blockchain => ({
      id: blockchain,
      src: getChainIcon(blockchain, isLightTheme),
    }));

    // we are filtering similar blockchain icons here to avoid duplicates for mainnet and testnet
    return allBlockchains.filter(
      (blockchain, index, self) =>
        index === self.findIndex(({ src }) => src === blockchain.src),
    );
  }, [blockchains, isLightTheme]);

  const additionalBlockchainsCount =
    blockchainsMapped.length - MAX_VISIBLE_ICONS_COUNT;

  const visibleChains = blockchainsMapped.slice(0, MAX_VISIBLE_ICONS_COUNT);

  return (
    <div
      className={cx(classes.root, {
        [classes.noPaddingLeft]: isPaddingLeftIgnored,
      })}
    >
      {visibleChains.map(({ id, src }) => (
        <img
          key={id}
          className={cx(classes.icon, classes[id as keyof typeof classes])}
          src={src}
          alt="blockchain icon"
        />
      ))}
      {blockchainsMapped.length > MAX_VISIBLE_ICONS_COUNT && (
        <Typography className={classes.more} variant="caption">
          {t(moreLabelKey, { additionalBlockchainsCount })}
        </Typography>
      )}
    </div>
  );
};
