import { EChargingModel } from 'modules/billing/types';
import { UserLabel } from 'uiKit/UserLabel';

import { PAYGLabel } from '../components/ChargingModelWidget/components/PAYGLabel';

interface IRenderLabelParams {
  currentChargingModelType: EChargingModel;
  isSmall: boolean;
  className?: string;
}

export const renderLabel = ({
  currentChargingModelType,
  isSmall,
  className,
}: IRenderLabelParams) => {
  switch (currentChargingModelType) {
    case EChargingModel.PAYG:
      return <PAYGLabel isSmall={isSmall} className={className} />;
    case EChargingModel.Free:
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
