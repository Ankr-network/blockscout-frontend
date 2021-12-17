import React from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { useDefaultLayoutStyles } from './useDefaultLayoutStyles';

export interface ILayoutProps {
  children?: React.ReactNode;
}

export const DefaultLayout = ({ children }: ILayoutProps) => {
  const classes = useDefaultLayoutStyles();

  return (
    <>
      <div className={classes.root}>
        <Header />
        <main className={classes.content}>{children}</main>
        <Footer />
      </div>
    </>
  );
};
