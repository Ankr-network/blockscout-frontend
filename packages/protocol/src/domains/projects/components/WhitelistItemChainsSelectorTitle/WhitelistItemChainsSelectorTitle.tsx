import { t } from '@ankr.com/common';
import { Typography } from '@mui/material';

import { useWhitelistItemChainsSelectorTitleStyles } from './useWhitelistItemChainsSelectorTitleStyles';

export const WhitelistItemChainsSelectorTitle = () => {
  const { classes } = useWhitelistItemChainsSelectorTitleStyles();

  return (
    <Typography className={classes.root} component="p" variant="subtitle2">
      {t('projects.whitelist-item-chains-selector.title')}
    </Typography>
  );
};
