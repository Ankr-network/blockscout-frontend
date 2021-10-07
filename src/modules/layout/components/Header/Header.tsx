import React from 'react';
import { Container, Button } from '@material-ui/core';

import { Breadcrumbs } from 'uiKit/Breadcrumbs';
import { LocaleSwitcher } from 'modules/common/components/LocaleSwitcher';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './HeaderStyles';

const items = [{ title: 'Chains', link: '/' }, { title: 'Polygon' }];

export const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.root}>
      <Container className={classes.container} maxWidth={false}>
        <Breadcrumbs items={items} />
        <div className={classes.right}>
          <LocaleSwitcher />
          <Button
            variant="contained"
            className={classes.button}
            disableElevation={false}
          >
            {t('header.wallet-button')}
          </Button>
        </div>
      </Container>
    </header>
  );
};
