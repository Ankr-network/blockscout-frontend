import { t } from '@ankr.com/common';

import { IPrivateLastRequestParams } from 'domains/chains/actions/private/fetchPrivateLatestRequests';

import { RefreshButton } from '../RefreshButton';
import { intlRoot } from '../../const';
import { useHeaderStyles } from './HeaderStyles';

export interface HeaderProps {
  isRefreshing: boolean;
  onRefresh: ({ group }: IPrivateLastRequestParams) => void;
}

export const Header = ({ isRefreshing, onRefresh }: HeaderProps) => {
  const { classes } = useHeaderStyles();

  return (
    <div className={classes.header}>
      <div className={classes.title}>{t(`${intlRoot}.title`)}</div>
      <RefreshButton isRefreshing={isRefreshing} onRefresh={onRefresh} />
    </div>
  );
};
