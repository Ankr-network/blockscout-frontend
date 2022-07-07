import { Box, Paper } from '@material-ui/core';
import { useQuery } from '@redux-requests/react';
import BigNumber from 'bignumber.js';
import { uid } from 'react-uid';

import { t, tHTML } from 'common';

import { DEFAULT_ROUNDING } from 'modules/common/const';
import { OpenOceanIcon } from 'uiKit/Icons/OpenOceanIcon';
import { NavLink } from 'uiKit/NavLink';

import { getStakeTradeInfoData } from '../../actions/getStakeTradeInfoData';

import { useStakeTradeInfoStyles } from './useStakeTradeInfoStyles';

const getFormattedVal = (value: BigNumber): string =>
  value.decimalPlaces(DEFAULT_ROUNDING).toFormat();

export const StakeTradeInfo = (): JSX.Element | null => {
  const classes = useStakeTradeInfoStyles();

  const { data, loading: isLoadingData } = useQuery({
    type: getStakeTradeInfoData,
  });

  if (isLoadingData || data === null) {
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
                tokenOne: data[0].token,
                valueTwo: getFormattedVal(data[1].discountPct),
                tokenTwo: data[1].token,
              })
            : tHTML('stake.trade-info.description-one-token', {
                value: getFormattedVal(data[0].discountPct),
                token: data[0].token,
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
            >
              {t('stake.stake', {
                token: item.token,
              })}
            </NavLink>
          ),
        )}
      </Box>
    </Paper>
  );
};
