import Scrollbars from 'react-custom-scrollbars';
import { Drawer } from '@mui/material';
import { ReactNode } from 'react';

import {
  ProjectSidebarFooter,
  ProjectSidebarFooterProps,
} from './components/ProjectSidebarHeader/ProjectSidebarFooter';
import {
  ProjectSidebarHeader,
  ProjectSidebarHeaderProps,
} from './components/ProjectSidebarHeader';
import { useProjectSidebarStyles } from './useProjectSidebarStyles';

export interface ProjectSidebarProps
  extends ProjectSidebarHeaderProps,
    ProjectSidebarFooterProps {
  children: ReactNode;
  hasFooter?: boolean;
  isOpened?: boolean;
}

export const ProjectSidebar = ({
  children,
  hasFooter = false,
  isConfirmationDisabled,
  isConfirming,
  isOpened = false,
  onCancelButtonClick,
  onClose,
  onConfirmButtonClick,
  ...headerProps
}: ProjectSidebarProps) => {
  const {
    classes: { content, paper },
  } = useProjectSidebarStyles();

  return (
    <Drawer
      anchor="right"
      classes={{ paper }}
      onClose={onClose}
      open={isOpened}
    >
      <ProjectSidebarHeader onClose={onClose} {...headerProps} />
      <Scrollbars>
        <div className={content}>{children}</div>
      </Scrollbars>
      {hasFooter && (
        <ProjectSidebarFooter
          isConfirmationDisabled={isConfirmationDisabled}
          isConfirming={isConfirming}
          onCancelButtonClick={onCancelButtonClick}
          onConfirmButtonClick={onConfirmButtonClick}
        />
      )}
    </Drawer>
  );
};
