import { Box, Hidden, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import classNames from 'classnames';

import { useIsMDUp } from 'ui';

import { useTokensTableStyles } from './useTokensTableStyles';

export const TokensItemSkeleton = (): JSX.Element => {
  const classes = useTokensTableStyles();
  const isMDUp = useIsMDUp();

  return (
    <Paper className={classes.item} variant={isMDUp ? 'outlined' : 'elevation'}>
      <div className={classes.row}>
        <div className={classes.col}>
          <Skeleton width={100} />
        </div>

        <div className={classNames(classes.col, classes.colXsBordered)}>
          <Skeleton width={50} />
        </div>

        <div className={classes.col}>
          <Hidden mdUp>
            <Box className={classes.label} mb={1.5}>
              <Skeleton width={40} />
            </Box>
          </Hidden>

          <Skeleton
            className={classNames(classes.textFieldSkeleton, classes.textField)}
            height={48}
            variant="rect"
          />
        </div>

        <div className={classNames(classes.col, classes.colXsBordered)}>
          <div className={classes.label}>
            <Skeleton width={40} />
          </div>

          <div>
            <Typography className={classes.text}>
              <Box component="span" display="inline-block">
                <Skeleton width={52} />
              </Box>
            </Typography>

            <Typography
              className={classNames(classes.text, classes.textSecondary)}
              color="textSecondary"
            >
              <Box component="span" display="inline-block">
                <Skeleton width={35} />
              </Box>
            </Typography>
          </div>
        </div>
      </div>
    </Paper>
  );
};
