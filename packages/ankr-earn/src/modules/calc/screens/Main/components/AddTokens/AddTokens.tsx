import classNames from 'classnames';
import { ReactNode } from 'react';

import { useAddTokensStyles } from './useAddTokensStyles';

interface IAddTokensProps {
  className?: string;
  children?: ReactNode;
}

export const AddTokens = ({
  children,
  className,
}: IAddTokensProps): JSX.Element => {
  const classes = useAddTokensStyles();

  return (
    <div children={children} className={classNames(classes.root, className)} />
  );
};
