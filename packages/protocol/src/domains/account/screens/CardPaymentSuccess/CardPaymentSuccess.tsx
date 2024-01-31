import { t } from '@ankr.com/common';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { OverlaySpinner } from '@ankr.com/ui';

import { AccountRoutesConfig } from 'domains/account/Routes';
import { BlockWithPermission } from 'domains/userGroup/constants/groups';
import { CenterContainer } from 'domains/userSettings/components/CenterContainer';
import { InfoCard } from 'domains/userSettings/components/InfoCard';
import { LoadingButton } from 'uiKit/LoadingButton';
import { selectTopUpOrigin } from 'domains/account/store/accountTopUpSlice';
import { useAuth } from 'domains/auth/hooks/useAuth';
import { useGuardUserGroup } from 'domains/userGroup/hooks/useGuardUserGroup';
import { useSetBreadcrumbs } from 'modules/layout/components/BreadcrumbsProvider';

import { getInfoCardParams } from './utils/getInfoCardParams';
import { getOriginRoute } from './utils/getOriginRoute';
import { useCardPaymentSuccessStyles } from './useCardPaymentSuccessStyles';
import { useClickHandler } from './hooks/useClickHandler';
import { useTrackSuccessfulTopUp } from './hooks/useTrackSuccessfulTopUp';
import success from './assets/success.png';

export const CardPaymentSuccess = () => {
  useTrackSuccessfulTopUp();

  const topUpOrigin = useSelector(selectTopUpOrigin);

  const route = getOriginRoute(topUpOrigin);

  const hasProjectAccess = useGuardUserGroup({
    blockName: BlockWithPermission.JwtManagerRead,
  });

  useSetBreadcrumbs([
    {
      title: t((route || AccountRoutesConfig.cardPaymentSuccess).breadcrumbs!),
    },
  ]);

  const { hasPremium, loading } = useAuth();

  const onClick = useClickHandler(hasProjectAccess);

  const { classes } = useCardPaymentSuccessStyles();

  const { button, description, title } = useMemo(
    () => getInfoCardParams({ hasPremium, hasProjectAccess }),
    [hasPremium, hasProjectAccess],
  );

  const hasAccess = useGuardUserGroup({
    blockName: BlockWithPermission.AccountStatus,
  });

  if (hasAccess && loading) {
    return <OverlaySpinner />;
  }

  return (
    <CenterContainer>
      <InfoCard
        align="center"
        description={description}
        descriptionClassName={classes.description}
        title={title}
        titleClassName={classes.title}
        imgUrl={success}
      >
        <LoadingButton fullWidth onClick={onClick} size="large">
          {button}
        </LoadingButton>
      </InfoCard>
    </CenterContainer>
  );
};
