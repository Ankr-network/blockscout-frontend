import React from 'react';
import { Box } from '@material-ui/core';
import { NavLink } from 'ui';

import { t } from 'modules/i18n/utils/intl';
import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { useStyles } from './TransactionButtonStyles';
import { ReactComponent as OpenLinkIcon } from 'uiKit/Icons/open-link.svg';
import { useAppSelector } from 'store/useAppSelector';
import { selectTransaction } from 'domains/account/store/accountTopUpSlice';
import { getExplorerLink } from './TransactionButtonUtils';

export const TransactionButton = () => {
  const classes = useStyles();

  const transaction = useAppSelector(selectTransaction);

  return (
    <Box className={classes.root}>
      <CopyToClipIcon
        className={classes.copyToClip}
        message={t('common.copy-message')}
        size="l"
        copyText={t('top-up-steps.copy-button')}
        textColor="textPrimary"
        text={transaction?.topUpTransactionHash ?? ''}
      />
      <NavLink
        href={getExplorerLink(transaction?.topUpTransactionHash)}
        className={classes.link}
        tabIndex={0}
        size="small"
        startIcon={<OpenLinkIcon className={classes.icon} />}
      />
    </Box>
  );
};
