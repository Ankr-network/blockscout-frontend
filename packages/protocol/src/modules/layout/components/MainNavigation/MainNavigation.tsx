import { Divider } from '@mui/material';

import { Navigation } from 'modules/common/components/Navigation';
import {
  UpgradePlanDialog,
  UpgradePlanDialogType,
} from 'modules/common/components/UpgradePlanDialog';

import { IUseMenuItemsProps, useMenuItems } from './hooks/useMenuItems';
import { MainNavigationSkeleton } from './MainNavigationSkeletion';
import { useMainNavigationStyles } from './useMainNavigationStyles';

export interface IMainNavigationProps extends IUseMenuItemsProps {}

export const MainNavigation = (props: IMainNavigationProps) => {
  const { isMobileSideBar, loading } = props;

  const {
    bottomMenuItems,
    handleUpgradePlanDialogClose,
    isLoggedIn,
    isUpgradePlanDialogOpened,
    topMenuItems,
  } = useMenuItems(props);

  const { classes } = useMainNavigationStyles();

  if (loading) {
    return <MainNavigationSkeleton isLoggedIn={isLoggedIn} />;
  }

  return (
    <div className={classes.root}>
      <Navigation items={topMenuItems} isMobileSideBar={isMobileSideBar} />
      <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
      <Navigation items={bottomMenuItems} isMobileSideBar={isMobileSideBar} />
      <UpgradePlanDialog
        onClose={handleUpgradePlanDialogClose}
        open={isUpgradePlanDialogOpened}
        type={UpgradePlanDialogType.Enterprise}
      />
    </div>
  );
};
