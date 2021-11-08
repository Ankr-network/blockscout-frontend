import React from 'react';
import { Button, Container } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { DiamondIcon } from 'uiKit/Icons/DiamondIcon';
import { BoxIcon } from 'uiKit/Icons/BoxIcon';
import { MoreIcon } from 'uiKit/Icons/MoreIcon';
import { LabelIcon } from 'uiKit/Icons/LabelIcon';

import { t } from 'modules/i18n/utils/intl';
import { useLocaleMemo } from 'modules/i18n/utils/useLocaleMemo';
import { ChainsRoutesConfig } from 'domains/chains/Routes';
import { ProvidersRoutesConfig } from 'domains/nodeProviders/Routes';
import { PlanRoutesConfig } from 'domains/plan/Routes';
import { MobileDetailsRoutesConfig } from 'domains/mobileDetails/Routes';

import { useStyles } from './useStyles';

interface MobileHeaderProps {
  className?: string;
}

export const MobileNavigation = ({ className = '' }: MobileHeaderProps) => {
  const classes = useStyles();

  const items = useLocaleMemo(
    () => [
      {
        label: t('mobile-navigation.public-rpcs'),
        StartIcon: BoxIcon,
        href: ChainsRoutesConfig.chains.generatePath(),
      },
      {
        label: t('mobile-navigation.plan'),
        StartIcon: DiamondIcon,
        href: PlanRoutesConfig.plan.generatePath(),
      },
      {
        label: t('mobile-navigation.protocol'),
        StartIcon: LabelIcon,
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
    <nav className={classNames(classes.root, classes.custom, className)}>
      <Container className={classes.container} maxWidth={false}>
        {items.map(({ label, href, StartIcon }) => (
          <Button
            key={label}
            component={NavLink}
            to={href}
            variant="text"
            activeClassName={classes.activeLink}
            className={classes.link}
            disabled={!href}
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
