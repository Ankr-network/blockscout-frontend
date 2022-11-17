import { Box, Typography } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React, { ReactElement } from 'react';

import { tHTML } from 'common';

import { Token } from 'modules/common/types/token';

import { useRewardTokenInfoStyles } from './useRewardTokenInfoStyles';

interface IRewardTokenInfoProps {
  iconSlot: ReactElement;
  token: Token;
  synthToken: Token;
  synthAmount: BigNumber;
  amount: BigNumber;
}

export const RewardTokenInfo = ({
  iconSlot,
  token,
  synthToken,
  synthAmount,
  amount,
}: IRewardTokenInfoProps): JSX.Element => {
  const classes = useRewardTokenInfoStyles();

  return (
    <Box className={classes.root} display="flex" mt={2}>
      <Box>
        {React.cloneElement(iconSlot, {
          className: classes.icon,
        })}
      </Box>

      <Typography className={classes.description}>
        {tHTML('stake.reward-token-info', {
          token,
          synthToken,
          synthAmount,
          amount,
        })}
      </Typography>
    </Box>
  );
};
