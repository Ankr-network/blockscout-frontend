import { useMemo } from 'react';

import { EChargingModel, IChargingModelData } from 'modules/payments/types';
import { PAYGLabel } from 'modules/common/components/PAYGLabel';
import { UserLabel } from 'uiKit/UserLabel';

import { useFreemiumChargingModel } from '../../hooks/useFreemiumChargingModel';

interface IChargingModelLabelParams {
  className?: string;
  currentChargingModel: IChargingModelData;
  currentChargingModelType: EChargingModel;
  hasPromoBundle?: boolean;
  size: 'small' | 'medium' | 'large';
}

export const ChargingModelLabel = ({
  className,
  currentChargingModel,
  currentChargingModelType,
  hasPromoBundle,
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

  if (shouldShowFreemium && !hasPromoBundle) {
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
