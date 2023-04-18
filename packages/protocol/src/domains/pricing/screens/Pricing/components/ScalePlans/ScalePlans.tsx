import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';
import { Check } from '@ankr.com/ui';

import { INTL_ROOT } from '../../const';
import { useScalePlansStyles } from './useScalePlansStyles';

const intl = `${INTL_ROOT}.scale-plan`;

const ROW_COUNTS = 4;
const COLUMN_COUNTS = 3;

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
            <Typography variant="subtitle1" className={classes.item}>
              <div className={classes.check}>
                <Check />
              </div>
              {t(`${intl}.item-${index + 1}`)}
            </Typography>
          ))}
        </div>
        <div className={classes.block}>
          <div className={classes.header}>
            {new Array(COLUMN_COUNTS).fill('').map((_, index) => (
              <Typography
                key={`header-${index + 1}`}
                variant="subtitle1"
                className={classes.headerItem}
              >
                {t(`${intl}.header-${index + 1}`)}
              </Typography>
            ))}
          </div>
          {new Array(ROW_COUNTS).fill('').map((_row, rowIndex) => (
            <div key={`row-${rowIndex + 1}`} className={classes.cellRow}>
              {new Array(COLUMN_COUNTS).fill('').map((_column, columnIndex) => (
                <Typography
                  key={`column-${columnIndex + 1}`}
                  className={classes.cell}
                >
                  {t(`${intl}.row-${rowIndex + 1}-column-${columnIndex + 1}`)}
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
