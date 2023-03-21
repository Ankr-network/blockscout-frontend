import { ReactNode } from 'react';

import {
  GradientedBorderStyles,
  useGradientedBorderStyles,
} from './GradientedBorderStyles';

export interface GradientedBorderProps {
  children: ReactNode;
  hasBorder?: boolean;
  styles?: GradientedBorderStyles;
}

export const GradientedBorder = ({
  children,
  hasBorder = true,
  styles = {},
}: GradientedBorderProps) => {
  const { classes } = useGradientedBorderStyles(styles);

  if (!hasBorder) {
    return <>{children}</>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};
