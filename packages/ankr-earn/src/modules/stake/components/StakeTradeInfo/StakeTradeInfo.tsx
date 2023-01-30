import { t, tHTML } from '@ankr.com/common';
import { Box, Paper } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { uid } from 'react-uid';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { getTokenName } from 'modules/common/utils/getTokenName';
import { nativeOpenOceanTokenMap } from 'modules/stake/const';
import { OpenOceanIcon } from 'uiKit/Icons/OpenOceanIcon';
import { NavLink } from 'uiKit/NavLink';

import { getStakeTradeInfoData } from '../../actions/getStakeTradeInfoData';

import { useStakeTradeAnalytics } from './useStakeTradeAnalytics';
import { useStakeTradeInfoStyles } from './useStakeTradeInfoStyles';

const getFormattedVal = (value: BigNumber): string =>
  value.decimalPlaces(DEFAULT_ROUNDING).toFormat();

export const StakeTradeInfo = (): JSX.Element | null => {
  const classes = useStakeTradeInfoStyles();
  const { onTrackGetSyntToken } = useStakeTradeAnalytics();

  const { data } = useQuery({
    type: getStakeTradeInfoData,
  });

  if (data === null) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <OpenOceanIcon className={classes.icon} />

      <Box className={classes.infoArea}>
        <Box className={classes.title}>{t('stake.trade-info.title')}</Box>

        <Box>
          {data.length === 2
            ? tHTML('stake.trade-info.description-two-tokens', {
                valueOne: getFormattedVal(data[0].discountPct),
                tokenOne: getTokenName(data[0].token as unknown as string),
                valueTwo: getFormattedVal(data[1].discountPct),
                tokenTwo: getTokenName(data[1].token as unknown as string),
              })
            : tHTML('stake.trade-info.description-one-token', {
                value: getFormattedVal(data[0].discountPct),
                token: getTokenName(data[0].token as unknown as string),
              })}
        </Box>
      </Box>

      <Box className={classes.actionsArea}>
        {data.map(
          (item): JSX.Element => (
            <NavLink
              key={uid(item)}
              className={classes.link}
              href={item.link}
              variant="outlined"
              onMouseDown={onTrackGetSyntToken(
                nativeOpenOceanTokenMap[item.token],
                item.token,
              )}
              onTouchStart={onTrackGetSyntToken(
                nativeOpenOceanTokenMap[item.token],
                item.token,
              )}
            >
              {t('stake.stake', {
                token: getTokenName(item.token as unknown as string),
              })}
            </NavLink>
          ),
        )}
      </Box>
    </Paper>
  );
};
