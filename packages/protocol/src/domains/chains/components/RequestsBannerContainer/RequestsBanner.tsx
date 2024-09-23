import { Timeframe } from '@ankr.com/chains-list';

import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { getTimeframeValue } from 'domains/chains/utils/getTimeframeValue';

import { useFailedRequestsBannerStyles as useRequestsBannerStyles } from '../FailedRequestsBanner/useFailedRequestsBannerStyles';
import { Notice } from './components/Notice';
import { Header } from './components/Header';
import { RequestsChartWrapper } from './components/RequestsChartWrapper';
import { useGuardUserGroup } from '../../../userGroup/hooks/useGuardUserGroup';

interface IRequestsBannerProps {
  timeframe: Timeframe;
  data: IRequestsBannerResponse;
  total?: string;
}

export const RequestsBanner = ({
  data,
  timeframe,
  total,
}: IRequestsBannerProps) => {
  const { classes, cx } = useRequestsBannerStyles();

  const upgradePlanPermission = BlockWithPermission.UpgradePlan;
  const hasUpgradePlanAccess = useGuardUserGroup({
    blockName: upgradePlanPermission,
  });

  const { list } = data;

  return (
    <div className={classes.root}>
      <Header
        timeframeValue={getTimeframeValue(timeframe)}
        total={total}
        hasOffset={hasUpgradePlanAccess}
      />
      <div
        className={cx(classes.container, {
          [classes.containerWithNotice]: hasUpgradePlanAccess,
        })}
      >
        <div className={classes.chart}>
          <RequestsChartWrapper data={list} />
        </div>
        <GuardUserGroup blockName={upgradePlanPermission}>
          <Notice />
        </GuardUserGroup>
      </div>
    </div>
  );
};
