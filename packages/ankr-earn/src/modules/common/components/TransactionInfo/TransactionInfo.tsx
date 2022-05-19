import { Paper, Typography } from '@material-ui/core';
import cn from 'classnames';

import { getTxLinkByNetwork } from 'modules/common/utils/links/getTxLinkByNetwork';
import { t } from 'modules/i18n/utils/intl';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';

import { useTransactionInfoStyles } from './useTransactionInfoStyles';

export type TStatusTx = 'success' | 'failed' | 'default';

export interface ITransactionInfoProps {
  chainId: number;
  type: TStatusTx;
  txHash?: string;
  txError?: string;
  className?: string;
  onClose: () => void;
}

export const TransactionInfo = ({
  type,
  className,
  chainId,
  txHash = '',
  txError = '',
  onClose,
}: ITransactionInfoProps): JSX.Element | null => {
  const classes = useTransactionInfoStyles();

  if (!txError && !txHash) {
    return null;
  }

  return (
    <Paper className={cn(classes.root, className)}>
      <div className={classes.wrapper}>
        <div
          className={cn(
            classes.status,
            type === 'success' && classes.success,
            type === 'failed' && classes.error,
            type === 'default' && classes.default,
          )}
        />

        <Typography className={classes.title}>
          {type === 'success' ? t('common.successTx') : t('common.errorTx')}

          {txError && <span className={classes.errorReason}>{txError}</span>}

          {txHash && (
            <NavLink
              className={classes.link}
              endIcon={<ExternalLinkIcon />}
              href={getTxLinkByNetwork(txHash, chainId)}
            >
              {t('common.explorer')}
            </NavLink>
          )}
        </Typography>
      </div>

      <div
        className={classes.close}
        role="button"
        tabIndex={0}
        onClick={onClose}
      >
        <CloseIcon htmlColor="#9AA1B0" size="xxs" />
      </div>
    </Paper>
  );
};
