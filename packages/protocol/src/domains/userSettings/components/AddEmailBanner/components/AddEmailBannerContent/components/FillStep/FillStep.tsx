import { ReactNode } from 'react';

import { useStyles } from './FillStepStyles';
import { Content } from './Content';

interface IFillStepProps {
  children: ReactNode;
  content?: ReactNode;
}

const defaultContent = <Content />;

export const FillStep = ({
  children,
  content = defaultContent,
}: IFillStepProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {content}

      {children}
    </div>
  );
};
