import { Typography } from '@mui/material';
import { t } from '@ankr.com/common';

import { INTL_ROOT } from '../../../../const';
import { useBlockStyles } from './useBlockStyles';

const intl = `${INTL_ROOT}.scale-plan`;

const ROW_COUNTS = 4;
const COLUMN_COUNTS = 3;

export const Block = () => {
  const { classes } = useBlockStyles();

  return (
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
  );
};
