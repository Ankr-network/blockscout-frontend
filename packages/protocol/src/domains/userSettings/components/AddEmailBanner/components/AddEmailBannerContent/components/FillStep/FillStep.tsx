import { ReactNode } from 'react';

import { useFillStepStyles } from './useFillStepStyles';
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
  const classes = useFillStepStyles();

  return (
    <div className={classes.root}>
      {content}

      {children}
    </div>
  );
};
