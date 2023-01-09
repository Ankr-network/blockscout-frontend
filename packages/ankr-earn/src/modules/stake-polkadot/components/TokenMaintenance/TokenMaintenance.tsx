import { t } from '@ankr.com/common';
import { Container, Paper } from '@material-ui/core';
import React from 'react';

import { RoutesConfig as DashboardRoutes } from 'modules/dashboard/Routes';
import { Button } from 'uiKit/Button';
import { CloseButton } from 'uiKit/CloseButton';

import { useTokenMaintenanceStyles } from './useTokenMaintenanceStyles';

interface ITokenMaintenanceProps {
  image: JSX.Element;
  title: string;
  description: string;
}

export const TokenMaintenance = ({
  image,
  title,
  description,
}: ITokenMaintenanceProps): JSX.Element => {
  const classes = useTokenMaintenanceStyles();

  const dashboardPath = DashboardRoutes.dashboard.generatePath();

  return (
    <Container className={classes.root}>
      <Paper className={classes.paper}>
        <CloseButton href={dashboardPath} />

        <div className={classes.imageWrap}>
          {React.cloneElement(image, {
            className: classes.image,
          })}
        </div>

        <div className={classes.title}>{title}</div>

        <div className={classes.description}>{description}</div>

        <Button fullWidth color="primary" href={dashboardPath} size="large">
          {t('polkadot-slot-auction.button.go-to-dashboard')}
        </Button>
      </Paper>
    </Container>
  );
};
