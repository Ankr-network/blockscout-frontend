import { Container } from '@mui/material';
import { ReactChild } from 'react';

import { NegativeBalanceTermsOfServicesDialog } from 'domains/userSettings/screens/Settings/components/GeneralSettings/components/NegativeBalanceTermsOfServicesDialog';
import { NoReactSnap } from 'uiKit/NoReactSnap';
import { SHOULD_SHOW_HEADER_BANNER } from 'modules/layout/const';
import { TwoFADialog } from 'domains/userSettings/components/TwoFADialog';

import { Breadcrumbs } from '../Breadcrumbs';
import { ConnectWalletDialogContainer } from './components/ConnectWalletDialogContainer';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { HeaderBanner } from '../HeaderBanner';
import { MobileHeader } from '../MobileHeader';
import { SideBar } from '../SideBar';
import { StatusTransitionDialogContainer } from './components/StatusTransitionDialogContainer';
import { useDefaultLayout } from './hooks/useDefaultLayout';
import { useDefaultLayoutStyles } from './DefaultLayoutStyles';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';

export const CONTENT_WIDTH = 1120;

export const CONTAINER_STYLES = {
  maxWidth: CONTENT_WIDTH,
  marginLeft: 'auto',
  marginRight: 'auto',
};

export interface ILayoutProps {
  children?: ReactChild;
  disableGutters?: boolean;
  hasError?: boolean;
  hasNoReactSnap?: boolean;
}

export const DefaultLayout = ({
  children,
  disableGutters = false,
  hasError = false,
  hasNoReactSnap = false,
}: ILayoutProps) => {
  const { isDashboardPage, isPricingPage, isReferralsPage } =
    useDefaultLayout();

  const bannerHeight = useHeaderBannerHeight();

  const { classes, cx } = useDefaultLayoutStyles({
    hasGradient: isPricingPage || hasError,
    bannerHeight,
    hasBreadcrumbs: !isReferralsPage,
  });

  return (
    <>
      {SHOULD_SHOW_HEADER_BANNER && <HeaderBanner />}
      <div className={classes.root}>
        <SideBar className={classes.sidebar} hasMenu />
        <div className={classes.body}>
          {!hasError && (
            <Header
              className={cx(classes.header, {
                [classes.dashboardHeader]: isDashboardPage,
              })}
            />
          )}
          <MobileHeader className={classes.mobileHeader} />
          <Container
            disableGutters={disableGutters}
            className={cx(classes.main, {
              [classes.dashboardMain]: isDashboardPage,
            })}
          >
            <div className={classes.content}>
              <div className={classes.mobileBreadcrumbs}>
                <Breadcrumbs />
              </div>
              {hasNoReactSnap ? (
                <NoReactSnap>{children}</NoReactSnap>
              ) : (
                children
              )}
            </div>
          </Container>
          <Footer />
          <StatusTransitionDialogContainer />
          <TwoFADialog />
          <NegativeBalanceTermsOfServicesDialog />
          <ConnectWalletDialogContainer />
        </div>
      </div>
    </>
  );
};
