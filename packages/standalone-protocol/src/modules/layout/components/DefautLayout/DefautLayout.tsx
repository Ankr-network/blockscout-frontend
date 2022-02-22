import React, { ReactChild } from 'react';
import classNames from 'classnames';

import { Themes } from 'modules/themes/types';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { Footer } from '../Footer';
import { useStyles } from './DefaultLayoutStyles';

export interface ILayoutProps {
  children?: ReactChild;
  theme?: Themes;
  isLayoutDefaultColor?: boolean;
  withNoReactSnap?: boolean;
  chainId?: string;
}

export const DefaultLayout = ({
  children,
  withNoReactSnap = true,
}: ILayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classNames(classes.root)}>
      <div className={classes.body}>
        <div className={classes.container}>
          {withNoReactSnap ? (
            <NoReactSnap>{children}</NoReactSnap>
          ) : (
            <>{children}</>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};
