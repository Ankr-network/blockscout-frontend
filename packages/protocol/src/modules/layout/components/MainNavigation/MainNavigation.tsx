import { t } from '@ankr.com/common';
import { Divider, Link } from '@mui/material';

import { DOCS_URL } from 'modules/layout/const';
import { Navigation } from 'modules/common/components/Navigation';
import { PlansDialog } from 'modules/common/components/PlansDialog';
import { useTrackDocs } from 'modules/layout/hooks/useTrackDocs';

import { AdditionalOptions } from './components/AdditionalOptions';
import { IUseMenuItemsProps, useMenuItems } from './hooks/useMenuItems';
import { MainNavigationSkeleton } from './MainNavigationSkeletion';
import { useMainNavigationStyles } from './useMainNavigationStyles';

export interface IMainNavigationProps extends IUseMenuItemsProps {
  handleSidebarClose?: () => void;
}

export const MainNavigation = ({
  handleSidebarClose,
  ...props
}: IMainNavigationProps) => {
  const { isMobileSideBar, loading } = props;

  const {
    handleUpgradePlanDialogClose,
    isLoggedIn,
    isUpgradePlanDialogOpened,
    secondMenuItems,
    topMenuItems,
  } = useMenuItems(props);

  const onDocsClick = useTrackDocs();

  const { classes } = useMainNavigationStyles();

  if (loading) {
    return <MainNavigationSkeleton isLoggedIn={isLoggedIn} />;
  }

  return (
    <div className={classes.root}>
      <div>
        <Navigation items={topMenuItems} isMobileSideBar={isMobileSideBar} />
        <Divider className={classes.divider} />
        <Navigation items={secondMenuItems} isMobileSideBar={isMobileSideBar} />
        <AdditionalOptions
          className={classes.additionalOptions}
          handleSidebarClose={handleSidebarClose}
        />
      </div>
      <Link
        href={DOCS_URL}
        target="_blank"
        className={classes.link}
        onClick={onDocsClick}
      >
        {t('main-navigation.docs')}
      </Link>
      <PlansDialog
        onClose={handleUpgradePlanDialogClose}
        open={isUpgradePlanDialogOpened}
      />
    </div>
  );
};
