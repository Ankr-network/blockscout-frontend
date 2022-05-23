import { t } from 'modules/i18n/utils/intl';
import React from 'react';

import { PreparedRequest } from '../../../../types';

import { useStyles } from './RowStyles';

export interface RowProps {
  request: PreparedRequest;
}

export const Row = ({ request: { calls, method, percent } }: RowProps) => {
  const classes = useStyles();

  return (
    <div className={classes.rowRoot}>
      <div className={classes.request}>
        <span>{method}</span>
        <span>{t('chain-item.methods-rating.table.calls', { calls })}</span>
      </div>
      <div className={classes.diagram}>
        <div style={{ width: `${percent * 100}%` }} />
      </div>
    </div>
  );
};
