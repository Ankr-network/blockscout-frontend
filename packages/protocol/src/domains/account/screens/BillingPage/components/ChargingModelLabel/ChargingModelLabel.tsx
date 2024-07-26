import { useMemo } from 'react';

import { EChargingModel, IChargingModelData } from 'modules/payments/types';
import { UserLabel } from 'uiKit/UserLabel';

import { PAYGLabel } from '../ChargingModelWidget/components/PAYGLabel';
import { useFreemiumChargingModel } from '../../hooks/useFreemiumChargingModel';

interface IChargingModelLabelParams {
  currentChargingModel: IChargingModelData;
  currentChargingModelType: EChargingModel;
  size: 'small' | 'medium' | 'large';
  className?: string;
}

export const ChargingModelLabel = ({
  className,
  currentChargingModel,
  currentChargingModelType,
  size = 'medium',
}: IChargingModelLabelParams) => {
  const { shouldShowFreemium } = useFreemiumChargingModel(currentChargingModel);

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
