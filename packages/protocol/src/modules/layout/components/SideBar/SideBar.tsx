import { useTrackAnalytics } from 'modules/layout/hooks/useTrackAnalytics';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';
import { GlobalMenuWrapper } from 'modules/globalMenu/components/GlobalMenuWrapper';

import { useStyles } from './SideBarStyles';
import { MainNavigation } from '../MainNavigation';

export interface SidebarProps {
  chainsRoutes: string[];
  className?: string;
  hasMenu: boolean;
  isEnterpriseClient: boolean;
  isMobileSideBar?: boolean;
  loading: boolean;
}

export const SideBar = ({
  chainsRoutes,
  className = '',
  hasMenu,
  isEnterpriseClient,
  isMobileSideBar = false,
  loading,
}: SidebarProps) => {
  const { classes, cx } = useStyles(isMobileSideBar);

  const onDocsClick = useTrackDocs();
  const onAnalyticsClick = useTrackAnalytics();

  return (
    <aside className={cx(classes.root, className)}>
      {hasMenu && <GlobalMenuWrapper />}
      <MainNavigation
        chainsRoutes={chainsRoutes}
        isMobileSideBar={isMobileSideBar}
        isEnterpriseClient={isEnterpriseClient}
        loading={loading}
        onAnalyticsClick={onAnalyticsClick}
        onDocsClick={onDocsClick}
      />
    </aside>
  );
};
