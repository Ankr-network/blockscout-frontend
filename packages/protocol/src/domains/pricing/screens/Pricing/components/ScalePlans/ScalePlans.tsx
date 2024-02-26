import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Success } from '@ankr.com/ui';

import { INTL_ROOT } from '../../const';
import { useScalePlansStyles } from './useScalePlansStyles';
import { Block } from './components/Block';

const intl = `${INTL_ROOT}.scale-plan`;

const ROW_COUNTS = 4;

export const ScalePlans = () => {
  const { classes } = useScalePlansStyles();

  return (
    <div className={classes.root}>
      <Typography variant="subtitle3" component="p" className={classes.pay}>
        {t(`${intl}.pay-as-you-go`)}
      </Typography>
      <Typography variant="h4" className={classes.title}>
        {t(`${intl}.title`)}
      </Typography>
      <Typography variant="body2" component="p" className={classes.description}>
        {t(`${intl}.description`)}
      </Typography>
      <div className={classes.content}>
        <div className={classes.list}>
          {new Array(ROW_COUNTS).fill('').map((_, index) => (
            <Typography
              variant="subtitle1"
              className={classes.item}
              key={`column-${index + 1}`}
            >
              <div className={classes.check}>
                <Success />
              </div>
              {t(`${intl}.item-${index + 1}`)}
            </Typography>
          ))}
        </div>
        <Block />
      </div>
    </div>
  );
};
