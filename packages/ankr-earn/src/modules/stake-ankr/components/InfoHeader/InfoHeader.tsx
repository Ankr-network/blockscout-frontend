import { Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { t } from 'common';

import { InfoItem } from './InfoItem';
import { useInfoHeaderStyles } from './useInfoHeaderStyles';

interface IInfoHeaderProps {
  allRewards: BigNumber;
  epochEnd: Date;
}

export const InfoHeader = ({
  allRewards,
  epochEnd,
}: IInfoHeaderProps): JSX.Element => {
  const classes = useInfoHeaderStyles();

  const epochEndDays = epochEnd.getDay();
  const epochEndHours = epochEnd.getHours();
  const epochEndMin = epochEnd.getMinutes();

  const daysText =
    epochEndDays === 1
      ? `${t('stake-ankr.info-header.epoch-ends-day', { value: epochEndDays })}`
      : `${t('stake-ankr.info-header.epoch-ends-days', {
          value: epochEndDays,
        })}`;

  const hoursText =
    epochEndHours === 1
      ? `${t('stake-ankr.info-header.epoch-ends-hour', {
          value: epochEndHours,
        })}`
      : `${t('stake-ankr.info-header.epoch-ends-hours', {
          value: epochEndHours,
        })}`;

  const minText = `${t('stake-ankr.info-header.epoch-ends-min', {
    value: epochEndMin,
  })}`;

  return (
    <Paper className={classes.statisticWrapper} variant="elevation">
      <InfoItem
        primaryValue={t('unit.ankr-value', {
          value: allRewards.toFormat(),
        })}
        title={t('stake-ankr.info-header.all-rewards')}
      />

      <InfoItem
        primaryValue={`${daysText}, ${hoursText}, ${minText}`}
        title={t('stake-ankr.info-header.epoch-ends')}
      />
    </Paper>
  );
};
