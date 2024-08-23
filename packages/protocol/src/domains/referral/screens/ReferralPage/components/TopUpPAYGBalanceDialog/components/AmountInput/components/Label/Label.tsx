import BigNumber from 'bignumber.js';
import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { labelTranslation } from './translation';
import { useLabelStyles } from './useLabelStyles';

export interface ILabelProps {
  bonuses: number;
}

export const Label = ({ bonuses }: ILabelProps) => {
  const { classes } = useLabelStyles();
  const { keys, t } = useTranslation(labelTranslation);

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="subtitle2">
        {t(keys.title)}
      </Typography>
      <Typography className={classes.bonuses} variant="body3">
        {t(keys.bonuses, { bonuses: new BigNumber(bonuses).toFormat() })}
      </Typography>
    </div>
  );
};
