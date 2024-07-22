import { Container } from '@mui/material';

import { Header } from 'modules/layout/const';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';
import { AccountStatus } from 'modules/common/components/AccountStatus';
import { useIsXSDown } from 'uiKit/Theme/useTheme';

import { HeaderContent } from '../Header/components/HeaderContent';
import { MobileMenu } from '../MobileMenu';
import { useStyles } from './useStyles';

interface MobileHeaderProps {
  className?: string;
  chainsRoutes: string[];
  isEnterpriseClient: boolean;
  loading: boolean;
}

export const MobileHeader = ({
  chainsRoutes,
  className = '',
  isEnterpriseClient,
  loading,
}: MobileHeaderProps) => {
  const { classes, cx } = useStyles();

  const isXsDown = useIsXSDown();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <GlobalMenuWrapper />
        {!isXsDown && (
          <AccountStatus
            className={classes.accountStatus}
            isOnWhiteBackground
          />
        )}
        <div className={classes.buttons}>
          <HeaderContent type={Header.Mobile} />
          <MobileMenu
            chainsRoutes={chainsRoutes}
            hasMenu={false}
            isEnterpriseClient={isEnterpriseClient}
            loading={loading}
          />
        </div>
      </Container>
    </header>
  );
};
