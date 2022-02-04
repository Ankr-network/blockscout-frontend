import { Paper, Typography } from '@material-ui/core';
import cn from 'classnames';

import { t } from 'modules/i18n/utils/intl';
import { getTxLinkByNetwork } from 'modules/common/utils/getTxLinkByNetwork';
import { CloseIcon } from 'uiKit/Icons/CloseIcon';
import { ExternalLinkIcon } from 'uiKit/Icons/ExternalLinkIcon';
import { NavLink } from 'uiKit/NavLink';
import { useTransactionInfoStyles } from './useTransactionInfoStyles';

export type TStatusTx = 'success' | 'failed';

export interface ITransactionInfoProps {
  chainId: number;
  type: TStatusTx;
  txHash?: string;
  className?: string;
  onClose: () => void;
}

export const TransactionInfo = ({
  type,
  className,
  chainId,
  txHash = '',
  onClose,
}: ITransactionInfoProps): JSX.Element | null => {
  const classes = useTransactionInfoStyles();

  return (
    <Paper className={cn(classes.root, className)}>
      <div className={classes.wrapper}>
        <div
          className={cn(
            classes.status,
            type === 'success' ? classes.success : classes.error,
          )}
        />

        <Typography className={classes.title}>
          {t(type === 'success' ? 'common.successTx' : 'common.errorTx')}
          {txHash && (
            <NavLink
              className={classes.link}
              href={getTxLinkByNetwork(txHash, chainId)}
              endIcon={<ExternalLinkIcon />}
            >
              {t('common.explorer')}
            </NavLink>
          )}
        </Typography>
      </div>

      <div className={classes.close} role="button" onClick={onClose}>
        <CloseIcon size="xxs" htmlColor="#9AA1B0" />
      </div>
    </Paper>
  );
};
