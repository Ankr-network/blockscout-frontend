import { ReactNode } from 'react';
import { useInfoBannerStyles } from './InfoBannerStyles';

interface InfoBannerProps {
  icon: ReactNode;
  message: ReactNode;
  className?: string;
}

export const InfoBanner = ({ icon, message, className }: InfoBannerProps) => {
  const { classes, cx } = useInfoBannerStyles();

  return (
    <div className={cx(classes.root, className)}>
      <div className={classes.content}>
        <div className={classes.icon}>{icon}</div>
        <div className={classes.message}>{message}</div>
      </div>
    </div>
  );
};
