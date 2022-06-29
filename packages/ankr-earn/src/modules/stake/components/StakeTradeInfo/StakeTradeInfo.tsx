import { Box, Paper } from '@material-ui/core';

import { t, tHTML } from 'common';

import { featuresConfig } from 'modules/common/const';
import { Button } from 'uiKit/Button';
import { OpenOceanIcon } from 'uiKit/Icons/OpenOceanIcon';

import { useStakeTradeInfoStyles } from './useStakeTradeInfoStyles';

export const StakeTradeInfo = (): JSX.Element | null => {
  const classes = useStakeTradeInfoStyles();

  const isTwoTokens = true;

  if (!featuresConfig.isActiveStakeTradeInfo) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <OpenOceanIcon size={66} />

      <Box className={classes.infoArea}>
        <Box className={classes.title}>{t('stake.trade-info.title')}</Box>

        <Box>
          {isTwoTokens
            ? tHTML('stake.trade-info.description-two-tokens', {
                valueOne: 1.87465,
                tokenOne: 'aETHb',
                valueTwo: 1.3001007,
                tokenTwo: 'aETHc',
              })
            : tHTML('stake.trade-info.description-one-token', {
                value: 1.87465,
                token: 'aETHb',
              })}
        </Box>
      </Box>

      <Box className={classes.actionsArea}>
        <Button className={classes.btn} variant="outlined">
          {t('stake.stake', {
            token: 'aETHb',
          })}
        </Button>

        {isTwoTokens && (
          <Button className={classes.btn} variant="outlined">
            {t('stake.stake', {
              token: 'aETHc',
            })}
          </Button>
        )}
      </Box>
    </Paper>
  );
};
