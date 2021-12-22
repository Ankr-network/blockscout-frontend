import classNames from 'classnames';
import React from 'react';
import { uid } from 'react-uid';
import { Container } from '@material-ui/core';

import { useIsLGDown } from 'ui';
import { t } from 'modules/i18n/utils/intl';
import { CryptoComWidget } from 'modules/common/components/CryptoComWidget/CryptoComWidget';
import { SubMenu } from '../SubMenu';
import { Partners } from './Partners/Partners';
import { FOOTER_ITEMS_V3 } from '../links';
import { useMenuStyles } from './useMenuStyles';

export const Menu = ({ className }: { className?: string }) => {
  const classes = useMenuStyles();
  const isLGDown = useIsLGDown();

  return (
    <div className={classNames(classes.component, className)}>
      <Container className={classes.wrapper}>
        <div className={classes.top}>
          {!isLGDown && <Partners className={classes.partners} />}
          <CryptoComWidget className={classes.cryptoWidget} />
        </div>
        <ul className={classes.list}>
          {isLGDown && <Partners className={classes.item} />}
          {Object.values(FOOTER_ITEMS_V3).map(link => {
            const links = Object.values(link.children);
            return (
              <SubMenu
                className={classes.item}
                key={uid(link)}
                title={t(link.title)}
                links={links}
              />
            );
          })}
        </ul>
      </Container>
    </div>
  );
};
