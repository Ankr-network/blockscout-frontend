import { useMemo } from 'react';

import { EChargingModel } from 'modules/billing/types';
import { UserLabel } from 'uiKit/UserLabel';

import { PAYGLabel } from '../ChargingModelWidget/components/PAYGLabel';
import { useFreemiumChargingModel } from '../../hooks/useFreemiumChargingModel';

interface IChargingModelLabelParams {
  currentChargingModelType: EChargingModel;
  size: 'small' | 'medium' | 'large';
  className?: string;
}

export const ChargingModelLabel = ({
  currentChargingModelType,
  size = 'medium',
  className,
}: IChargingModelLabelParams) => {
  const { shouldShowFreemium } = useFreemiumChargingModel();

  const freeLabel = useMemo(() => {
    return (
      <UserLabel
        hasPremium={false}
        hasEnterpriseStatus={false}
        hasStatusTransition={false}
        isLoading={false}
        size={size}
        className={className}
      />
    );
  }, [className, size]);

  if (shouldShowFreemium) {
    return freeLabel;
  }

  switch (currentChargingModelType) {
    case EChargingModel.PAYG:
      return <PAYGLabel size={size} className={className} />;
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
          size={size}
          className={className}
        />
      );
  }
};
