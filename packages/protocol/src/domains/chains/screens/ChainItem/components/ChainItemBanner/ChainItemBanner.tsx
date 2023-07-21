import { Paper } from '@mui/material';
import { Mark } from '@ankr.com/ui';

import { InfoBanner } from 'modules/common/components/InfoBanner';

import { useChainItemBannerStyles } from './ChainItemBannerStyles';

interface ChainItemBannerProps {
  message: string;
}

// Don't remove. Use this banner for info message

export const ChainItemBanner = ({ message }: ChainItemBannerProps) => {
  const { classes } = useChainItemBannerStyles();

  return (
    <Paper className={classes.root}>
      <InfoBanner icon={<Mark />} message={message} />
    </Paper>
  );
};
