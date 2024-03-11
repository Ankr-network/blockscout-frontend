import { useMemo } from 'react';

import { EChargingModel } from 'modules/billing/types';
import { UserLabel } from 'uiKit/UserLabel';
import { useAuth } from 'domains/auth/hooks/useAuth';

import { PAYGLabel } from '../ChargingModelWidget/components/PAYGLabel';

interface IChargingModelLabelParams {
  currentChargingModelType: EChargingModel;
  isSmall: boolean;
  className?: string;
}

export const ChargingModelLabel = ({
  currentChargingModelType,
  isSmall,
  className,
}: IChargingModelLabelParams) => {
  const { isFreePremium } = useAuth();

  const freeLabel = useMemo(() => {
    return (
      <UserLabel
        hasPremium={false}
        hasEnterpriseStatus={false}
        hasStatusTransition={false}
        isLoading={false}
        isSmall={isSmall}
        className={className}
      />
    );
  }, [className, isSmall]);

  if (isFreePremium) {
    return freeLabel;
  }

  switch (currentChargingModelType) {
    case EChargingModel.PAYG:
      return <PAYGLabel isSmall={isSmall} className={className} />;
    case EChargingModel.Free:
      return freeLabel;
    default:
      return (
        <UserLabel
          hasPremium={false}
          chargingModel={currentChargingModelType}
          hasEnterpriseStatus={false}
          hasStatusTransition={false}
          isLoading={false}
          isSmall={isSmall}
          className={className}
        />
      );
  }
};
