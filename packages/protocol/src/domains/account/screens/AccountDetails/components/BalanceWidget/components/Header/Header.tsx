import { t } from '@ankr.com/common';

import { WidgetTitle } from 'domains/account/screens/AccountDetails/components/WidgetTitle';

import { PAYGLabel } from '../PAYGLabel';
import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  className?: string;
  hasPAYGLabel?: boolean;
}

export const Header = ({ className, hasPAYGLabel }: HeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      {hasPAYGLabel && <PAYGLabel />}
    </div>
  );
};
