import { Typography } from '@mui/material';

import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { useBlockStyles } from './useBlockStyles';
import { scalePlansTranslation } from '../../scalePlansTranslation';

const ROW_COUNTS = 3;
const COLUMN_COUNTS = 3;

export const Block = () => {
  const { classes } = useBlockStyles();

  const { keys, t } = useTranslation(scalePlansTranslation);

  return (
    <div className={classes.block}>
      <div className={classes.header}>
        {new Array(COLUMN_COUNTS).fill('').map((_, index) => (
          <Typography
            key={`header-${index + 1}`}
            variant="subtitle2"
            className={classes.headerItem}
          >
            {t(`${keys}.header${index + 1}`)}
          </Typography>
        ))}
      </div>
      {new Array(ROW_COUNTS).fill('').map((_row, rowIndex) => (
        <div key={`row-${rowIndex + 1}`} className={classes.cellRow}>
          {new Array(COLUMN_COUNTS).fill('').map((_column, columnIndex) => (
            <Typography
              variant="body2"
              key={`column-${columnIndex + 1}`}
              className={classes.cell}
            >
              {t(`${keys}.row${rowIndex + 1}Column${columnIndex + 1}`)}
            </Typography>
          ))}
        </div>
      ))}
    </div>
  );
};
