import { t, tHTML } from '@ankr.com/common';
import { Box, Paper } from '@material-ui/core';
import BigNumber from 'bignumber.js';

import { ZERO } from '@ankr.com/staking-sdk';

import { OpenOceanIcon } from 'uiKit/Icons/OpenOceanIcon';
import { NavLink } from 'uiKit/NavLink';

import { useTradeInfoStyles } from './useTradeInfoStyles';

const MIN_STAKE_TRADE_INFO_DISCOUNT_VAL = 0.5;

interface ITradeInfoProps {
  discountPct?: BigNumber;
  link: string;
  token: string;
  onLinkClick?: () => void;
}

export const TradeInfo = ({
  discountPct = ZERO,
  link,
  token,
  onLinkClick,
}: ITradeInfoProps): JSX.Element | null => {
  const classes = useTradeInfoStyles();

  const isSignificantDiscount = discountPct.isGreaterThanOrEqualTo(
    MIN_STAKE_TRADE_INFO_DISCOUNT_VAL,
  );

  if (!isSignificantDiscount) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <OpenOceanIcon className={classes.icon} />

      <Box className={classes.infoArea}>
        <Box className={classes.title}>{t('stake.trade-info.title')}</Box>

        <Box>
          {tHTML('stake.trade-info.description', {
            value: discountPct.round().toFormat(),
            token,
          })}
        </Box>
      </Box>

      <Box className={classes.actionsArea}>
        <NavLink
          className={classes.link}
          href={link}
          variant="outlined"
          onMouseDown={onLinkClick}
          onTouchStart={onLinkClick}
        >
          {t('stake.stake', { token })}
        </NavLink>
      </Box>
    </Paper>
  );
};
