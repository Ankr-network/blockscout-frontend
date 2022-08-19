import { Box } from '@material-ui/core';
import BigNumber from 'bignumber.js';
import React from 'react';

import { t } from 'common';

import { BigNav } from 'modules/common/components/BigNav';
import { BigNavItem } from 'modules/common/components/BigNavItem';
import { ZERO } from 'modules/common/const';

import { Balance } from './Balance';
import { useHeaderStyles } from './useHeaderStyles';

interface IHeaderProps {
  getTokensLink: string;
  isLoading: boolean;
  balance?: BigNumber;
  token: string;
  icon: JSX.Element;
  myStakingLink: string;
  nodeProvidersLink: string;
}

export const Header = ({
  getTokensLink,
  isLoading,
  balance = ZERO,
  token,
  icon,
  myStakingLink,
  nodeProvidersLink,
}: IHeaderProps): JSX.Element => {
  const classes = useHeaderStyles();

  return (
    <Box className={classes.root} mb={4}>
      <BigNav minWidth={0}>
        <BigNavItem href={myStakingLink}>
          {t('delegated-stake.header.my-staking', { token })}
        </BigNavItem>

        <BigNavItem href={nodeProvidersLink}>
          {t('delegated-stake.header.node-providers')}
        </BigNavItem>
      </BigNav>

      <Balance
        icon={icon}
        isLoading={isLoading}
        link={getTokensLink}
        value={balance}
      />
    </Box>
  );
};
