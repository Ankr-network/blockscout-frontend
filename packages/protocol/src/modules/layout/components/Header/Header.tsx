import React from 'react';
import { Box, Container, Typography } from '@material-ui/core';
import classNames from 'classnames';

import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { ConnectButton } from 'modules/auth/components/ConnectButton';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './useStyles';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { useAuth } from 'modules/auth/hooks/useAuth';
import { t } from 'modules/i18n/utils/intl';

export const IS_I18N_ENABLED = false;

interface HeaderProps {
  className?: string;
  isPremiumPlanPage?: boolean;
}

export const Header = ({ className = '', isPremiumPlanPage }: HeaderProps) => {
  const classes = useStyles();
  const { isWalletConnected, loading } = useAuth();

  return (
    <header className={classNames(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs />
        <div className={classes.right}>
          {IS_I18N_ENABLED && <LocaleSwitcher className={classes.switcher} />}
          <NoReactSnap>
            {isPremiumPlanPage && !isWalletConnected && !loading && (
              <Box mr={2.5}>
                <Typography variant="body2">
                  {t('header.already-premium')}
                </Typography>
              </Box>
            )}
            <ConnectButton />
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
