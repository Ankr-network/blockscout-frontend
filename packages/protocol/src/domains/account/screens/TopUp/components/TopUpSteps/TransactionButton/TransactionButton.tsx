import React from 'react';
import { Box } from '@mui/material';
import { NavLink } from 'uiKit/NavLink';

import { t } from '@ankr.com/common';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './TransactionButtonStyles';
import { ExternalLink } from '@ankr.com/ui';
import { getExplorerLink } from './TransactionButtonUtils';

interface ITransactionButton {
  transactionHash?: string;
}

export const TransactionButton = ({
  transactionHash = '',
}: ITransactionButton) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.root}>
      <CopyToClipIcon
        className={classes.copyToClip}
        message={t('common.copy-message')}
        size="l"
        copyText={t('top-up-steps.copy-button')}
        textColor="textPrimary"
        text={transactionHash}
      />
      <NavLink
        href={getExplorerLink(transactionHash)}
        className={classes.link}
        tabIndex={0}
        startIcon={<ExternalLink className={classes.icon} />}
      />
    </Box>
  );
};
