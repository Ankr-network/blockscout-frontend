import classNames from 'classnames';

import { useStakeDescriptionSeparatorStyles } from './useStakeDescriptionSeparatorStyles';

export interface IStakeDescriptionSeparatorProps {
  className?: string;
}

export const StakeDescriptionSeparator = ({
  className,
}: IStakeDescriptionSeparatorProps): JSX.Element => {
  const classes = useStakeDescriptionSeparatorStyles();

  return <div className={classNames(className, classes.root)} />;
};
