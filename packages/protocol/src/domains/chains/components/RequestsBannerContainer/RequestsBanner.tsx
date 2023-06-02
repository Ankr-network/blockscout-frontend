import { Timeframe } from 'domains/chains/types';
import { IRequestsBannerResponse } from 'domains/chains/utils/requestsBannerUtils';
import { useFailedRequestsBannerStyles as useRequestsBannerStyles } from '../FailedRequestsBanner/useFailedRequestsBannerStyles';
import { Notice } from './components/Notice';
import { Header } from './components/Header';
import { RequestsChartWrapper } from './components/RequestsChartWrapper';
import { valuesMap } from '../TimeframeSwitcher/const';
import { GuardUserGroup } from 'domains/userGroup/components/GuardUserGroup';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { useGuardUserGroup } from '../../../userGroup/hooks/useGuardUserGroup';

interface IRequestsBannerProps {
  timeframe: Timeframe;
  data: IRequestsBannerResponse;
  total?: string;
}

export const RequestsBanner = ({
  timeframe,
  data,
  total,
}: IRequestsBannerProps) => {
  const { cx, classes } = useRequestsBannerStyles();

  const upgradePlanPermission = BlockWithPermission.UpgradePlan;
  const hasUpgradePlanAccess = useGuardUserGroup({
    blockName: upgradePlanPermission,
  });

  const { list } = data;

  return (
    <div className={classes.root}>
      <Header
        timeframeValue={valuesMap[timeframe]}
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