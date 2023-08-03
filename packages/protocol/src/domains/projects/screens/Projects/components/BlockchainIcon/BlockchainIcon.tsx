import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { getBlockchainsUrls } from 'uiKit/utils/getTokenIcon';
import { useThemes } from 'uiKit/Theme/hook/useThemes';

import { useBlockchainIconStyles } from './useBlockchainIconStyles';

interface BlockchainIconProps {
  blockchains: string[];
}

const MAX_VISIBLE_ICONS_COUNT = 5;

export const BlockchainIcon = ({ blockchains }: BlockchainIconProps) => {
  const { classes } = useBlockchainIconStyles();

  const { isLightTheme } = useThemes();

  const blockchainUrls = getBlockchainsUrls(blockchains, isLightTheme);

  const additionalBlockchainsCount =
    blockchainUrls.length - MAX_VISIBLE_ICONS_COUNT;

  const visibleChains = blockchainUrls.slice(0, MAX_VISIBLE_ICONS_COUNT);

  return (
    <div className={classes.root}>
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
          {t('projects.new-project.checkout-step.more', {
            additionalBlockchainsCount,
          })}
        </Typography>
      )}
    </div>
  );
};
