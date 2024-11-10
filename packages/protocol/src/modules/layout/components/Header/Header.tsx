import { Container } from '@mui/material';

import { NoReactSnap } from 'uiKit/NoReactSnap';

import { Breadcrumbs } from '../Breadcrumbs';
import { HeaderContent } from './components/HeaderContent';
import { useHeaderStyles } from './useHeaderStyles';
import { useHeaderBannerHeight } from '../HeaderBanner/useHeaderBannerHeight';

export interface HeaderProps {
  className?: string;
}

export const Header = ({ className }: HeaderProps) => {
  const bannerHeight = useHeaderBannerHeight();

  const { classes, cx } = useHeaderStyles(bannerHeight);

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container}>
        <Breadcrumbs />
        <div className={classes.right}>
          <NoReactSnap>
            <div className={classes.buttons}>
              <HeaderContent />
            </div>
          </NoReactSnap>
        </div>
      </Container>
    </header>
  );
};
