import { t } from '@ankr.com/common';

import { AccountIcon } from 'domains/account/types';
import { useAccountState } from 'domains/account/hooks/useAccountState';

import { getIcon } from './utils/getIcon';
import { useDescriptionStyles } from './DescriptionStyles';

export interface DescriptionProps {
  className?: string;
}

const { INFO, WARNING, ERROR } = AccountIcon;

export const Description = ({
  className: outerClassName,
}: DescriptionProps) => {
  const { descriptionKey = '', icon } = useAccountState();

  const { classes, cx } = useDescriptionStyles();

  const className = cx(classes.root, outerClassName, {
    [classes.blue]: icon === INFO,
    [classes.yellow]: icon === WARNING,
    [classes.red]: icon === ERROR,
  });

  return (
    <div className={className}>
      {getIcon(icon)}
      {t(descriptionKey)}
    </div>
  );
};
