import React from 'react';
import { Button, Container } from '@material-ui/core';
import { Breadcrumbs } from 'uiKit/Breadcrumbs';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';
import { Mutation } from '@redux-requests/react';
import { useAuth } from '../../../auth/hooks/useAuth';
import { shrinkAddress } from '../../../common/utils/shrinkAddress';

const items = [{ title: 'Chains', link: '/chains' }];

export const Header = () => {
  const classes = useStyles();
  const { handleConnect, address } = useAuth();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Breadcrumbs items={items} />
        <div className={classes.right}>
          <LocaleSwitcher />
          <Mutation type={handleConnect.toString()}>
            {({ loading }) =>
              address ? (
                <Button variant="text">{shrinkAddress(address)}</Button>
              ) : (
                <Button
                  variant="text"
                  color="primary"
                  className={classes.button}
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
