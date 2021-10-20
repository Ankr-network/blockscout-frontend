import React from 'react';
import { Container, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import { ClockIcon } from 'uiKit/Icons/ClockIcon';
import { BoxIcon } from 'uiKit/Icons/BoxIcon';
import { StakingIcon } from 'uiKit/Icons/StakingIcon';
import { PaperIcon } from 'uiKit/Icons/PaperIcon';
import { MoreIcon } from 'uiKit/Icons/MoreIcon';

import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { DashboardRoutesConfig } from 'domains/dashboard/Routes';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
import { StakingRoutesConfig } from 'domains/staking/Routes';
import { MobileDetailsRoutesConfig } from 'domains/mobileDetails/Routes';

import { useStyles } from './useStyles';

export const MobileNavigation = () => {
  const classes = useStyles();

  const items = useLocaleMemo(
    () => [
      {
        label: t('mobile-navigation.private-rpcs'),
        StartIcon: ClockIcon,
        href: DashboardRoutesConfig.dashboard.generatePath(),
      },
      {
        label: t('mobile-navigation.public-rpcs'),
        StartIcon: BoxIcon,
        href: ChainsRoutesConfig.chains.generatePath(),
      },
      {
        label: t('mobile-navigation.staking'),
        StartIcon: StakingIcon,
        isDisabled: true,
        href: StakingRoutesConfig.staking.generatePath(),
      },
      {
        label: t('mobile-navigation.protocol'),
        StartIcon: PaperIcon,
        href: ProvidersRoutesConfig.providers.generatePath(),
      },
      {
        label: t('mobile-navigation.more'),
        StartIcon: MoreIcon,
        href: MobileDetailsRoutesConfig.details.generatePath(),
      },
    ],
    [],
  );

  return (
    <nav className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        {items.map(({ label, href, StartIcon, isDisabled }) => (
          <Button
            key={label}
            component={NavLink}
            to={href}
            variant="text"
            activeClassName={classes.activeLink}
            className={classes.link}
            disabled={!href || isDisabled}
            classes={{
              label: classes.label,
            }}
          >
            <StartIcon />
            {label}
          </Button>
        ))}
      </Container>
    </nav>
  );
};
