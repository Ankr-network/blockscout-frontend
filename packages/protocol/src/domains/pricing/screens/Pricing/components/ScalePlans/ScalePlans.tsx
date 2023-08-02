import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Check } from '@ankr.com/ui';

import { INTL_ROOT } from '../../const';
import { useScalePlansStyles } from './useScalePlansStyles';
import { Block } from './components/Block';

const intl = `${INTL_ROOT}.scale-plan`;

const ROW_COUNTS = 4;

export const ScalePlans = () => {
  const { classes } = useScalePlansStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        {t(`${intl}.title`)}
      </Typography>
      <Typography variant="h6" className={classes.intro}>
        <Typography noWrap className={classes.pay}>
          {t(`${intl}.pay-as-you-go`)}
        </Typography>
        {t(`${intl}.intro`)}
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
                <Check />
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
