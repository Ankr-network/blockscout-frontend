import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { scalePlansTranslation } from './scalePlansTranslation';
import { useScalePlansStyles } from './useScalePlansStyles';

export const WssBlock = () => {
  const { classes, cx } = useScalePlansStyles();

  const { keys, t } = useTranslation(scalePlansTranslation);

  return (
    <div className={classes.block}>
      <div className={cx(classes.row, classes.borderBottom, classes.headerRow)}>
        <Typography variant="body2" className={classes.header}>
          {t(keys.wssHeader)}
        </Typography>
        <Typography variant="body2" className={classes.header}>
          {t(keys.apiCredits)}
        </Typography>
        <Typography
          variant="body2"
          className={cx(classes.header, classes.usdColumn)}
        >
          {t(keys.usd)}
        </Typography>
      </div>
      <div className={classes.fullRow}>
        <Typography variant="subtitle2" className={classes.bold}>
          {t(keys.wssConnection)}
        </Typography>
      </div>
      <div className={cx(classes.row, classes.subrow, classes.borderBottom)}>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys.evm)}
        </Typography>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys['200000'])}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.thin, classes.usdColumn)}
        >
          {t(keys.cent2)}
        </Typography>
      </div>
      <div className={cx(classes.row, classes.subrow, classes.borderBottom)}>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys.solana)}
        </Typography>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys['500000'])}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.thin, classes.usdColumn)}
        >
          {t(keys.cent5)}
        </Typography>
      </div>
      <div className={cx(classes.row, classes.subrow, classes.borderBottom)}>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys.other)}
        </Typography>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys['100000'])}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.thin, classes.usdColumn)}
        >
          {t(keys.cent1)}
        </Typography>
      </div>
      <div className={classes.fullRow}>
        <Typography variant="subtitle2" className={classes.bold}>
          {t(keys.notifications)}
        </Typography>
      </div>
      <div className={cx(classes.row, classes.subrow, classes.borderBottom)}>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys.evm)}
        </Typography>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys['200000'])}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.thin, classes.usdColumn)}
        >
          {t(keys.cent2)}
        </Typography>
      </div>
      <div className={cx(classes.row, classes.subrow, classes.borderBottom)}>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys.solana)}
        </Typography>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys['500000'])}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.thin, classes.usdColumn)}
        >
          {t(keys.cent5)}
        </Typography>
      </div>
      <div className={cx(classes.row, classes.subrow, classes.borderBottom)}>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys.other)}
        </Typography>
        <Typography variant="subtitle2" className={classes.thin}>
          {t(keys['100000'])}
        </Typography>
        <Typography
          variant="subtitle2"
          className={cx(classes.thin, classes.usdColumn)}
        >
          {t(keys.cent1)}
        </Typography>
      </div>
    </div>
  );
};
