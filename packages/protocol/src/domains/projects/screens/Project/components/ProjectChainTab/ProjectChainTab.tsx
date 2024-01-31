import { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { useProjectChainTabStyles } from './useProjectChainTabStyles';

export interface ProjectChainTabProps {
  className?: string;
  iconUrl?: string;
  isSelected?: boolean;
  name: string | ReactNode;
  onClick?: () => void;
}

export const ProjectChainTab = ({
  className,
  iconUrl,
  isSelected,
  name,
  onClick,
}: ProjectChainTabProps) => {
  const { cx, classes } = useProjectChainTabStyles();

  return (
    <div
      className={cx(classes.root, className, {
        [classes.isSelected]: isSelected,
      })}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {iconUrl && (
        <img
          alt="blockchain icon"
          className={classes.icon}
          key={iconUrl}
          src={iconUrl}
        />
      )}
      <Typography className={classes.title} variant="body4">
        {name}
      </Typography>
    </div>
  );
};
