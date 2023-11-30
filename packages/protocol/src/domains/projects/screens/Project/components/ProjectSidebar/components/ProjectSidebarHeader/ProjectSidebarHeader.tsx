import { ArrowLeftSmall, Close } from '@ankr.com/ui';
import { IconButton } from '@mui/material';

import { useProjectSidebarHeaderStyles } from './useProjectSidebarHeaderStyles';

export interface ProjectSidebarHeaderProps {
  hasBackButton?: boolean;
  onBackButtonClick?: () => void;
  onClose: () => void;
}

export const ProjectSidebarHeader = ({
  hasBackButton = false,
  onBackButtonClick,
  onClose,
}: ProjectSidebarHeaderProps) => {
  const { classes } = useProjectSidebarHeaderStyles(hasBackButton);

  return (
    <div className={classes.root}>
      {hasBackButton && (
        <IconButton
          aria-label="back"
          className={classes.iconButton}
          onClick={onBackButtonClick}
        >
          <ArrowLeftSmall className={classes.icon} />
        </IconButton>
      )}
      <IconButton
        aria-label="close"
        className={classes.iconButton}
        onClick={onClose}
      >
        <Close className={classes.icon} />
      </IconButton>
    </div>
  );
};
