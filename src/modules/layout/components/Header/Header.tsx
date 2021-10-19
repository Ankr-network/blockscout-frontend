import React from 'react';
import { Container, Button } from '@material-ui/core';
import { Mutation } from '@redux-requests/react';

import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { t } from 'modules/i18n/utils/intl';
import { Breadcrumbs } from '../Breadcrumbs';
import { useStyles } from './HeaderStyles';
import { useAuth } from '../../../auth/hooks/useAuth';
import { shrinkAddress } from '../../../common/utils/shrinkAddress';

export const Header = () => {
  const classes = useStyles();
  const { handleConnect, address } = useAuth();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Breadcrumbs />
        <div className={classes.right}>
          <LocaleSwitcher className={classes.switcher} />
          <Mutation type={handleConnect.toString()}>
            {({ loading }) =>
              address ? (
                <Button variant="text">{shrinkAddress(address)}</Button>
              ) : (
                <Button
                  variant="text"
                  color="primary"
                  disableElevation={false}
                  onClick={handleConnect}
                  disabled={loading}
                >
                  {t('header.wallet-button')}
                </Button>
              )
            }
          </Mutation>
        </div>
      </Container>
    </header>
  );
};
