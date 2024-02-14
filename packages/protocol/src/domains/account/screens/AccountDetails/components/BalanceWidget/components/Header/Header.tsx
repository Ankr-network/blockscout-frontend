import { t } from '@ankr.com/common';
import { Button } from '@mui/material';

import { WidgetTitle } from 'domains/account/screens/AccountDetails/components/WidgetTitle';
import { UserLabel } from 'uiKit/UserLabel';

import { PAYGLabel } from '../PAYGLabel';
import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  className?: string;
  hasPAYGLabel?: boolean;
  isFree?: boolean;
  onOpenBalanceDialog: () => void;
}

export const Header = ({
  className,
  hasPAYGLabel,
  isFree,
  onOpenBalanceDialog,
}: HeaderProps) => {
  const { classes, cx } = useHeaderStyles();

  return (
    <div className={cx(classes.root, className)}>
      <WidgetTitle>{t(`${intlRoot}.title`)}</WidgetTitle>
      {hasPAYGLabel && <PAYGLabel />}
      {isFree && (
        <UserLabel
          hasPremium={false}
          hasEnterpriseStatus={false}
          hasStatusTransition={false}
          isLoading={false}
        />
      )}
      <Button
        className={classes.assetsBtn}
        variant="outlined"
        onClick={onOpenBalanceDialog}
        disabled={isFree}
      >
        {t(`${intlRoot}.assets-balance-button`)}
      </Button>
    </div>
  );
};
