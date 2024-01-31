import { Container } from '@mui/material';

import { Header } from 'modules/layout/const';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';

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
  className = '',
  chainsRoutes,
  isEnterpriseClient,
  loading,
}: MobileHeaderProps) => {
  const { classes, cx } = useStyles();

  return (
    <header className={cx(classes.root, className)}>
      <Container className={classes.container} maxWidth={false}>
        <GlobalMenuWrapper />
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
