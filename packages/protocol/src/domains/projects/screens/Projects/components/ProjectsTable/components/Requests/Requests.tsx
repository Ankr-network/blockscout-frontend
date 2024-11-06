import { Button, Skeleton, Typography } from '@mui/material';
import { StatsByRangeDuration, StatsByRangeTimeframe } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { IFetchPrivateTotalStatsByRangeParams } from 'modules/stats/actions/fetchPrivateTotalStatsByRange';
import {
  selectDraftUserEndpointToken,
  selectProjectTotalRequestsCountForCurrentPeriod,
  selectProjectTotalRequestsForCurrentPeriod,
  selectRelativeChange,
} from 'domains/projects/store/selectors';
import { useAppSelector } from 'store/useAppSelector';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { usePrivateTotalStatsByRange } from 'modules/stats/hooks/usePrivateTotalStatsByRange';
import { useSelectedUserGroup } from 'domains/userGroup/hooks/useSelectedUserGroup';

import { ProjectRequestsActivity } from '../../../ProjectRequestsActivity';

export interface IRequestsProps {
  userEndpointToken: string;
}

const duration = StatsByRangeDuration.TWO_DAYS;

export const Requests = ({ userEndpointToken: token }: IRequestsProps) => {
  const hasAccessForManaging = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerWrite,
  });
  const { selectedGroupAddress: group } = useSelectedUserGroup();

  const draftUserEndpointToken = useAppSelector(selectDraftUserEndpointToken);

  const isDraft = token === draftUserEndpointToken;

  const params: IFetchPrivateTotalStatsByRangeParams = {
    duration,
    group,
    timeframe: StatsByRangeTimeframe.HOUR,
    token,
  };

  const { loading } = usePrivateTotalStatsByRange({
    ...params,
    skipFetching: isDraft,
  });

  const totalRequests = useAppSelector(state =>
    selectProjectTotalRequestsForCurrentPeriod(state, params),
  );
  const totalRequestsCount = useAppSelector(state =>
    selectProjectTotalRequestsCountForCurrentPeriod(state, params),
  );
  const relativeChange = useAppSelector(state =>
    selectRelativeChange(state, params),
  );

  const hasData = Object.keys(totalRequests).length > 0;
  const isEmpty = totalRequestsCount === 0;

  if (isDraft && hasAccessForManaging) {
    return (
      <Button size="small" sx={{ whiteSpace: 'nowrap' }}>
        {t(`projects.list-project.resume-setup`)}
      </Button>
    );
  }

  if (loading) {
    return <Skeleton width="100px" variant="text" />;
  }

  if (!hasData) {
    return <>{t('common.no-data')}</>;
  }

  if (isEmpty) {
    return (
      <Typography variant="body3">
        {t('projects.list-project.no-requests-yet')}
      </Typography>
    );
  }

  return (
    <ProjectRequestsActivity
      isEmpty={isEmpty}
      hasData={hasData}
      relativeChange={relativeChange}
      totalRequestsCount={totalRequestsCount}
    />
  );
};
