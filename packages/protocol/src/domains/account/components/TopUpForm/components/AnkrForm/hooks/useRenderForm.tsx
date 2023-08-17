import { FormRenderProps } from 'react-final-form';
import { useCallback } from 'react';

import { AmountValidator, FormValues } from '../types';
import { DisabledNativeForm } from '../components/DisabledNativeForm';
import { NativeForm } from '../components/NativeForm';

export interface RenderFormProps {
  isTopUpProcessing: boolean;
  onBundleBannerClick: () => void;
  validateAmount: AmountValidator;
}

export const useRenderForm = ({
  onBundleBannerClick,
  validateAmount,
  isTopUpProcessing,
}: RenderFormProps) =>
  useCallback(
    ({
      form: { change },
      handleSubmit,
      valid,
      values,
    }: FormRenderProps<FormValues>) => {
      const form = (
        <NativeForm
          amount={values.amount}
          change={change}
          handleSubmit={handleSubmit}
          valid={valid}
          validateAmount={validateAmount}
          onBundleBannerClick={onBundleBannerClick}
        />
      );
      const disabledForm = <DisabledNativeForm amount={values.amount} />;

      return isTopUpProcessing ? disabledForm : form;
    },
    [isTopUpProcessing, onBundleBannerClick, validateAmount],
  );
