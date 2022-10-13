import { Box, BoxProps, Typography } from '@material-ui/core';
import { uid } from 'react-uid';

import { t } from 'common';

import { useLocaleMemo } from 'modules/i18n/hooks/useLocaleMemo';

import { useTokensTableStyles } from './useTokensTableStyles';

interface ITokensTableProps extends BoxProps {}

export const TokensTable = ({
  children,
  ...restBoxProps
}: ITokensTableProps): JSX.Element => {
  const classes = useTokensTableStyles();

  const items = useLocaleMemo(
    () => [
      t('calc.table.token'),
      t('calc.table.apy'),
      t('calc.table.amount'),
      t('calc.table.yield'),
    ],
    [],
  );

  return (
    <Box {...restBoxProps}>
      <div className={classes.head}>
        <div className={classes.row}>
          {items.map(item => (
            <div key={uid(item)} className={classes.col}>
              <Typography className={classes.headText} color="textSecondary">
                {item}
              </Typography>
            </div>
          ))}
        </div>
      </div>

      <div className={classes.body}>{children}</div>
    </Box>
  );
};
