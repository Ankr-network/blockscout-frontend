import { Timeframe } from 'domains/chains/types';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';

import { getValue } from '../TimeframeSwitcher/const';
import { FailedRequestsChart } from './Components/FailedRequestsChart';
import { Header } from './Components/Header';
import { Notice } from './Components/Notice';
import { useFailedRequestsBannerStyles } from './useFailedRequestsBannerStyles';

interface IFailedRequestsBannerProps {
  timeframe: Timeframe;
  data: IRequestsBannerResponse;
}

export const FailedRequestsBanner = ({
  timeframe,
  data,
}: IFailedRequestsBannerProps) => {
  const { classes, cx } = useFailedRequestsBannerStyles();

  const upgradePlanPermission = BlockWithPermission.UpgradePlan;
  const hasUpgradePlanAccess = useGuardUserGroup({
    blockName: upgradePlanPermission,
  });

  const { rate, total, rejectedRequestsCount, list } = data;

  return (
    <div className={classes.root}>
      <Header
        switchValue={getValue(timeframe)}
        total={total}
        rate={rate}
        rejectedRequestsCount={rejectedRequestsCount}
        hasOffset={hasUpgradePlanAccess}
      />
      <div
        className={cx(classes.container, {
          [classes.containerWithNotice]: hasUpgradePlanAccess,
        })}
      >
        <div className={classes.chart}>
          <FailedRequestsChart data={list} />
        </div>
        <GuardUserGroup blockName={upgradePlanPermission}>
          <Notice />
        </GuardUserGroup>
      </div>
    </div>
  );
};
