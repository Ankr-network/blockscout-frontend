import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { getBlockchainsUrls } from 'uiKit/utils/getTokenIcon';
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
  moreLabelKey = 'projects.new-project.checkout-step.more',
  isPaddingLeftIgnored,
}: BlockchainIconProps) => {
  const { classes, cx } = useBlockchainIconStyles();

  const { isLightTheme } = useThemes();

  const blockchainUrls = useMemo(
    () => getBlockchainsUrls(blockchains, isLightTheme),
    [blockchains, isLightTheme],
  );

  const additionalBlockchainsCount =
    blockchainUrls.length - MAX_VISIBLE_ICONS_COUNT;

  const visibleChains = blockchainUrls.slice(0, MAX_VISIBLE_ICONS_COUNT);

  return (
    <div
      className={cx(classes.root, {
        [classes.noPaddingLeft]: isPaddingLeftIgnored,
      })}
    >
      {visibleChains.map(src => (
        <img
          key={src}
          className={classes.icon}
          src={src}
          alt="blockchain icon"
        />
      ))}
      {blockchainUrls.length > MAX_VISIBLE_ICONS_COUNT && (
        <Typography className={classes.more} variant="caption">
          {t(moreLabelKey, { additionalBlockchainsCount })}
        </Typography>
      )}
    </div>
  );
};
